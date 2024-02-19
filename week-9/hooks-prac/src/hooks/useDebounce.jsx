import { useEffect, useState } from "react";

export function useDebounce(inputValue, delay) {
  const [debounceValue, setDebounceValue] = useState(inputValue);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setDebounceValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue, delay]);
  return debounceValue;
}
