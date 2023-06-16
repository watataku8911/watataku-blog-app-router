"use client"; // Error components must be Client components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex justify-center items-center min-h-[calc(100vh_-_170px)]">
      <h2 className="text-4xl dark:text-white">予期せぬエラーが発生しました</h2>
      <div className="absolute bottom-3">
        <button onClick={() => reset()}>Try again</button>
      </div>
    </main>
  );
}
