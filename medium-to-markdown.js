const mediumToMarkdown = require('medium-to-markdown');

mediumToMarkdown.convertFromUrl('https://jaeungkim.medium.com/javascript-basics-4307d8a1650a')
.then(function (markdown) {
  console.log(markdown); //=> Markdown content of medium post
});