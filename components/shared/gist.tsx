import React from "react";
import dynamic from "next/dynamic";

interface GistProps {
  id: string;
}

const Gist: React.FC<GistProps> = ({ id }) => {
  const ReactEmbedGist: any = dynamic(() => import("react-embed-gist"), {
    ssr: false,
  });
  return <ReactEmbedGist gist={id} />;
};

export default Gist;
