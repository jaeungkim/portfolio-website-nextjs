import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";

// QUESTION #1
function reverseString(givenString: string): String {
  const stringToArray = givenString.split("");
  return stringToArray.reverse().join("");
}

// QUESTION #2
function question2(): any {
  //Given an Object "Person" with following attributes
  const Person = {
    fName: "Kiwoon",
    lName: "Jung",
  };

  const Student = {
    firstName: Person.fName,
    lastName: Person.lName,
    fullName: Person.fName + Person.lName,
  };

  /*Create a new Object with given Outcome. You must not hardcode solution.
   const Student = {
     firstName: "Kiwoon",
     lastName: "Jung",
     fullName: "Kiwoon Jung",
   };

  Due to the nature of javaScript, output given in html return might be off. Please try your best in outputting a solution (hint: use JSON.stringify())
  */

  //WRITE YOUR CODE HERE SAMPLE OUTPUT = {"firstName":"Kiwoon","lastName":"Jung","fullName":"KiwoonJung"}
  return JSON.stringify(Student);
}

// QUESTION #3
function question3(): any {
  //Given an Object "Person" with following attributes
  const People = [
    {
      fName: "Kiwoon",
      lName: "Jung",
    },
    {
      fName: "Jaeung",
      lName: "Kim",
    },
  ];

  const Students = [
    {
      firstName: People[0].fName,
      lastName: People[0].lName,
      fullName: `${People[0].fName} ${People[0].lName}`,
    },
    {
      firstName: People[1].fName,
      lastName: People[1].lName,
      fullName: `${People[1].fName} ${People[1].lName}`,
    },
  ];

  /*Create a new Object with given Outcome. Same approach as Question 2 but this time it's array of objects
   output should look something like this:
   const Student = [
     {
       firstName: "Kiwoon",
       lastName: "Jung",
       fullName: "Kiwoon Jung",
     },
     {
       firstName: "Jaeung",
       lastName: "Kim",
       fullName: "Jaeung Kim",
     },
   ];

  Due to the nature of javaScript, output given in html return might be off. Please try your best in outputting a solution (hint: use JSON.strinify())
  */

  //WRITE YOUR CODE HERE SAMPLE OUTPUT = [{"firstName":"Kiwoon","lastName":"Jung","fullName":"KiwoonJung"},{"firstName":"Jaeung","lastName":"Kim","fullName":"JaeungKim"}]
  return JSON.stringify(Students);
}

// QUESTION #4
function question4(): any {
  const library = [
    {
      author: "Bill Gates",
      title: "The Road Ahead",
      readingStatus: true,
    },
    {
      author: "Steve Jobs",
      title: "Walter Isaacson",
      readingStatus: true,
    },
    {
      author: "Suzanne Collins",
      title: "Mockingjay: The Final Book of The Hunger Games",
      readingStatus: false,
    },
  ];

  const author = library.map((book) => book.author);

  //Write a function to return an array of author from library object arry  = ['Bill Gates', 'Steve Jobs', 'Suzanne Collins'];
  return JSON.stringify(author);
}

// QUESTION #5
function TwoSum(numArray: Number[], target: Number): any[] {
  /* Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 You may assume that each input would have exactly one solution, and you may not use the same element twice.
 You can return the answer in any order.

  Example 1:
    Input: nums = [2,7,11,15], target = 9
    Output: [0,1]
    Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

  Example 2:
    Input: nums = [3,2,4], target = 6
    Output: [1,2]

  Example 3:
    Input: nums = [3,3], target = 6
    Output: [0,1]
 */
}

// QUESTION #6
function question6(): any {
  const passengers = [
    {
      id: 1,
      passengerName: "Freddie Mercury",
      isVegetarianOrVegan: false,
      connectedFlights: 2,
    },
    {
      id: 2,
      passengerName: "Amy Winehouse",
      isVegetarianOrVegan: true,
      connectedFlights: 4,
    },
    {
      id: 3,
      passengerName: "Kurt Cobain",
      isVegetarianOrVegan: true,
      connectedFlights: 3,
    },
    {
      id: 4,
      passengerName: "Michael Jackson",
      isVegetarianOrVegan: true,
      connectedFlights: 1,
    },
  ];

  const passengersName = passengers.map((passenger) => passenger.passengerName);

  const vegetarianOrVegan = passengers.filter(
    (passenger) => passenger.isVegetarianOrVegan === true
  );

  const descendingOrder = passengers.sort(
    (a, b) => a.connectedFlights - b.connectedFlights
  );

  // Main Question: Get the passengers' names using the data provided
  // Bonus Part (a)- Return vegetarians/vegans
  // Bonus Part (b)- Sort passengers by the number of connected flights in descending order

  console.log(passengersName);
  console.log(vegetarianOrVegan);
  console.log(descendingOrder);
}

// QUESTION #7
function question7(array: String[]): any {
  /*given array of Strings,

  Create a function that returns an Object with value that counts the occurence of string in an array.

  ex) let arr = ['hello', 'world', 'java', 'hello', 'java'];

  output would looke like { hello: 2, world: 1, java: 2 }

  */
  return;
}

// QUESTION #8 - reduce function advaned
function question8(): any {
  const friends = [
    {
      name: "Anna",
      books: ["Bible", "Harry Potter"],
      age: 21,
    },
    {
      name: "Bob",
      books: ["War and peace", "Romeo and Juliet"],
      age: 26,
    },
    {
      name: "Alice",
      books: ["The Lord of the Rings", "The Shining"],
      age: 18,
    },
  ];

  const books = friends.reduce(
    (accumulator, currentValue) => [...accumulator, ...currentValue.books],
    ["Alphabet"]
  );

  /* Given an array of objects, output the following result using reduce function. or without javascript methods
  [
    'Alphabet', 'Bible', 'Harry Potter', 'War and peace',
    'Romeo and Juliet', 'The Lord of the Rings',
    'The Shining'
  ]
 */

  return JSON.stringify(books);
}

// QUESTION #9 - Remove Vowels from a String
function RemoveVowels(str: string): any {
  //'leetcodeisfun' would return = 'ltcdsfn'

  /* Given a string s, remove the vowels 'a', 'e', 'i', 'o', and 'u' from it, and return the new string.

    Example 1:

    Input: s = "leetcodeisacommunityforcoders"
    Output: "ltcdscmmntyfrcdrs"
    Example 2:

    Input: s = "aeiou"
    Output: ""

    Constraints:

    1 <= s.length <= 1000
    s consists of only lowercase English letters.
 */

  function wordFilter(word) {
    const output = word
      .split("")
      .filter(
        (el) =>
          el !== "a" && el !== "e" && el !== "i" && el !== "o" && el !== "u"
      )
      .join("");
    return output;
  }

  const example1 = wordFilter("leetcodeisacommunityforcoders");
  const example2 = wordFilter("aeiou");

  return JSON.stringify(example1, example2);
}

export default function basicQuestions() {
  return (
    <Layout>
      <Head>
        <title>JavaScript Basic Questions</title>
      </Head>
      <div>
        <h1 className={utilStyles.headingXl}>JavaScript Basic Questions</h1>
        {/* QUESTION #1 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>January 20th, 2023</p>
          <p className={utilStyles.headingMd}>
            Q1. Reverse a given string. "Hello World"
          </p>
          <p>
            Answer: <span>{reverseString("Hello Wrodl")}</span>
          </p>
        </div>

        {/* QUESTION #2 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>January 20th, 2023</p>
          <p className={utilStyles.headingMd}>
            Q2. Return answer for Question #2
          </p>
          <p>
            Answer: <span>{question2()}</span>
          </p>
        </div>

        {/* QUESTION #3 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>January 20th, 2023</p>
          <p className={utilStyles.headingMd}>
            Q3. Return answer for Question #3
          </p>
          <p>
            Answer: <span>{question3()}</span>
          </p>
        </div>

        {/* QUESTION #4 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>January 20th, 2023</p>
          <p className={utilStyles.headingMd}>
            Q4. Return answer for Question #4
          </p>
          <p>
            Answer: <span>{question4()}</span>
          </p>
        </div>

        {/* QUESTION #5 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>January 20th, 2023</p>
          <p className={utilStyles.headingMd}>Q5. LeetCode - Two Sum </p>
          <p>
            Answer: <span>{TwoSum([2, 7, 11, 15], 9)}</span>
          </p>
        </div>

        {/* QUESTION #6 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>January 23rd, 2023</p>
          <p className={utilStyles.headingMd}>
            Q6. Console log answer for Question #6{" "}
          </p>
        </div>

        {/* QUESTION #7 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>January 23rd, 2023</p>
          <p className={utilStyles.headingMd}>
            Q7. Return answer for Question #7{" "}
          </p>
          <p>
            Answer:{" "}
            <span>
              {question7(["hello", "world", "java", "hello", "java"])}
            </span>
          </p>
        </div>

        {/* QUESTION #8 */}
        <div className={utilStyles.questionsDiv}>
          <p className={utilStyles.lightText}>January 23rd, 2023</p>
          <p className={utilStyles.headingMd}>
            Q8. Return answer for Question #8{" "}
          </p>
          <p>
            Answer: <span>{question8()}</span>
          </p>
        </div>
      </div>

      {/* QUESTION #9 */}
      <div className={utilStyles.questionsDiv}>
        <p className={utilStyles.lightText}>January 23rd, 2023</p>
        <p className={utilStyles.headingMd}>
          Q9. Remove Vowels from given string (Vowels are : a,e,i,o,u){" "}
        </p>
        <p>
          Answer: <span>{RemoveVowels("leetcodeisfun")}</span>
        </p>
      </div>
    </Layout>
  );
}
