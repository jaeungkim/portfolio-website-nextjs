/** Every `url` a post hands to `<BlurImage>`, in source order, duplicates kept. */
export function extractImageUrls(content: string): string[] {
  const urls: string[] = [];
  // Attribute order is the author's choice, so find `url` anywhere in the tag.
  const blurImageRegex = /<BlurImage\b[^>]*?\burl=["']([^"']+)["']/g;
  let match;

  while ((match = blurImageRegex.exec(content)) !== null) {
    urls.push(match[1]);
  }

  return urls;
}
