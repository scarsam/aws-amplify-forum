import Head from "next/head";
import Signup from "../components/auth/Signup";

export default function SignupPage() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Signup</h1>

        <div>
          <Signup />
        </div>
      </main>
    </div>
  );
}
