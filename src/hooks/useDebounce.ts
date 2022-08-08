import { useEffect, useState } from "react";

/**
 * Hook for delaying the return of a input for a specified time
 * Used for example for returning the input after 1 second and reduce the number of function calls
 * that would trigger on every keystroke to one
 * @param value The value to be returned after the timer
 * @param delay Delay value for the timer in miliseconds
 */

function useDebounce(value: string | null, delay: number) {
  const [debouncedValue, setDebounceValue] = useState<string | null>(value);

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
