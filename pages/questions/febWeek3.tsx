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
  const question1 = () => {
    question1SetTimeoutWait(1000);
    question1SetTimeoutWait(1000);
    question1SetTimeoutWait(1000);
  };

  const question2 = () => {
    function login(email, password) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ userToken: "randomId" });
        }, 2000);
      });
    }
    function getDetails(userToken) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ name: "John Doe", dob: "6th May 1995" });
        }, 2000);
      });
    }
    function userDetails() {
      const token = login("abc@gmail.com", "1234");
      const details = getDetails(token);
      console.log(details);
    }
    return userDetails();
  };

  const question3 = () => {
    //example of writing a async function with settimeout (has to use new Promise or call settimeout await function from es7)
    function fetchItems() {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          var items = [1, 2, 3];
          resolve(items);
        }, 3000);
      });
    }

    //and calling that function with async
    async function logItems() {
      var resultItems = await fetchItems();
      console.log(resultItems); // [1,2,3]
    }

    //ANOTHER EXAMPLE WITH REAL API
    function fetchUser() {
      var url = "https://jsonplaceholder.typicode.com/users/1";
      return fetch(url).then(function (response) {
        return response.json();
      });
    }

    function fetchTodo() {
      var url = "https://jsonplaceholder.typicode.com/todos/1";
      return fetch(url).then(function (response) {
        return response.json();
      });
    }
    async function logTodoTitle() {
      try {
        var user = await fetchUser();
        if (user.id === 1) {
          var todo = await fetchTodo();
          console.log(todo.title); // delectus aut autem
        }
      } catch (error) {
        console.log(error);
      }
    }
    return logTodoTitle();
  };
  const leetcode1 = () => {
    /*
    https://leetcode.com/problems/check-if-two-string-arrays-are-equivalent/
    Given two string arrays word1 and word2, return true if the two arrays represent the same string, and false otherwise.

    A string is represented by an array if the array elements concatenated in order forms the string.

    Example 1:

    Input: word1 = ["ab", "c"], word2 = ["a", "bc"]
    Output: true
    Explanation:
    word1 represents string "ab" + "c" -> "abc"
    word2 represents string "a" + "bc" -> "abc"
    The strings are the same, so return true.

    Example 2:

    Input: word1 = ["a", "cb"], word2 = ["ab", "c"]
    Output: false

    Example 3:

    Input: word1  = ["abc", "d", "defg"], word2 = ["abcddefg"]
    Output: true

    Constraints:

    1 <= word1.length, word2.length <= 103
    1 <= word1[i].length, word2[i].length <= 103
    1 <= sum(word1[i].length), sum(word2[i].length) <= 103
    word1[i] and word2[i] consist of lowercase letters.
    */
  };
  const leetcode2 = () => {
    /*
    https://leetcode.com/problems/check-if-the-sentence-is-pangram/

    A pangram is a sentence where every letter of the English alphabet appears at least once.

    Given a string sentence containing only lowercase English letters, return true if sentence is a pangram, or false otherwise.

    Example 1:

    Input: sentence = "thequickbrownfoxjumpsoverthelazydog"
    Output: true
    Explanation: sentence contains at least one of every letter of the English alphabet.

    Example 2:

    Input: sentence = "leetcode"
    Output: false

    Constraints:

    1 <= sentence.length <= 1000
    sentence consists of lowercase English letters.
    */
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
          <p className={utilStyles.headingMd}>
            Q1. Currently this is not executing in sequence. Please use
            "Promise.all" and async/await to execute these functions in order
          </p>
          Answer:{" "}
          <button
            onClick={() => {
              question1();
            }}
          >
            Execute Question #1
          </button>
        </div>

        {/* QUESTION #2 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>February 10th, 2023</p>
          <p className={utilStyles.headingMd}>
            Q2. question2() is not returning anything at the moment, modify
            quesiton2() so it returns the user details. Please wrap it in try
            catch as well to handle errors.
          </p>
          Answer:{" "}
          <button
            onClick={() => {
              question2();
            }}
          >
            Execute Question #2
          </button>
        </div>

        {/* QUESTION #3 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>February 10th, 2023</p>
          <p className={utilStyles.headingMd}>Q3. Question 3</p>
          Answer:{" "}
          <button
            onClick={() => {
              question3();
            }}
          >
            Execute Question #3
          </button>
        </div>
        {/* LEETCODE #1 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>February 10th, 2023</p>
          <p className={utilStyles.headingMd}>Leetcode 1. </p>
          Answer:{" "}
          <button
            onClick={() => {
              leetcode1();
            }}
          >
            Execute LeetCode #1
          </button>
        </div>

        {/* LEETCODE #2 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>February 10th, 2023</p>
          <p className={utilStyles.headingMd}>Leetcode 2. </p>
          Answer:{" "}
          <button
            onClick={() => {
              leetcode2();
            }}
          >
            Execute LeetCode #2
          </button>
        </div>
      </div>
    </Layout>
  );
}
// function wait() {
//   throw new Error("Function not implemented.");
// }
