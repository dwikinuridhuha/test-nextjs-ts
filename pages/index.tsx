import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import fs from "fs";
import React from "react";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let postBodyRequest: any = "";
  let reqMethod: string = "";

  const nameFile = "demo.txt";
  const urlParams = req.url;

  if (req.method == "GET") {
    if (fs.existsSync(nameFile)) {
      const dataRead = new Promise((resolve) => {
        fs.readFile(nameFile, "utf8", (error, data) => {
          resolve(data);
        });
      });

      postBodyRequest = await dataRead;
      reqMethod = req.method;

      fs.unlink(nameFile, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log("File deleted!");
      });
    }
  }

  if (req.method == "POST") {
    const dataStream = new Promise((resolve, reject) => {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        resolve(body);
      });
    });
    try {
      postBodyRequest = await dataStream;
      reqMethod = req.method;
      if (urlParams?.includes("ssokey")) {
        fs.writeFile(
          nameFile,
          postBodyRequest,
          "utf8",
          (error: any, data: any) => {
            console.log("Write complete");
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  return { props: { postBodyRequest, reqMethod } };
};


function paramsToObject(entries) {
  const result = {}
  for(const [key, value] of entries) { // each 'entry' is a [key, value] tupple
    result[key] = value;
  }
  return result;
}

const Home: NextPage = ({ postBodyRequest }) => {
  const urlParams = new URLSearchParams(postBodyRequest);
  const entries = urlParams.entries();
  const params = paramsToObject(entries);

  console.log(params)

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
