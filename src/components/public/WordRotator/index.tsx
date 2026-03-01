"use client";

import { useState, useEffect } from "react";
import "./styles.css";

interface WordRotatorProps {
  words: string[];
  interval?: number;
}

export function WordRotator({ words, interval = 2000 }: WordRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return <span className="word-rotator">{words[index]}</span>;
}
