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

const ResetPasswordStep1 = ({ handleEmail, navigation }) => {
  const { next } = navigation;
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
        <Button type="submit" variant="solid" disabled={!formState.isValid}>
          Continue
        </Button>
      </form>
    </>
  );
};

export default ResetPasswordStep1;
