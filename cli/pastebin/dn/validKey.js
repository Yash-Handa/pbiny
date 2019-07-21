/* eslint-disable no-param-reassign */
const validKey = (url) => {
  if (url.length <= 0) return false;

  // check if the url ends with a '/' and remove it
  if (url[url.length - 1] === '/') url = url.slice(0, url.length - 1);

  if (url.slice(0, 21) === 'https://pastebin.com/') {
    return url.slice(21);
  }

  if (url.slice(0, 13) === 'pastebin.com/') {
    return url.slice(13);
  }

  if (url.match(/^[a-z0-9]+$/i) !== null) {
    return url;
  }

  return false;
};

module.exports = validKey;
