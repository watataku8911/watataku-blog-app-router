import BlogList from "@/app/BlogList";
import Pagination from "@/app/Pagination";
import { getMicroCMSBlogs, range } from "@/functions/function";
import { BlogContents } from "@/types/blog";
import { notFound } from "next/navigation";

const PER_PAGE = 9;
const getAllPosts = async (pageNo: number): Promise<BlogContents> => {
  const data: BlogContents = await getMicroCMSBlogs(
    PER_PAGE,
    (pageNo - 1) * PER_PAGE
  );

  // エラーハンドリングを行うことが推奨されている
  if (!data) {
    throw new Error("Failed to fetch articles");
  }

  return data;
};
export default async function Home({ params }: { params: { pageNo: string } }) {
  const pageNo = Number(params.pageNo);

  const blogs = await getAllPosts(pageNo);
  if (blogs.contents.length == 0) {
    notFound();
  }
  return (
    <main className="min-h-[calc(100vh_-_170px)]">
      <BlogList blogs={blogs.contents} />
      {blogs.totalCount > PER_PAGE && (
        <Pagination totalCount={blogs.totalCount} />
      )}
    </main>
  );
}

export async function generateStaticParams() {
  const blogs: BlogContents = await getMicroCMSBlogs();

  return range(1, Math.ceil(blogs.totalCount / PER_PAGE)).map((repo) => ({
    pageNo: repo.toString(),
  }));
}
