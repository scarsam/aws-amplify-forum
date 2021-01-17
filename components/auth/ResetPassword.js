import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const ResetPassword = () => {
  const [invalidToken, setInvalidToken] = useState(false);
  const { register, handleSubmit, errors, setError, reset } = useForm();

  const onSubmit = async ({ email, confirmationCode, password }) => {
    try {
      await Auth.forgotPasswordSubmit(email, confirmationCode, password);
      reset();
    } catch (error) {
      console.log({ error });
      if (error.code === "ExpiredCodeException") {
        setInvalidToken(true);
        return console.log("Re-send code");
      }

      if (error.code === "InvalidParameterException") {
        return setError("password", {
          type: "manual",
          message: error.message,
        });
      }

      setError("server", {
        type: "manual",
        message: "Issue on the server, please try again",
      });
    }
  };

  const reSubmitCode = async ({ email }) => {
    try {
      await Auth.forgotPassword(email);
      reset();
    } catch (error) {
      console.log({ error });
      setError("server", {
        type: "manual",
        message: "Issue on the server, please try again",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Reset Password</p>

      <ErrorMessage
        errors={errors}
        name="server"
        render={({ message }) => <p>{message}</p>}
      />

      {invalidToken && (
        <>
          <p>Invalid or expired code, re-send confirmation token?</p>
          <button onClick={reSubmitCode}>Send</button>
        </>
      )}

      <label>
        <input
          name="confirmationCode"
          type="confirmationCode"
          ref={register({ required: true })}
        />
        <ErrorMessage
          errors={errors}
          name="confirmationCode"
          autoComplete="true"
          message="Confirmation code is required"
          render={({ message }) => <p>{message}</p>}
        />
      </label>

      <label>
        <input name="email" type="email" ref={register({ required: true })} />
        <ErrorMessage
          errors={errors}
          name="email"
          autoComplete="true"
          message="Email address is required"
          render={({ message }) => <p>{message}</p>}
        />
      </label>

      <label>
        <input
          name="password"
          type="password"
          autoComplete="true"
          ref={register({ required: true })}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          message="Password is required"
          render={({ message }) => <p>{message}</p>}
        />
      </label>
      <input type="submit" />
    </form>
  );
};

export default ResetPassword;
