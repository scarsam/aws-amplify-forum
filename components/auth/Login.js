import React from "react";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const Login = () => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Login</p>

      <label>
        <input name="email" type="email" ref={register({ required: true })} />
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
          ref={register({ required: true })}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          message="Password is required"
          render={({ message }) => <p>{message}</p>}
        />
      </label>
      <ErrorMessage
        errors={errors}
        name="server"
        render={({ message }) => <p>{message}</p>}
      />
      <input type="submit" />
    </form>
  );
};

export default Login;