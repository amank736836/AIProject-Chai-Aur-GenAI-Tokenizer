"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";

type TypeWriterProps = {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  holdTime?: number;
};

/** Expressive typography: cyclic typewriter with a blinking caret. */
export default function TypeWriter({
  phrases,
  className = "",
  typingSpeed = 62,
  deletingSpeed = 32,
  holdTime = 1500,
}: TypeWriterProps) {
  const reduced = useReducedMotion();
  const [text, setText] = useState(reduced ? phrases[0] : "");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (reduced) {
      setText(phrases[0]);
      return;
    }

    const current = phrases[index % phrases.length];
    const done = !deleting && text === current;
    const cleared = deleting && text === "";

    let delay = deleting ? deletingSpeed : typingSpeed;
    if (done) delay = holdTime;
    if (cleared) delay = 220;

    const timer = setTimeout(() => {
      if (done) {
        setDeleting(true);
        return;
      }
      if (cleared) {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
        return;
      }
      setText(
        deleting
          ? current.slice(0, Math.max(0, text.length - 1))
          : current.slice(0, text.length + 1)
      );
    }, delay);

    timeouts.current.push(timer);
    return () => clearTimeout(timer);
  }, [text, deleting, index, phrases, typingSpeed, deletingSpeed, holdTime, reduced]);

  useEffect(
    () => () => {
      timeouts.current.forEach(clearTimeout);
    },
    []
  );

  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className={`typewriter ${className}`.trim()}>
      {/* invisible sizer keeps the layout stable while typing */}
      <span className="typewriter-sizer" aria-hidden="true">
        {longest}
      </span>
      <span className="typewriter-live">
        <span className="typewriter-text">{text}</span>
        <span className="typewriter-caret" aria-hidden="true" />
      </span>
    </span>
  );
}
