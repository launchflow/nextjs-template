"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [fullText, setFullText] = useState("Hello, World!");
  const [index, setIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    // Still typing
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
    // Typing just completed
    else if (index === fullText.length && !isTypingComplete && !isFetching) {
      setIsTypingComplete(true);

      // Wait 2 seconds then fetch new message
      const waitTimeout = setTimeout(() => {
        setIsFetching(true);
        fetchNewMessage();
      }, 2000);

      return () => clearTimeout(waitTimeout);
    }
  }, [index, fullText, isTypingComplete, isFetching]);

  const fetchNewMessage = async () => {
    try {
      console.log("Fetching new message...");
      const response = await fetch("/api/hello");
      const data = await response.json();

      // Reset for new message
      setText("");
      setIndex(0);
      setFullText(data.message);
      setIsTypingComplete(false);
      setIsFetching(false);

      console.log("New message received:", data.message);
    } catch (error) {
      console.error("Error fetching message:", error);
      setIsFetching(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="relative flex flex-col items-center">
        <h1 className="text-5xl font-bold text-slate-800 min-h-[4rem]">
          {text}
          <span className="animate-blink ml-1">|</span>
        </h1>
        <a
          href="https://infra.new"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-sm text-slate-500 hover:text-slate-700 transition-colors duration-200"
        >
          Deployed from infra.new
        </a>
      </div>
    </main>
  );
}
