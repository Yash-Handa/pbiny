const yargs = require('yargs');
const { version } = require('../package');
const filePath = require('../utils/filePath');
const { up, dn } = require('./pastebin');

yargs
  // up command
  .command(
    ['up', 'upload'],
    'Upload Content <file|text> to https://pastebin.com',
    yargs => yargs.options({
      f: {
        alias: 'file',
        describe: 'relative path to the file who\'s content is to be uploaded to https://pastebin.com',
        type: 'string',
        normalize: true,
        requiresArg: true,
        nargs: 1,
        conflicts: ['t', 'text'],
        group: 'Data:',
      },
      t: {
        alias: 'text',
        describe: 'Text to be uploaded to https://pastebin.com with default settings. (check $ pbin config)',
        type: 'string',
        requiresArg: true,
        nargs: 1,
        conflicts: ['f', 'file'],
        group: 'Data:',
      },
      e: {
        alias: ['ext', 'extension'],
        describe: 'The Extension / Format for the snippet. The complete list of available Extensions is at: https://pastebin.com/api#5 ',
        type: 'string',
        requiresArg: true,
        nargs: 1,
        group: 'Config: (used with both -f and -t)',
      },
      n: {
        alias: ['name'],
        describe: 'The name/title of the paste. Pass -n "NA" for not providing any name/title',
        type: 'string',
        requiresArg: true,
        nargs: 1,
        group: 'Config: (used with both -f and -t)',
      },
      g: {
        alias: ['guest'],
        describe: 'Pass this flag if you are logged in but still want to use Guest User account',
        type: 'boolean',
        requiresArg: false,
        nargs: 0,
        default: false,
        group: 'Config: (used with both -f and -t)',
      },
    }),
    (argv) => {
      if (argv.f) {
        return up.file(filePath(argv.f), argv.e, argv.n, argv.g);
      }
      if (argv.t) {
        return up.text(argv.t, argv.e, argv.n, argv.g);
      }
      return up.def();
    },
  )
  .command(
    ['dn', 'down', 'download'],
    'Download Content <file|text> to https://pastebin.com',
    yargs => yargs.options({
      f: {
        alias: 'file',
        describe: 'relative path to the file where the content is to be downloaded (with extension)',
        type: 'string',
        normalize: true,
        requiresArg: true,
        nargs: 1,
      },
      u: {
        alias: ['url'],
        describe: 'url of the paste. Acceptable types: \'https://pastebin.com/xxxxxxx\', \'pastebin.com/xxxxxxx\' or \'xxxxxxx\' where \'xxxxxxx\' is the key of the paste',
        type: 'string',
        requiresArg: true,
        nargs: 1,
        demandOption: true,
        group: 'Main / Required Option:',
      },
      p: {
        alias: ['private'],
        describe: 'Pass this flag if you want to download your private pastes (user should be logged in because Guest user cannot have private pastes)',
        type: 'boolean',
        requiresArg: false,
        nargs: 0,
        default: false,
      },
    }),
    (argv) => {
      if (argv.f) {
        return dn.file(argv.u, filePath(argv.f), argv.p);
      }
      return dn.def(argv.u, argv.p);
    },
  )
  .help()

  // version
  .alias('v', 'version')
  .version(version)
  .describe('v', 'show version information')

  // help text
  .alias('h', 'help')
  .help('help')
  .usage('Usage: pbin -x [num]')
  .showHelpOnFail(false, 'Specify --help for available options');

module.exports = yargs;
