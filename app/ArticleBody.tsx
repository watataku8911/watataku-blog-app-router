import React from "react";

type Props = {
  highlightedBody: string;
};
const ArticleBody = (props: Props) => {
  return (
    <section className="markdown rounded-3xl bg-white dark:bg-black p-[1%] w-full">
      <div dangerouslySetInnerHTML={{ __html: props.highlightedBody }} />
    </section>
  );
};

export default ArticleBody;
