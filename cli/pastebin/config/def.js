const config = require('../../../config');
const {
  cli, url, choice, heading, dim,
} = require('../../../utils/colorStyle');

const { log } = console;

const def = () => {
  log(heading('Upload Config:'));
  log('  Paste Format / Extension (ext):', choice(config.pb.extension));
  log(dim(`  (See all valid values of Paste Formate at ${url('https://pastebin.com/api#5')} )`));
  log('  Paste Expiration (exp):', choice(config.pb.expiration));
  log(dim(`  (See all 9 valid values of Paste Expiration at ${url('https://pastebin.com/api#6')} )`));
  log(`  Paste Privacy (priv): ${choice(config.pb.private)}`);
  log(dim('  (0 Public, 1 Unlisted, 2 Private)'));
  log('');

  log(heading('Download Config:'));
  log('  Created file extension (f_ext):', choice(config.file.fileExtension));
  log('');

  log(heading('How to Edit:'));
  log('  run the', cli('$ pbin config -h'), 'command to see all flags that can be used to edit the configurations.');
  log(heading('  Example:'), cli('$ pbin config --ext --priv'), 'will allow you to change the Past Extension and Privacy.');
  log('');
};

module.exports = def;
