import React from "react";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const Signup = () => {
  const { register, handleSubmit, setError, errors, reset } = useForm();

  const onSubmit = async ({ username, email, password }) => {
    try {
      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          preferred_username: username,
        },
      });
      reset();
    } catch (error) {
      if (error?.code === "UsernameExistsException")
        setError("email", {
          type: "manual",
          message: "Email is already taken",
        });
      if (error?.code === "UserLambdaValidationException")
        setError("username", {
          type: "manual",
          message: "Username is already taken",
        });
      console.log({ error });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Signup</p>

      <label>
        <input name="username" ref={register({ required: true })} />
        <ErrorMessage
          errors={errors}
          name="username"
          autoComplete="true"
          message="Username is required"
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

export default Signup;
