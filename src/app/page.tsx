"use client";

import { useEffect, useState, useCallback } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [fullText, setFullText] = useState("Hello, World!");
  const [index, setIndex] = useState(0);

  // Define fetchNewMessage with useCallback to avoid recreation
  const fetchNewMessage = useCallback(async () => {
    console.log("fetchNewMessage called");
    try {
      const response = await fetch("/api/hello");
      console.log("API response received");
      const data = await response.json();
      console.log("New message:", data.message);

      // Reset everything for the new message
      setText("");
      setIndex(0);
      setFullText(data.message);
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  }, []);

  // Separate useEffect for typing animation
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 150);

      return () => clearTimeout(timeout);
    }
    // When typing is complete, wait and fetch new message
    else if (index === fullText.length) {
      console.log("Typing complete, waiting 2 seconds...");

      const waitTimeout = setTimeout(() => {
        console.log("2 seconds passed, fetching new message...");
        fetchNewMessage();
      }, 2000);

      return () => clearTimeout(waitTimeout);
    }
  }, [index, fullText, fetchNewMessage]);
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
