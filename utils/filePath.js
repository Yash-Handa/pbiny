const homedir = require('os').homedir();
const path = require('path');

module.exports = (fileName) => {
  if (fileName[0] === '~') {
    return path.resolve(homedir, fileName.slice(2));
  }
  return path.resolve(process.cwd(), fileName);
};
