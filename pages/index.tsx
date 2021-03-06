import Head from "next/head";
import path from "path";
import { promises as fs } from "fs";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home({ en, fr }) {
  const [locale, setLocale] = useState("");

  useEffect(() => {
    const { navigator } = window;
    const { language: locale } = navigator;
    setLocale(locale);
  }, []);

  const t = locale === "en" || locale === "en-US" ? en : fr;

  return (
    <div className={styles.container}>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {t.greeting} <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          {t.description}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>{t.docs.h2} &rarr;</h2>
            <p>{t.docs.p}</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>{t.learn.h2}&rarr;</h2>
            <p>{t.learn.p}</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>{t.examples.h2} &rarr;</h2>
            <p>{t.examples.p}</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>{t.deploy.h2} &rarr;</h2>
            <p>{t.deploy.p}</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.footer.text}
          <span className={styles.logo}>
            <img src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export const getStaticProps = async () => {
  const translationsDir = path.join(process.cwd(), "translations");

  const enPromise = fs.readFile(path.join(translationsDir, "en.json"), "utf-8");
  const frPromise = fs.readFile(path.join(translationsDir, "fr.json"), "utf-8");

  const [en, fr] = await Promise.all([enPromise, frPromise]);

  return { props: { en: JSON.parse(en), fr: JSON.parse(fr) } };
};
