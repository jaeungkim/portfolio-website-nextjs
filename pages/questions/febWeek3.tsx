import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import { useEffect, useState } from "react";

export default function febWeek1() {
  const question1SetTimeoutWait = (delay) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(console.log("i'm executing") + delay);
      }, delay);
    });
  };
  const question1 = async () => {
    await question1SetTimeoutWait(1000);
    await question1SetTimeoutWait(1000);
    await question1SetTimeoutWait(1000);
  };

  return (
    <Layout>
      <Head>
        <title>February Week 3 Questions</title>
      </Head>
      <div>
        <h1 className={utilStyles.headingXl}>JavaScript Questions</h1>
        {/* QUESTION #1 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>February 10th, 2023</p>
          <p className={utilStyles.headingMd}>Q1. Question1</p>
          Answer:{" "}
          <button
            onClick={() => {
              question1();
            }}
          >
            Execute Question #1
          </button>
        </div>
      </div>
    </Layout>
  );
}
// function wait() {
//   throw new Error("Function not implemented.");
// }
