import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";

// QUESTION #1
function reverseString(givenString: string): String {
  const stringToArray = givenString.split("");
  return stringToArray.reverse().join("");
}

export default function febWeek1() {
  return (
    <Layout>
      <Head>
        <title>JavaScript Basic Questions</title>
      </Head>
      <div>
        <h1 className={utilStyles.headingXl}>February Week 1 Questions</h1>
        {/* QUESTION #1 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>January 30th, 2023</p>
          <p className={utilStyles.headingMd}>
            Q1. Reverse a given string. "Hello World"
          </p>
          <p>
            Answer: <span>{reverseString("Hello Wrodl")}</span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
