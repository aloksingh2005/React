import React, { useEffect, useState } from "react";

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    isVisible && (
      <div className="loader-wrapper" style={{ opacity: isVisible ? 1 : 0 }}>
        <div className="loader"></div>
      </div>
    )
  );
};

export default Loader;