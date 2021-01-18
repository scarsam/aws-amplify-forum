import React from "react";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const ResetPasswordStep1 = ({ handleEmail, navigation }) => {
  const { next } = navigation;
  const { register, handleSubmit, errors, setError, reset } = useForm();

  const onSubmit = async ({ email }) => {
    try {
      await Auth.forgotPassword(email);
      handleEmail(email);
      reset();
      next();
    } catch (error) {
      console.log({ error });

      if (error.code === "UserNotFoundException") {
        return setError("server", {
          type: "manual",
          message: "Email not found",
        });
      }

      setError("server", {
        type: "manual",
        message: "Issue on the server, please try again",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Forgot password</p>

        <ErrorMessage
          errors={errors}
          name="server"
          render={({ message }) => <p>{message}</p>}
        />

        <label>
          <input
            placeholder="Email"
            name="email"
            type="email"
            ref={register({ required: true })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            message="Email address is required"
            render={({ message }) => <p>{message}</p>}
          />
        </label>
        <input type="submit" />
      </form>
    </>
  );
};

export default ResetPasswordStep1;
