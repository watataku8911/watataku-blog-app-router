"use client";
import Link from "next/link";
import Image from "next/image";
import { Great_Vibes } from "next/font/google";
import { useState, useCallback, useEffect } from "react";
import { TagsContents, Tags } from "../types/blog";
import Modal from "./Modal";
import { getMicroCMSTag } from "@/functions/function";

const greatVibes = Great_Vibes({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const Header = () => {
  const [tags, setTags] = useState<Tags[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchGetTags()
      .then((tags) => {
        setTags(tags);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setTags]);

  const fetchGetTags = async (): Promise<Tags[]> => {
    const tags: TagsContents = await getMicroCMSTag();
    return tags.contents;
  };

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <header className="bg-[linear-gradient(to_right,_#ADDFF2_20%,_#5bbee5_80%)] dark:bg-[linear-gradient(to_right,_#7388c0_20%,_#3A4461_80%)]">
      <div className="h-[75px] m-auto flex items-center justify-between w-[90%]">
        <h1
          className={`${greatVibes.className} dark:text-white text-5xl maxsp:text-4xl`}
        >
          <Link href="/">T.W</Link>
        </h1>
        <nav className="w-[20%] tbpc:w-[30%] maxsp:w-[50%] flex justify-around items-center">
          <Image
            src="/img/search.svg"
            width={32}
            height={32}
            alt="search"
            className="block cursor-pointer hover:scale-125 dark:hidden"
            onClick={handleOpen}
          />
          <Image
            src="/img/search_white.svg"
            width={32}
            height={32}
            alt="searchWhite"
            className="hidden cursor-pointer hover:scale-125 dark:block"
            onClick={handleOpen}
          />
          <Modal
            open={open}
            title={"タグ検索"}
            tags={tags}
            handleClose={handleClose}
          />
          <a
            className="hover:scale-125"
            href="https://watataku-portfolio.vercel.app/about"
            target="_blank"
            rel="noreferrer"
            aria-label="プロフィール"
          >
            <Image
              src="/img/user.svg"
              width={32}
              height={32}
              alt="user"
              className="block dark:hidden"
            />
            <Image
              src="/img/user_white.svg"
              width={32}
              height={32}
              alt="userWhite"
              className="hidden dark:block"
            />
          </a>
        </nav>
      </div>
    </header>
  );
};
export default Header;
