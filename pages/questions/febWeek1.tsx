import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";

// QUESTION #1
function question1(): any {
  /*
  Given sample student object, 
  console log ['science', 'math'].
  */
  const student = {
    name: "John",
    age: 20,
    marks: {
      science: 70,
      math: 75,
    },
  };

  return;
}

// QUESTION #2
function question2(): any {
  /*
  Given sample students array of objects, (1,2,3 are sample outputs)
  1. console log
    [
      { science: 99, math: 50 },
      { science: 12, math: 35 },
      { science: 70, math: 75 }
    ]
  2. console log 
    [ [ 'science', 'math' ], [ 'science', 'math' ], [ 'science', 'math' ] ]
  3. console log 
    [ [ 99, 50 ], [ 12, 35 ], [ 70, 75 ] ]
  4. console.log
    [
      [ [ 'science', 99 ], [ 'math', 50 ] ],
      [ [ 'science', 12 ], [ 'math', 35 ] ],
      [ [ 'science', 70 ], [ 'math', 75 ] ]
    ]
  */
  const students = [
    {
      name: "Abignale",
      age: 35,
      marks: {
        science: 99,
        math: 50,
      },
    },
    {
      name: "Brian",
      age: 13,
      marks: {
        science: 12,
        math: 35,
      },
    },
    {
      name: "Chris",
      age: 75,
      marks: {
        science: 70,
        math: 75,
      },
    },
  ];
  return;
}

// QUESTION #3
function question3(): any {
  
}

// QUESTION #4
function question4(): any {}

// QUESTION #5
function fizzBuzz(n: number): any {
  /*
  인터뷰에 굉장히 많이 나오는 문제입니다 한번 풀어보세요!

    Given an integer n, return a string array answer (1-indexed) where:

    answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
    answer[i] == "Fizz" if i is divisible by 3.
    answer[i] == "Buzz" if i is divisible by 5.
    answer[i] == i (as a string) if none of the above conditions are true.
    

    Example 1:
    Input: n = 3
    Output: ["1","2","Fizz"]

    Example 2:
    Input: n = 5
    Output: ["1","2","Fizz","4","Buzz"]

    Example 3:
    Input: n = 15
    output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
  */
  return;
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
            Q1. Return an answer for question #1
          </p>
          <p>
            Answer: <span>{question1()}</span>
          </p>
        </div>

        {/* QUESTION #2 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>January 30th, 2023</p>
          <p className={utilStyles.headingMd}>
            Q2. Return an answer for question #2
          </p>
          <p>
            Answer: <span>{question2()}</span>
          </p>
        </div>

        {/* QUESTION #3 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>January 30th, 2023</p>
          <p className={utilStyles.headingMd}>
            Q3. Return an answer for question #3
          </p>
          <p>
            Answer: <span>{question3()}</span>
          </p>
        </div>

        {/* QUESTION #4 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>January 30th, 2023</p>
          <p className={utilStyles.headingMd}>
            Q4. Return an answer for question #4
          </p>
          <p>
            Answer: <span>{question4()}</span>
          </p>
        </div>

        {/* QUESTION #5 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>January 30th, 2023</p>
          <p className={utilStyles.headingMd}>
            Q5. Return an answer for question #5 - fizzbuzz question
          </p>
          <p>
            Answer: <span>{fizzBuzz(55)}</span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
