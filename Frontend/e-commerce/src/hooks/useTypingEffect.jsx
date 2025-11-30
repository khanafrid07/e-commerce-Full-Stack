import { useEffect, useState } from "react";

export default function useTypingEffect(words, speed = 80, delay = 900) {

  const [index, setIndex] = useState(0);      // Which word
  const [subIndex, setSubIndex] = useState(0); // Which character of the word
  const [forward, setForward] = useState(true); // Typing or deleting?

  useEffect(() => {
    const currentWord = words[index];

    // Typing forward
    if (forward) {
      if (subIndex < currentWord.length) {
        const timeout = setTimeout(() => {
          setSubIndex(subIndex + 1);
        }, speed);
        return () => clearTimeout(timeout);
      }

      // Word finished typing → wait → start deleting
      if (subIndex === currentWord.length) {
        const timeout = setTimeout(() => setForward(false), delay);
        return () => clearTimeout(timeout);
      }
    }

    // Deleting backward
    if (!forward) {
      if (subIndex > 0) {
        const timeout = setTimeout(() => {
          setSubIndex(subIndex - 1);
        }, speed / 2); // slightly faster delete
        return () => clearTimeout(timeout);
      }

      // Word fully deleted → move to next word
      if (subIndex === 0) {
        setForward(true);
        setIndex((prev) => (prev + 1) % words.length);
      }
    }

  }, [subIndex, forward, index, words, speed, delay]);

  // Return the text to display
  return words[index].substring(0, subIndex);
}
