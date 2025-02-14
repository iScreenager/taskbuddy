import { useEffect, useState } from "react";

export const useIsMobile = (): { isMobile: boolean } => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 778);

  const getMobileSize = (): void => {
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
