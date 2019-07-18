const inquirer = require('inquirer');
const request = require('request');

const config = require('../../../config');
const {
  cli, url, choice, err, heading, dim,
} = require('../../../utils/colorStyle');

const { log } = console;

const text = (textData, extension, name, userStatus) => {
  // Use UTF-8 on textData
  const data = JSON.parse(JSON.stringify(textData));
  const ext = extension || config.pb.extension;
  const title = name === 'NA' ? undefined : name;

  // display User Data
  log(heading('User Info:'));
  if (config.user.key === '' || userStatus) {
    log(`No user is logged in so ${choice('Guest User')} is used`);
    log(dim(`A user can be Logged in at ${cli('$ pbin usr')}`));
  } else {
    log(`User Name: ${choice(config.user.UserName)}`);
    log(`User Email: ${choice(config.user.email)}`);
    log(`User Account Type: ${choice(config.user.accountType === 1 ? 'PRO' : 'normal')}`);
  }

  // display PasteBin Data
  log(heading('\nPasteBin Config:'));
  log(dim(`The config can be changed at ${cli('$ pbin config')}`));
  log(`Paste Title: ${choice(title)}`);
  log(`Paste Format: ${choice(ext)}`);
  log(dim(`(See all valid values of Paste Formate at ${url('https://pastebin.com/api#5')} )`));
  log(`Paste Expiration: ${choice(config.pb.expiration)}`);
  log(dim(`(See all 9 valid values of Paste Expiration at ${url('https://pastebin.com/api#6')} )`));
  log(`Paste Privacy: ${choice(config.pb.private)}`);
  log(dim('(0 Public, 1 Unlisted, 2 Private)'));
  log(heading('\nPaste Data:'));
  log(data, ` (${choice(data.length, 'Characters')})`);
  log('\n');

  // Asking for confirmation using inquirer
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'confirmation',
        message: 'Do you want to create this paste at Pastebin.com?',
        default: true,
      },
    ])
    .then((ans) => {
      if (ans.confirmation) {
        // Use request.js
        let body = `api_dev_key=${config.dev.key}&api_option=paste&api_paste_code=${data}`;
        body += `&api_user_key=${userStatus ? '' : config.user.key}&api_paste_name=${title}&api_paste_format=${ext}&api_paste_private=${config.pb.private}&api_paste_expire_date=${config.pb.expiration}`;
        request.post({
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          url: 'https://pastebin.com/api/api_post.php',
          body,
        }, (error, response, body) => {
          log('\n');
          if (error) {
            log(error);
            return 1;
          }
          if (body.slice(0, 21) === 'https://pastebin.com/') {
            log(heading('Your Content has been uploaded to Pastebin SUCCESSFULLY !!!'));
            log(dim(`Your Paste is at: ${url(body)}\n`));
            return 0;
          }
          log(err('Sorry, something went wrong:'));
          log(`${err(body)}\n`);
          return 1;
        });
      }

      return 1;
    });
};

module.exports = text;
