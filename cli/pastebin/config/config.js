const inquirer = require('inquirer');
const config = require('../../../config');
const editENV = require('../../../utils/editENV');
const {
  url, dim, heading,
} = require('../../../utils/colorStyle');

const { log } = console;

const changeConfig = (extension, expiration, privacy, fileExtension) => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'ext',
        message: 'Default Paste Format / Extension (ext):',
        default: `${config.pb.extension}`,
        suffix: dim(`\n  ( See all valid values of Paste Formate at ${url('https://pastebin.com/api#5')} )`),
        when: extension === true,
      },
      {
        type: 'list',
        name: 'expiration',
        message: 'Default Paste Expiration (exp):',
        choices: ['N: Never', '10M: 10 Minutes', '1H: 1 Hour', '1D: 1 Day', '1W: 1 Week', '2W: 2 Weeks', '1M: 1 Month', '6M: 6 Months', '1Y: 1 Year'],
        default: 0,
        pageSize: 9,
        when: expiration === true,
      },
      {
        type: 'list',
        name: 'privacy',
        message: 'Default Paste Privacy (priv):',
        choices: ['0: Public', '1: Unlisted'],
        default: 0,
        when: privacy === true && config.user.key === '',
      },
      {
        type: 'list',
        name: 'privacy',
        message: 'Default Paste Privacy (priv):',
        choices: ['0: Public', '1: Unlisted', '2: Private'],
        default: 0,
        when: privacy === true && config.user.key !== '',
      },
      {
        type: 'input',
        name: 'fileExt',
        message: 'Default file extension for created file with paste data (f_ext):',
        default: `${config.file.fileExtension}`,
        when: fileExtension === true,
      },
      {
        type: 'confirm',
        name: 'confirmation',
        message: 'Do you want to save these defaults?',
        default: true,
      },
    ])
    .then(async (ans) => {
      if (ans.confirmation) {
        const data = {};
        if (extension) data.extension = ans.ext.toLowerCase();
        if (expiration) [data.expiration] = ans.expiration.split(':');
        if (privacy) [data.privacy] = ans.privacy.split(':');
        if (fileExtension) data.fileExtension = ans.fileExt;

        const success = await editENV(data, 'update');
        if (success === 0) {
          log(heading('\nDefaults Updated !!!\n'));
          return 0;
        }
        return 1;
      }
      return 1;
    });
};

module.exports = changeConfig;
