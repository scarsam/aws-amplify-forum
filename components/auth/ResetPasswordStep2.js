import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const ResetPasswordStep2 = ({ email, handleEmail, navigation }) => {
  const { previous } = navigation;
  const [invalidToken, setInvalidToken] = useState(false);
  const { register, handleSubmit, errors, setError, reset } = useForm();

  useEffect(() => {
    if (!email) {
      previous();
    }
  }, [email]);

  const onSubmit = async ({ confirmationCode, password }) => {
    try {
      await Auth.forgotPasswordSubmit(email, confirmationCode, password);
      await Auth.signIn(email, password);
      reset();
      handleEmail(null);
    } catch (error) {
      console.log({ error });
      if (error.code === "ExpiredCodeException") {
        setInvalidToken(true);
        return setError("server", {
          type: "manual",
          message: "Invalid code, go back to re-send",
        });
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
          placeholder="Reset password token"
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
        <input
          placeholder="New password"
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
      <button onClick={previous}>Back</button>
      <input type="submit" />
    </form>
  );
};

export default ResetPasswordStep2;
