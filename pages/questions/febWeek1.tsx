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

// QUESTION #3 (Map / Filter / Reduce)
function question3(): any {
  /*
  Given array of objects of Star Wars Characters,
  MAP
  1. Get an array of all names
  2. Get an array of all heights
  3. Get an array of objects with just name and height properties
  4. Get an array of all first names

  REDUCE
  1. Get the total mass of all characters
  2. Get the total height of all characters
  3. Get the total number of characters in all the character names
  4. Get the total number of characters by eye color (hint. a map of eye color to count)

  FILTER
  1. Get characters with mass greater than 100
  2. Get characters with height less than 200
  3. Get all male characters
  4. Get all female characters

  SORT
  1. Sort by name
  2. Sort by mass
  3. Sort by height
  4. Sort by gender

  EVERY
  1. Does every character have blue eyes?
  2. Does every character have mass more than 40?
  3. Is every character shorter than 200?
  4. Is every character male?

  SOME
  1. Is there at least one male character?
  2. Is there at least one character with blue eyes?
  3. Is there at least one character taller than 200?
  4. Is there at least one character that has mass less than 50?
  */
  const characters = [
    {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      eye_color: "blue",
      gender: "male",
    },
    {
      name: "Darth Vader",
      height: "202",
      mass: "136",
      eye_color: "yellow",
      gender: "male",
    },
    {
      name: "Leia Organa",
      height: "150",
      mass: "49",
      eye_color: "brown",
      gender: "female",
    },
    {
      name: "Anakin Skywalker",
      height: "188",
      mass: "84",
      eye_color: "blue",
      gender: "male",
    },
  ];
}

// QUESTION #4
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
