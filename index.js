#! /usr/bin/env node
// load the .env file to the config file
require('./config');
// ./cli/yargs returns the configured yargs object and not the argv
const yargs = require('./cli/yargs');

// eslint-disable-next-line no-unused-vars
const { argv } = yargs;

// TODO: Add msg when about the product
