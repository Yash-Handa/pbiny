const chalk = require('chalk');

module.exports = {
  cli: chalk.reset.bold.black.bgWhite,
  url: chalk.reset.underline,
  choice: chalk.reset.bold.cyan,
  err: chalk.reset.red.bold,
  errFocus: chalk.reset.bold.bgRed.white,
  heading: chalk.reset.blue.bold,
  dim: chalk.reset.dim,
};
