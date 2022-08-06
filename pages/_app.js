import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Desafio Bridge</title>
        <meta name="description" content="Desafio Bridge" />
        {/* Source: <a href="https://www.flaticon.com/free-icons/alphabet" title="alphabet icons">Alphabet icons created by Rakib Hassan Rahim - Flaticon</a> */}
        <link rel="icon" href="/letter-b.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
