import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import { useEffect, useState } from "react";

const API_URL = `https://jsonplaceholder.typicode.com/users`;
const WRONG_URL = `https://iamwrongurl`;

const question1 = async () => {
  /*
Please click on the URL to see the sample output you should see.
Upon a click of a button, it should print out those users on console
*/
  const users = await fetch(API_URL)
    .then((response) => response.json())
    .then((user) => user);

  return users;
};

const question2 = async () => {
  const users = await fetch(WRONG_URL)
    .then((response) => response.json())
    .then((user) => user);

  return users;
};

const question3 = () => {
  const user =
    // get users list
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json()) // parse JSON
      .then((users) => users[0]) // pick first user
      // get user data
      .then((user) =>
        fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`)
      )
      .then((userResponse) => userResponse.json()); // parse JSON

  return user;
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
            Q1. Given asynchronous function: question1() to be called upon the
            click of button, we can see that this function does not return the
            result we expect. Currently, it should output Promise at pending
            state. Explain what is going on and fix the onClick function to
            return the result.
          </p>
          Answer:{" "}
          <button
            onClick={() => {
              const result = question1();
              console.log(result);
            }}
          >
            Execute Question #1
          </button>
        </div>

        {/* QUESTION #2 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>February 6th, 2023</p>
          <p className={utilStyles.headingMd}>
            Q2. Note that we are purposely passing the wrong URL here, this will
            fail to fetch as we are passing the wrong url. Please throw new
            error or console log the error upon failure. You need to change the
            function: question2() and onClick function.
          </p>
          Answer:{" "}
          <button
            onClick={() => {
              const result = question2();
              console.log(result);
            }}
          >
            Execute Question #2
          </button>
        </div>

        {/* QUESTION #3 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>February 6th, 2023</p>
          <p className={utilStyles.headingMd}>
            Q3. Now, instead of fetching all users, we would like to fetch only
            the first object of user which is "id": 1, "name": "Leanne Graham",
            "username": "Bret", "email": "Sincere@april.biz", "address": ....
            and so on from the question3() i've written the code with promise
            chaining which is very unorganized. Please fix this function to
            async/await.
          </p>
          Answer:{" "}
          <button
            onClick={() => {
              const result = question3();
              console.log(result);
            }}
          >
            Execute Question #2
          </button>
        </div>
      </div>
    </Layout>
  );
}
// function wait() {
//   throw new Error("Function not implemented.");
// }
