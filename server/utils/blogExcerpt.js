const htmlToText = require("html-to-text");

exports.blogExcerpt = (str, length, delimiter, appendix) => {
  const strFormatted = htmlToText.fromString(str, {
    ignoreHref : true,
    preserveNewlines: true,
    uppercaseHeadings: false,
    singleNewLineParagraphs: true,
  });

  if (strFormatted.length <= length) {
    return str;
  }

  let trimmedStr = strFormatted.substr(0, length + delimiter.length);

  /*  let lengthNeeded = length;
  while (htmlToText.fromString(trimmedStr) < length) {
    lengthNeeded = lengthNeeded + 50;
    trimmedStr = str.substr(0, lengthNeeded + delimiter.length);
  } */

  let lastDelimIndex = trimmedStr.lastIndexOf(delimiter);
  if (lastDelimIndex >= 0) {
    trimmedStr = trimmedStr.substr(0, lastDelimIndex);
  }

  if (trimmedStr) {
    trimmedStr += appendix;
  }
  return trimmedStr;
};
