import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/date';
import utilStyles from '@/styles/utils.module.css';
import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXL}>
          {postData.title}
        </h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date}></Date>
        </div>
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}></div>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds();

  console.log('paths', paths);
  return {
    paths,
    fallback: false,
  }
}

// todo这个params是从哪里传入的？
export async function getStaticProps({ params }) {
  console.log('params', params);
  const postData = getPostData(params.id);

  return {
    props: {
      postData,
    }
  }
}