import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import { useEffect, useState } from "react";

const API_URL = `https://jsonplaceholder.typicode.com/users`;
const WRONG_URL = `https://iamwrongurl`;

const getUsers = async () => {
  /*
Please click on the URL to see the sample output you should see.
Upon a click of a button, it should print out those users on console
*/
  const users = await fetch(API_URL)
    .then((response) => response.json()) //parsing
    .then((user) => user);
  return users;
};

const question2 = async () => {
  try {
    const response = await fetch(API_URL);
    const users = await response.json();
    return users;
  } catch (error) {
    return console.log("I FAILED" + error);
  }

  // .then((response) => response.json())
  // .catch((error) => console.log("I FAILED TO FETCH FROM API " + error))
  // .then((user) => user)
  // .catch((error)=>console.log("I FAILED TO STORE USER " + error))
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

const question4Async = async () => {
  // get users list
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
const question4AsyncAwait = async () => {
  const result = await question4Async();
  console.log(result);
};

const question4 = (array) => {
  //https://leetcode.com/problems/final-value-of-variable-after-performing-operations/
  /*
  There is a programming language with only four operations and one variable X:

  ++X and X++ increments the value of the variable X by 1.
  --X and X-- decrements the value of the variable X by 1.
  Initially, the value of X is 0.

  Given an array of strings operations containing a list of operations, return the final value of X after performing all the operations.

  Example 1:

  Input: operations = ["--X","X++","X++"]
  Output: 1
  Explanation: The operations are performed as follows:
  Initially, X = 0.
  --X: X is decremented by 1, X =  0 - 1 = -1.
  X++: X is incremented by 1, X = -1 + 1 =  0.
  X++: X is incremented by 1, X =  0 + 1 =  1.

  Example 2:

  Input: operations = ["++X","++X","X++"]
  Output: 3
  Explanation: The operations are performed as follows:
  Initially, X = 0.
  ++X: X is incremented by 1, X = 0 + 1 = 1.
  ++X: X is incremented by 1, X = 1 + 1 = 2.
  X++: X is incremented by 1, X = 2 + 1 = 3.

  Example 3:

  Input: operations = ["X++","++X","--X","X--"]
  Output: 0
  Explanation: The operations are performed as follows:
  Initially, X = 0.
  X++: X is incremented by 1, X = 0 + 1 = 1.
  ++X: X is incremented by 1, X = 1 + 1 = 2.
  --X: X is decremented by 1, X = 2 - 1 = 1.
  X--: X is decremented by 1, X = 1 - 1 = 0.
  */
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
            onClick={async () => {
              const users = await getUsers();
              console.log(users);
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
            onClick={async () => {
              const result = await question2();
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
              question4AsyncAwait();
            }}
          >
            Execute Question #2
          </button>
        </div>

        {/* QUESTION #4 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>February 6th, 2023</p>
          <p className={utilStyles.headingMd}>
            Q4. Output the answer (leetcode) - it should output 1 if given array
            : ["--X","X++","X++"]
          </p>
          Answer: {question4(["--X", "X++", "X++"])};
        </div>
      </div>
    </Layout>
  );
}
// function wait() {
//   throw new Error("Function not implemented.");
// }
