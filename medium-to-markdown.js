const mediumToMarkdown = require('medium-to-markdown');

mediumToMarkdown.convertFromUrl('https://medium.com/@jaeungkim/remove-outermost-parentheses-695c3133b35')
.then(function (markdown) {
  console.log(markdown); //=> Markdown content of medium post
});