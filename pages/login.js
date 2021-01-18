import { useState } from "react";
import Head from "next/head";
import { Button, Box } from "@chakra-ui/react";
import Login from "../components/auth/Login";
import ResetPasswordFlow from "../components/auth/ResetPasswordFlow";
import styles from "../styles/Home.module.css";

export default function LoginPage() {
  const [resetPassword, setResetPassword] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {resetPassword ? "Reset Password" : "Login"}
        </h1>

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
