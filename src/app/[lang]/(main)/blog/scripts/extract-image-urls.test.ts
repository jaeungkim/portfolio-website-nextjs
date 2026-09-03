import assert from "node:assert/strict";
import { test } from "node:test";
import { extractImageUrls } from "@/src/app/[lang]/(main)/blog/scripts/extract-image-urls";

test("reads url when it is the first attribute", () => {
  const mdx = `
<BlurImage
  url="https://images.example.com/a - 1.jpeg"
  alt="a-1"
  priority
/>
<BlurImage url='https://images.example.com/a%20-%202.jpeg' alt="a-2" />
`;

  assert.deepEqual(extractImageUrls(mdx), [
    "https://images.example.com/a - 1.jpeg",
    "https://images.example.com/a%20-%202.jpeg",
  ]);
});

test("reads url when another attribute comes first", () => {
  // The shape every post's hero image is written in.
  const mdx = `
<BlurImage priority={true}
  url="https://images.example.com/hero.jpeg"
  alt="hero"
/>
<BlurImage alt="second" url="https://images.example.com/second.jpeg" />
`;

  assert.deepEqual(extractImageUrls(mdx), [
    "https://images.example.com/hero.jpeg",
    "https://images.example.com/second.jpeg",
  ]);
});

test("ignores everything that is not a BlurImage tag", () => {
  const mdx = `
![markdown image](https://images.example.com/markdown.jpeg)
<img src="https://images.example.com/plain.jpeg" />
<BlurImageGrid url="https://images.example.com/other-component.jpeg" />
`;

  assert.deepEqual(extractImageUrls(mdx), []);
});
