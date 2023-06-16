import Link from "next/link";
import Image from "next/image";
import type { Tags } from "../types/blog";
import { datePlasticSurgery } from "@/functions/function";
import IconTag from "../public/img/icon_tag_navy.svg";

type Props = {
  id: string;
  thumbnail: string;
  title: string;
  tags: Tags[];
  publishedAt: string;
};

const Card = (props: Props) => {
  return (
    <li className="relative mb-2.5 mt-3.5 cursor-pointer border w-[350px] h-[380px] tbpc:w-[30vw] tbpc:h-[310px] maxsp:w-[95%] border-black dark:border-white  hover:translate-x-0 hover:translate-y-1.5 bg-white dark:bg-black ">
      <Link href={`/blog/${props.id}`} passHref>
        <Image
          className="object-cover aspect-video w-full h-auto"
          src={props.thumbnail}
          unoptimized={true}
          width={350}
          height={200}
          alt={"サムネイル"}
        />

        <h2 className="pt-3 pr-3 pl-3 text-lg font-medium overflow-hidden webkit-line-clamp dark:text-white">
          {props.title}
        </h2>

        <ul className="flex flex-start flex-wrap mt-1">
          {props.tags.map((tag: Tags) => {
            return (
              <li
                key={tag.id}
                className="flex justify-center items-center p-0.5 border-solid border-2 ml-2 mb-2 border-[#5bbee5] dark:border-[#7388c0] dark:text-white"
              >
                <IconTag className="dark:fill-white" />
                {tag.tag_name}
              </li>
            );
          })}
        </ul>

        <time
          datatype={props.publishedAt}
          className="absolute bottom-[5px] right-[5px] dark:text-white"
        >
          {datePlasticSurgery(props.publishedAt)}
        </time>
      </Link>
    </li>
  );
};
export default Card;
