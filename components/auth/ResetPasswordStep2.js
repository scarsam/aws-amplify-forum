import { useState, useEffect } from "react";
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

const ResetPasswordStep2 = ({ email, handleEmail, navigation }) => {
  const { previous } = navigation;
  const [invalidToken, setInvalidToken] = useState(false);
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
      <ErrorMessage
        errors={errors}
        name="server"
        render={({ message }) => <p>{message}</p>}
      />

      {invalidToken && (
        <>
          <p>Invalid or expired code, re-send confirmation token?</p>
          <Button onClick={reSubmitCode}>Send</Button>
        </>
      )}

      <FormControl
        pb={4}
        id="confirmationCode"
        isInvalid={errors?.confirmationCode}
      >
        <FormLabel>Reset Password Code</FormLabel>
        <Input
          placeholder="Reset password code"
          type="confirmationCode"
          name="confirmationCode"
          ref={register({ required: true })}
        />
        <ErrorMessage
          errors={errors}
          name="confirmationCode"
          message="Reset password token is required"
          render={({ message }) => (
            <FormErrorMessage>{message}</FormErrorMessage>
          )}
        />
      </FormControl>

      <FormControl pb={4} id="password" isInvalid={errors?.password}>
        <FormLabel>New Password</FormLabel>
        <Input
          placeholder="New password"
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
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPasswordStep2;
