import Head from "next/head";
import Link from "next/link";
import Login from "../components/auth/Login";
import styles from "../styles/Home.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Login</h1>

        <div className={styles.grid}>
          <Login />
          <Link href="/reset-password">
            <a>Reset password</a>
          </Link>
        </div>
      </main>
    </div>
  );
}
