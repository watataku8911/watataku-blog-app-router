import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";
import { Metadata } from "next";
import type { Blog, BlogContents } from "../../../types/blog";
import HeadLine from "@/app/HeadLine";
import BlogList from "@/app/BlogList";
import {
  datePlasticSurgery,
  getMicroCMSBlog,
  getMicroCMSBlogs,
} from "@/functions/function";
import ArticleBody from "@/app/ArticleBody";
import { notFound } from "next/navigation";

const getAllPosts = async (limit: number): Promise<Blog[]> => {
  const data: BlogContents = await getMicroCMSBlogs(limit);

  // エラーハンドリングを行うことが推奨されている
  if (!data) {
    throw new Error("Failed to fetch articles");
  }

  return data.contents;
};

const getPost = async (slug: string): Promise<Blog> => {
  const blog: Blog = await getMicroCMSBlog(slug);
  if (!blog) {
    notFound();
  }
  return blog;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = await getPost(params.slug);
  return {
    title: blog.title,
    description: blog.body,
    openGraph: {
      title: blog.title,
      description: blog.body,
      url: "https://watataku-blog-app-router.vercel.app/api/blog/" + blog.id,
      siteName: blog.title,
      type: "article",
      images: `https://watataku-blog-app-router.vercel.app/api/og?title=${
        blog.title
      }&postDate=${datePlasticSurgery(blog.publishedAt)}投稿`,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.body,
      images: `https://watataku-blog-app-router.vercel.app/api/og?title=${
        blog.title
      }&postDate=${datePlasticSurgery(blog.publishedAt)}投稿`,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const LIMIT = 6;

  const blog = await getPost(params.slug);

  const blogs = await getAllPosts(LIMIT);

  const $ = cheerio.load(blog.body);
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  return (
    <div className="pt-14 pb-5">
      <HeadLine blog={blog} />

      <div className="flex justify-between m-auto w-[90%] maxpc:w-[96%] maxpc:flex-col">
        <ArticleBody highlightedBody={$.html()} />
      </div>

      <BlogList blogs={blogs} />
    </div>
  );
}

export async function generateStaticParams() {
  const Limit = 999;
  const blogs: BlogContents = await getMicroCMSBlogs(Limit);

  return blogs.contents.map((blog: Blog) => ({
    slug: blog.id.toString(),
  }));
}
