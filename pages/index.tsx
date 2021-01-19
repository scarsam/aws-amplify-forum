import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <Link href="/signup">
          <a>Signup</a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </main>
    </div>
  );
}
