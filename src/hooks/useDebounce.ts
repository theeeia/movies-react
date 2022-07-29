import { useEffect, useState } from "react";

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const debounceTimeoutHandler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(debounceTimeoutHandler);
    };
  }, [value, delay]);

  return debouncedValue;
}
export default useDebounce;
