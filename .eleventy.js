module.exports = function (eleventyConfig) {
  // Copy static assets straight through to the output folder
  eleventyConfig.addFilter("head", (arr, n) => arr.slice(0, n));
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");
  // Group all "character", "location", "faction" etc. pages into one
  // collection so we can build category listing pages automatically.
  eleventyConfig.addCollection("wikiPages", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/**/*.md");
  });

  // Build one collection per category tag, e.g. collections.category_character
  eleventyConfig.addCollection("categories", function (collectionApi) {
    const pages = collectionApi.getFilteredByGlob("content/**/*.md");
    const categories = {};
    pages.forEach((page) => {
      const cat = page.data.category;
      if (!cat) return;
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(page);
    });
    return categories;
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
