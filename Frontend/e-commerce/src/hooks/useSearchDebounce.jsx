import { useState, useEffect } from "react";

export default function useSearchDebounce(searchTerm, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(searchTerm);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm, delay]);

  return debouncedValue;
}