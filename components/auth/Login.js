import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ResetPassword from "./ResetPassword";
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordToggle from "./ForgotPasswordLink";

const Login = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const { register, handleSubmit, errors, setError, reset } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await Auth.signIn(email, password);
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
    <div>
      {forgotPassword ? (
        <>
          <ForgotPassword />
          <ResetPassword />
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>Login</p>

            <ErrorMessage
              errors={errors}
              name="server"
              render={({ message }) => <p>{message}</p>}
            />

            <label>
              <input
                name="email"
                type="email"
                autoComplete="on"
                ref={register({ required: true })}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                message="Email address is required"
                render={({ message }) => <p>{message}</p>}
              />
            </label>

            <label>
              <input
                name="password"
                type="password"
                autoComplete="on"
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
        </>
      )}
      <ForgotPasswordToggle
        forgotPassword={forgotPassword}
        toggle={setForgotPassword}
      />
    </div>
  );
};

export default Login;
