import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";

const Login = () => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    reset,
    formState,
  } = useForm({
    mode: "onChange",
  });

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
      <ErrorMessage
        errors={errors}
        name="server"
        render={({ message }) => <p>{message}</p>}
      />

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
        Login
      </Button>
    </form>
  );
};

export default Login;
