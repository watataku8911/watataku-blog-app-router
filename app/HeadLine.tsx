import React from "react";
import Image from "next/image";
import { datePlasticSurgery } from "../functions/function";
import { Blog } from "../types/blog";
import IconCalendar from "../public/img/icon_calendar.svg";
import IconRefresh from "../public/img/icon_refresh.svg";
type Props = {
  blog: Blog;
};
const HeadLine = (props: Props) => {
  return (
    <section className="mb-5 text-center">
      <p className="w-[100px] h-[80.6px] border border-black dark:border-white m-auto">
        <Image
          src={props.blog.thumbnail.url}
          width={100}
          height={80}
          className="object-cover h-[78px]"
          alt={"サムネイル"}
        />
      </p>

      <h1 className="my-4 font-bold text-4xl maxsp:text-xl dark:text-white">
        {props.blog.title}
      </h1>

      <div className="m-auto flex justify-between items-center  w-[700px] tbpc:w-[550px] maxsp:w-[98%]">
        <div className="flex items-center gap-2.5 tbpc:gap-4 maxsp:gap-0.5 maxsp:text-xs">
          <IconCalendar className="dark:fill-white" />
          <time
            className="text-gray-600 dark:text-gray-100"
            datatype={props.blog.publishedAt}
          >
            {datePlasticSurgery(props.blog.publishedAt)}に公開
          </time>
        </div>
        <div className="flex items-center gap-2.5 tbpc:gap-4 maxsp:gap-0.5 maxsp:text-xs">
          <IconRefresh className="dark:fill-white" />
          <time
            className="text-gray-600 dark:text-gray-100"
            datatype={props.blog.updatedAt}
          >
            {datePlasticSurgery(props.blog.updatedAt)}に更新
          </time>
        </div>
      </div>
    </section>
  );
};

export default HeadLine;
