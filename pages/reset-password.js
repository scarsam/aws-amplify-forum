import Head from "next/head";
import Link from "next/link";
import React from "react";
import ResetPasswordFlow from "../components/auth/ResetPasswordFlow";
import styles from "../styles/Home.module.css";

const ResetPassword = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Reset Password</h1>

        <div className={styles.grid}>
          <ResetPasswordFlow />
          <Link href="/login">
            <a>Login instead</a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
