import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import { useEffect, useState } from "react";

//https://springfall.cc/post/7

const getFirstUserData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json(); // parse JSON
  const user = users[0]; // pick first user
  // get user data
  const userResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${user.id}`
  );
  const userData = await userResponse.json(); // parse JSON
  return userData;
};

export default function febWeek1() {
  return (
    <Layout>
      <Head>
        <title>February Week 2 Questions</title>
      </Head>
      <div>
        <h1 className={utilStyles.headingXl}>JavaScript Promise Questions</h1>
        {/* QUESTION #1 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>February 6th, 2023</p>
          <p className={utilStyles.headingMd}>
            Q1. Given this code format what
          </p>
          Answer:{" "}
          <button
            onClick={async () => {
              const result = await getFirstUserData();
              console.log(result);
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
