import React from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const LazyImage: React.FC<LazyImageProps> = (props) => {
  return <img {...props} loading="lazy" />;
};

export default LazyImage;
