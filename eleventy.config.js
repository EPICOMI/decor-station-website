export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("js");

  // Filter to make absolute URLs relative to the current page
  eleventyConfig.addFilter("relativeUrl", function(url, pageUrl) {
    if (!url) return url;
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) {
      return url;
    }
    if (!pageUrl) return url;

    // Split the pageUrl to find nesting depth
    const segments = pageUrl.split('/').filter(Boolean);
    const root = segments.length === 0 ? "./" : "../".repeat(segments.length);

    if (url.startsWith("/")) {
      return root + url.slice(1);
    }
    return url;
  });
}
