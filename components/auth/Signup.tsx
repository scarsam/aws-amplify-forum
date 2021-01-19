import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";

const Signup = () => {
  const {
    register,
    handleSubmit,
    setError,
    errors,
    reset,
    formState,
  } = useForm({
    mode: "onChange",
  });

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
      if (error?.code === "InvalidParameterException") {
        setError("password", {
          type: "manual",
          message: "Password must have length greater than or equal to 6",
        });
      }
      console.log({ error });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl pb={4} id="username" isInvalid={errors?.username}>
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="Username"
          type="username"
          name="username"
          ref={register({ required: true })}
        />
        <ErrorMessage
          errors={errors}
          name="username"
          autoComplete="true"
          message="Username is required"
          render={({ message }) => (
            <FormErrorMessage>{message}</FormErrorMessage>
          )}
        />
      </FormControl>

      <FormControl pb={4} id="email" isInvalid={errors?.email}>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Email"
          type="email"
          name="email"
          ref={register({ required: true })}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          autoComplete="true"
          message="Email address is required"
          render={({ message }) => (
            <FormErrorMessage>{message}</FormErrorMessage>
          )}
        />
      </FormControl>

      <FormControl pb={4} id="password" isInvalid={errors?.password}>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Password"
          type="password"
          name="password"
          ref={register({ required: true })}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          message="Password is required"
          render={({ message }) => (
            <FormErrorMessage>{message}</FormErrorMessage>
          )}
        />
      </FormControl>
      <Button type="submit" variant="solid" disabled={!formState.isValid}>
        Signup
      </Button>
    </form>
  );
};

export default Signup;
