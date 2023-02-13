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
    await Promise.all([
      await question1SetTimeoutWait(1000),
      await question1SetTimeoutWait(1000),
      await question1SetTimeoutWait(1000),
    ]);
  };

  const question4 = () => {
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
  const question5 = () => {
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

        {/* QUESTION #2 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>February 10th, 2023</p>
          <p className={utilStyles.headingMd}>Q1. Question1</p>
          Answer:{" "}
          <button
            onClick={() => {
              question1();
            }}
          >
            Execute Question #2
          </button>
        </div>

        {/* QUESTION #4 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>February 10th, 2023</p>
          <p className={utilStyles.headingMd}>Q1. Question4</p>
          Answer:{" "}
          <button
            onClick={() => {
              question1();
            }}
          >
            Execute Question #4
          </button>
        </div>

        {/* QUESTION #5 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>February 10th, 2023</p>
          <p className={utilStyles.headingMd}>Q5. Question5</p>
          Answer:{" "}
          <button
            onClick={() => {
              question1();
            }}
          >
            Execute Question #5
          </button>
        </div>
      </div>
    </Layout>
  );
}
// function wait() {
//   throw new Error("Function not implemented.");
// }
