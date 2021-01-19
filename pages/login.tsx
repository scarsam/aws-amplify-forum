import { useState } from "react";
import Head from "next/head";
import { Button, Box } from "@chakra-ui/react";
import Login from "../components/auth/Login";
import ResetPasswordFlow from "../components/auth/ResetPasswordFlow";

export default function LoginPage() {
  const [resetPassword, setResetPassword] = useState(false);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{resetPassword ? "Reset Password" : "Login"}</h1>

        <Box py={8}>{resetPassword ? <ResetPasswordFlow /> : <Login />}</Box>
        <Box py={4}>
          <Button
            variant="link"
            onClick={() => setResetPassword((toggle) => !toggle)}
          >
            {resetPassword ? "Login Instead" : "Reset Password"}
          </Button>
        </Box>
      </main>
    </div>
  );
}
