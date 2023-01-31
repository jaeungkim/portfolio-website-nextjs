const mediumToMarkdown = require('medium-to-markdown');

mediumToMarkdown.convertFromUrl('https://kkirtigoel01.medium.com/promises-in-javascript-js-27baf0e506b5#:~:text=Resolved%20or%20Rejected-,What%20is%20Promise%20in%20JavaScript%3F,is%20successfully%20completed%20or%20not.')
.then(function (markdown) {
  console.log(markdown); //=> Markdown content of medium post
});