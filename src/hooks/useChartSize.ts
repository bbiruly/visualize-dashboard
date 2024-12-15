import { useState, useEffect } from "react";

export const useChartSize = () => {
  const [chartSize, setChartSize] = useState({
    width: 500,
    height: 400,
  });

  useEffect(() => {
    const updateChartSize = () => {
      const width = window.innerWidth < 768 ? window.innerWidth - 70 : 500;
      const height = window.innerWidth < 768 ? 200 : 400;
      setChartSize({ width, height });
    };

    // Initial setup
    updateChartSize();

    // Add event listener for resize
    const handleResize = () => updateChartSize();
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []); 

  return chartSize;
};
