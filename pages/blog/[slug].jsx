import React from 'react';
import Head from 'next/head';
import BlogPostPage from '../../components/BlogPostPage';
import { BLOG_POSTS } from '../../lib/blogData';
import { BLOG_BODIES } from '../../lib/blogBodies';

export default function BlogArticle({ post, body, more }) {
  const title = post ? `${post.name} — Blog Unbox` : 'Artigo — Blog Unbox';
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={post?.overview || 'Blog Venda Mais! da Unbox.'} />
        <link rel="canonical" href={`https://www.unbox.com.br/blog/${post?.slug || ''}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={post?.overview || 'Blog Venda Mais! da Unbox.'} />
        <meta property="og:image" content={post?.image || 'https://www.unbox.com.br/img/og-image.png'} />
      </Head>
      <BlogPostPage post={post} body={body} more={more} />
    </React.Fragment>
  );
}

export function getStaticPaths() {
  return {
    paths: BLOG_POSTS.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug) || null;
  if (!post) return { notFound: true };
  const body = BLOG_BODIES[params.slug] || '';
  const more = BLOG_POSTS.filter((p) => p.slug !== params.slug).slice(0, 3);
  return { props: { post, body, more } };
}
