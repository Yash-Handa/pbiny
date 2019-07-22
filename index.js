// load the .env file to the config file
require('./config');
// ./cli/yargs returns the configured yargs object and not the argv
const yargs = require('./cli/yargs');

const { argv } = yargs;

// TODO: Add msg when about the product
