import BlogList from "@/app/BlogList";
import Pagination from "@/app/Pagination";
import { getMicroCMSBlogs, getMicroCMSTag, range } from "@/functions/function";
import { BlogContents, TagsContents } from "@/types/blog";

const PER_PAGE = 9;
const getAllPosts = async (
  pageNo: number,
  categoryId: string
): Promise<BlogContents> => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const data: BlogContents = await getMicroCMSBlogs(
    PER_PAGE,
    (pageNo - 1) * PER_PAGE,
    "tags[contains]" + categoryId
  );

  // エラーハンドリングを行うことが推奨されている
  if (!data) {
    throw new Error("Failed to fetch articles");
  }

  return data;
};
export default async function Home({
  params,
}: {
  params: { categoryId: string; pageNo: string };
}) {
  const pageNo = Number(params.pageNo);
  const tagId = params.categoryId;

  const blogs = await getAllPosts(pageNo, tagId);

  return (
    <>
      {blogs.contents.length == 0 ? (
        <main className="w-[1100px] tbpc:w-[95%] maxsp:w-[100%] min-h-[calc(100vh_-_170px)] m-auto flex flex-wrap justify-center items-center">
          <h2 className="text-4xl dark:text-white">
            このタグが付いている記事はありません。
          </h2>
        </main>
      ) : (
        <main className="min-h-[calc(100vh_-_170px)]">
          <BlogList blogs={blogs.contents} />
          {blogs.totalCount > PER_PAGE && (
            <Pagination totalCount={blogs.totalCount} tag_id={tagId} />
          )}
        </main>
      )}
    </>
  );
}

export async function generateStaticParams() {
  const tags: TagsContents = await getMicroCMSTag();

  const blogs: BlogContents = await getMicroCMSBlogs();

  const categoryParams = tags.contents.flatMap((tag) =>
    range(1, Math.ceil(blogs.totalCount / PER_PAGE)).map((number) => ({
      params: {
        categoryId: tag.id,
        pageMo: number.toString(),
      },
    }))
  );
  return categoryParams;
}
