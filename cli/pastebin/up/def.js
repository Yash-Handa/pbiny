/* eslint-disable consistent-return */
const inquirer = require('inquirer');
const request = require('request');
const readline = require('readline');

const config = require('../../../config');
const {
  cli, url, choice, err, heading, dim,
} = require('../../../utils/colorStyle');

const { log } = console;


const finalPrompt = (completeData) => {
  log();
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
        const {
          data,
          ext,
          title,
          privacy,
          user,
          expiration,
        } = completeData;
        // Use request.js
        let body = `api_dev_key=${config.dev.key}&api_option=paste&api_paste_code=${data}`;
        body += `&api_user_key=${user}&api_paste_name=${title === 'NA' ? '' : title}&api_paste_format=${ext}&api_paste_private=${privacy}&api_paste_expire_date=${expiration}`;
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
      } else {
        return 1;
      }
    });
};

const def = () => {
  // display User Data
  log(heading('User Info:'));
  if (config.user.key === '') {
    log(`No user is logged in so ${choice('Guest User')} is used`);
    log(dim(`A user can be Logged in at ${cli('$ pbiny usr')}`));
  } else {
    log(`User Name: ${choice(config.user.userName)}`);
    log(`User Email: ${choice(config.user.email)}`);
    log(`User Account Type: ${choice(config.user.accountType == 1 ? 'PRO' : 'normal')}`);
  }

  log('');

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'userType',
        message: 'Choose how would you like to create the paste?',
        choices: [`as ${config.user.userName}`, 'as Guest User'],
        default: 0,
        when: config.user.key !== '',
      },
      {
        type: 'input',
        name: 'title',
        message: 'Paste Title:',
        default: 'NA',
      },
      {
        type: 'input',
        name: 'ext',
        message: 'Paste Format / Extension:',
        default: `${config.pb.extension}`,
        suffix: dim(`\n  ( See all valid values of Paste Formate at ${url('https://pastebin.com/api#5')} )`),
      },
      {
        type: 'list',
        name: 'expiration',
        message: 'Paste Expiration:',
        choices: ['N: Never', '10M: 10 Minutes', '1H: 1 Hour', '1D: 1 Day', '1W: 1 Week', '2W: 2 Weeks', '1M: 1 Month', '6M: 6 Months', '1Y: 1 Year'],
        default: 0,
        pageSize: 9,
      },
      {
        type: 'list',
        name: 'private',
        message: 'Paste Privacy:',
        choices: ['0: Public', '1: Unlisted'],
        default: 0,
        when: config.user.key === '',
      },
      {
        type: 'list',
        name: 'private',
        message: 'Paste Privacy:',
        choices: ['0: Public', '1: Unlisted', '2: Private'],
        default: 0,
        when: config.user.key !== '',
      },
      {
        type: 'editor',
        name: 'editorData',
        message: 'Use editor to enter data:',
      },
    ])
    .then((ans) => {
      // Use UTF-8 on textData
      let data = JSON.parse(JSON.stringify(ans.editorData));
      const ext = ans.ext.toLowerCase();
      const { title } = ans;
      const privacy = ans.private.split(':')[0];
      const expiration = ans.expiration.split(':')[0];
      let user = '';
      if (ans.userType) {
        if (ans.userType !== 'as Guest User' && config.user.key !== '') {
          user = config.user.key;
        } else {
          user = '';
        }
      }
      log('');
      if (data.length > 0) {
        log(heading('Paste Data:'));
        log(data, ` (${choice(data.length, 'Characters')})\n`);
        // send data to the function
        finalPrompt({
          data,
          ext,
          title,
          privacy,
          user,
          expiration,
        });
      } else {
        log(err('We didn\'t received any data from the editor'));
        inquirer
          .prompt([{
            type: 'confirm',
            name: 'confirmText',
            message: 'Do you want to enter data from cli (multi-line)',
            default: true,
            suffix: dim('\n  (press ENTER CTRL+d to exit multi-line cli editor)'),
          }])
          .then((cliOpt) => {
            if (cliOpt.confirmText) {
              const input = [];
              const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
              });

              rl.prompt();

              rl.on('line', (cmd) => {
                input.push(cmd);
              });

              // eslint-disable-next-line no-unused-vars
              rl.on('close', (cmd) => {
                data = JSON.parse(JSON.stringify(input.join('\n')));
                // process.exit(0);
                if (data.length <= 0) {
                  log(err('There is still no data to paste. So, the request is ABORTED !!!'));
                  return 1;
                }
                log(heading('\nPaste Data:'));
                log(data, ` (${choice(data.length, 'Characters')})\n`);
                // send data to the function
                finalPrompt({
                  data,
                  ext,
                  title,
                  privacy,
                  user,
                  expiration,
                });
              });
            } else {
              log(err('There is still no data to paste. So, the request is ABORTED !!!'));
              return 1;
            }
          });
      }
    });
};

module.exports = def;
