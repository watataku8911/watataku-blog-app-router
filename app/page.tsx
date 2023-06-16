import { getMicroCMSBlogs } from "@/functions/function";
import type { BlogContents } from "../types/blog";
import BlogList from "./BlogList";
import Pagination from "./Pagination";

const PER_PAGE = 9;
const getAllPosts = async (): Promise<BlogContents> => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const data: BlogContents = await getMicroCMSBlogs(PER_PAGE);

  // エラーハンドリングを行うことが推奨されている
  if (!data) {
    throw new Error("Failed to fetch articles");
  }

  return data;
};
export default async function Home() {
  const blogs = await getAllPosts();
  return (
    <main className="min-h-[calc(100vh_-_170px)]">
      <BlogList blogs={blogs.contents} />
      {blogs.totalCount > PER_PAGE && (
        <Pagination totalCount={blogs.totalCount} />
      )}
    </main>
  );
}
