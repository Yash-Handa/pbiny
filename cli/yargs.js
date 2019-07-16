const yargs = require('yargs');
const { version } = require('../package');
const filePath = require('../utils/filePath');

yargs
  // up command
  .command(
    ['up', 'upload'],
    'Upload Content <file|text> to Pastebin.com',
    yargs => yargs.options({
      f: {
        alias: 'file',
        describe: 'relative path to the file who\'s content is to be uploaded to Pastebin.com',
        type: 'string',
        normalize: true,
        requiresArg: true,
        nargs: 1,
      },
      t: {
        alias: 'text',
        describe: 'Text to be uploaded to Pastebin.com with default settings. (check $ pbin def)',
        type: 'string',
        requiresArg: true,
        nargs: 1,
      },
    }),
    (argv) => {
      if (argv.f) {
        // eslint-disable-next-line no-param-reassign
        argv.f = filePath(argv.f);
      }
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
