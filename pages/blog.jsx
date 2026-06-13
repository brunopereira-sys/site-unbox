import React from 'react';
import Head from 'next/head';
import BlogPage from '../components/BlogPage';
import { BLOG_POSTS } from '../lib/blogData';

export default function Blog({ posts }) {
  return (
    <React.Fragment>
      <Head>
        <title>Blog Venda Mais! · Unbox</title>
        <meta name="description" content="Dicas, estratégias e novidades sobre e-commerce, marketing e gestão para você vender mais e melhor." />
        <link rel="canonical" href="https://www.unbox.com.br/blog" />
        <meta property="og:url" content="https://www.unbox.com.br/blog" />
        <meta property="og:title" content="Blog Venda Mais! · Unbox" />
        <meta property="og:description" content="Dicas, estratégias e novidades sobre e-commerce, marketing e gestão para você vender mais e melhor." />
        <meta property="og:image" content="https://www.unbox.com.br/img/og-image.png" />
      </Head>
      <BlogPage posts={posts} />
    </React.Fragment>
  );
}

export function getStaticProps() {
  return { props: { posts: BLOG_POSTS } };
}
