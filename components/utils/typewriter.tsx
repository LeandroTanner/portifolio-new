"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

export const Typewriter = ({
  words,
  typingSpeed = 150,
  deletingSpeed = 100,
  pauseTime = 2000, 
  className = "",
}: TypewriterProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const currentWord = words[currentWordIndex % words.length];

    const type = () => {
      setText((prev) => {
        if (isDeleting) {
          return currentWord.substring(0, prev.length - 1);
        } else {
          return currentWord.substring(0, prev.length + 1);
        }
      });
    };

    let timer: NodeJS.Timeout;

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && text === currentWord) {
      speed = pauseTime; 
      timer = setTimeout(() => setIsDeleting(true), speed);
    } 
    else if (isDeleting && text === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => prev + 1); 
      timer = setTimeout(type, typingSpeed);
    } 
    else {
      timer = setTimeout(type, speed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={`font-mono inline-flex items-center ${className}`}>
      {text}
      <span
        className={`ml-1 w-0.5 h-[1em] bg-current block ${
          cursorVisible ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
};