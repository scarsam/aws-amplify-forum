import Head from "next/head";
import Signup from "../components/auth/Signup";
import styles from "../styles/Home.module.css";

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Signup</h1>

        <div className={styles.grid}>
          <Signup />
        </div>
      </main>
    </div>
  );
}
