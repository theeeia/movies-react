import { RefObject, useEffect } from "react";

/**
 * Hook for listening to and handling click events outside of the specified elements.
 * Used for example for closing dropdown menu if the user clicks somewhere outside of it.
 * @param ref A reference to the HTML Element that acts as the border where if clicked outside of it
 * the callback function will be triggered.
 * @param callback Callback function to be triggered if the user clicked somewhere outside of the
 * specified HTML Element.
 */
export default function useOnClickOutside(ref: RefObject<HTMLElement>, callback: Function): void {
  useEffect(() => {
    const listener = (e: any) => {
      if (!ref.current || ref.current.contains(e.target)) return;

      callback();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Clean up
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  });
}
