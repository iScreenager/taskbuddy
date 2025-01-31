import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 778);

  const getMobileSize = () => {
    setIsMobile(window.innerWidth <= 778);
  };

  useEffect(() => {
    getMobileSize();
    window.addEventListener("resize", getMobileSize);
    return () => {
      window.removeEventListener("resize", getMobileSize);
    };
  }, []);

  return { isMobile };
};
