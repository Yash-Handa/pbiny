#! /usr/bin/env node
// load the .env file to the config file
require('./config');
// ./cli/yargs returns the configured yargs object and not the argv
const yargs = require('./cli/yargs');
const {
  cli, url, choice, heading,
} = require('./utils/colorStyle');

const { log } = console;

const { argv } = yargs;

const commands = ['up', 'upload', 'dn', 'download', 'configuration', 'config', 'usr', 'user'];

if (!(commands.includes(argv._[0]))) {
  log('Welcome to', choice('pbiny'));
  log('pbiny is a command line tool to interact with pastebin.com for creating and fetching pastes\n');
  log('Type the', cli('$ pbiny -h'), 'to see a list of all the available commands and options with their user. Each command also has its own -h option for further exploration\n');
  log(heading('GitHub:'), url('https://github.com/Yash-Handa/pbiny'));
  log(heading('npm:'), url('https://www.npmjs.com/package/pbiny\n'));
}
