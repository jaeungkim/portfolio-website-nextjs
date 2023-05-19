// components/shared/mdxComponents.ts
import Gist from "./gist";
import LazyImage from "./lazyImage";

const mdxComponents = {
  Gist,
  img: (props) => <LazyImage {...props} />,
};

export default mdxComponents;
