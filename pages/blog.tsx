import Head from "next/head";
import Layout from "../components/shared/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/shared/date";
import { GetStaticProps } from "next";

export default function Blog({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  return (
    <Layout blog>
      <Head>
        <title>Jaeung Kim - Blog</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>JavaScript Basics</h2>
        <ul className={utilStyles.list}>
          <li className={utilStyles.listItem}>
            <Link href={`/questions/basicQuestions`}>Basic Questions</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={"2020-01-20"} />
            </small>
          </li>
          <li className={utilStyles.listItem}>
            <Link href={`/questions/febWeek1`}>February week 1 Questions</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={"2020-01-30"} />
            </small>
          </li>
          <li className={utilStyles.listItem}>
            <Link href={`/questions/febWeek2`}>February week 2 Questions</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={"2020-02-06"} />
            </small>
          </li>
          <li className={utilStyles.listItem}>
            <Link href={`/questions/febWeek3`}>February week 3 Questions</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={"2020-02-10"} />
            </small>
          </li>
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
