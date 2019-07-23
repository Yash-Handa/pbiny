const request = require('request');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const config = require('../../../config');
const {
  cli, url, choice, err, errFocus, heading, dim,
} = require('../../../utils/colorStyle');

const { log } = console;

// eslint-disable-next-line consistent-return
const file = (filePath, extension, name, userStatus) => {
  let stats = '';

  // check if the path exist
  try {
    stats = fs.statSync(filePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      log(err('Sorry the given value is not a valid path'));
      log(err(`The supplied file path is ${errFocus(filePath)}`));
      return 1;
    }
    throw error;
  }

  // check if the path points to a regular file
  if (!stats.isFile()) {
    log(err('Sorry the given value is not a valid file name'));
    log(err(`The supplied file path is ${errFocus(filePath)}`));
    return 1;
  }

  const size = stats.size / 1000.0;
  // check if the file is more than 512 KB and yhe user is not PRO
  if (size > 512.0 && config.user.accountType != 1) {
    log(err('Sorry the file is too big for uploading'));
    log(err(`The max size is ${errFocus('512 KB(0.5 MB)')}${err(' and the given file is of ')}${errFocus(`${size} KB`)}`));
    log(err(`You can read more at: ${url('https://pastebin.com/faq#9')}`));
    return 1;
  }

  const ext = extension || config.pb.extension;
  const title = name === 'NA' ? undefined : name || path.basename(filePath);

  fs.readFile(filePath, { encoding: 'utf-8' }, (e, data) => {
    if (!e) {
      log(heading('Stats:'));
      log(`File path: ${choice(filePath)}`);
      log(`File size: ${choice(`${size} KB`)}`);
      log(`File extension/format: ${choice(ext)}`);
      log(`Number of lines: ${choice(data.split('\n').length)} (${choice(`${data.length} Characters`)})\n`);

      log(heading('User Info:'));
      if (config.user.key === '' || userStatus) {
        log(`No user is logged in so ${choice('Guest User')} is used`);
        log(dim(`A user can be Logged in at ${cli('$ pbiny usr')}`));
      } else {
        log(`User Name: ${choice(config.user.userName)}`);
        log(`User Email: ${choice(config.user.email)}`);
        log(`User Account Type: ${choice(config.user.accountType == 1 ? 'PRO' : 'normal')}`);
      }

      log(heading('\nPasteBin Config:'));
      log(dim(`The config can be changed at ${cli('$ pbiny config')}`));
      log(`Paste Title: ${choice(title)}`);
      log(`Paste Format: ${choice(ext)}`);
      log(dim(`(See all valid values of Paste Formate at ${url('https://pastebin.com/api#5')} )`));
      log(`Paste Expiration: ${choice(config.pb.expiration)}`);
      log(dim(`(See all 9 valid values of Paste Expiration at ${url('https://pastebin.com/api#6')} )`));
      log(`Paste Privacy: ${choice(config.pb.private)}`);
      log(dim('(0 Public, 1 Unlisted, 2 Private)'));
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
            body += `&api_user_key=${userStatus ? '' : config.user.key}&api_paste_name=${title === undefined ? '' : title}&api_paste_format=${ext}&api_paste_private=${config.pb.private}&api_paste_expire_date=${config.pb.expiration}`;
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
    } else {
      log(e);
    }
  });
};


module.exports = file;
