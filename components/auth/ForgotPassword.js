import React from "react";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const ForgotPassword = () => {
  const { register, handleSubmit, errors, setError, reset } = useForm();

  const onSubmit = async ({ email }) => {
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
      <p>Forgot password</p>

      <ErrorMessage
        errors={errors}
        name="server"
        render={({ message }) => <p>{message}</p>}
      />

      <label>
        <input name="email" type="email" ref={register({ required: true })} />
        <ErrorMessage
          errors={errors}
          name="email"
          message="Email address is required"
          render={({ message }) => <p>{message}</p>}
        />
      </label>
      <input type="submit" />
    </form>
  );
};

export default ForgotPassword;
