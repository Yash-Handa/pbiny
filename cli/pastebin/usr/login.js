const inquirer = require('inquirer');
const request = require('request');

const config = require('../../../config');
const editENV = require('../../../utils/editENV');
const {
  cli, url, choice, err, heading, dim,
} = require('../../../utils/colorStyle');

const { log } = console;

const loginUser = () => inquirer
  .prompt([
    {
      type: 'input',
      name: 'userName',
      message: 'User Name:',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Password:',
    },
  ])
  .then((user) => {
    // TODO: login user and get all of his data
    const body = `api_dev_key=${config.dev.key}&api_user_name=${user.userName}&api_user_password=${user.password}`;
    request.post({
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      url: 'https://pastebin.com/api/api_login.php',
      body,
    }, (error, response, body) => {
      if (error) {
        throw error;
      }

      if (body === 'Bad API request, invalid login') {
        log(err('The entered User Name or Password is wrong, Cannot login'));
        log();
        inquirer
          .prompt([
            {
              type: 'confirm',
              name: 'confirmation',
              message: 'Do you want to re-enter the login details?',
              default: true,
            },
          ])
          .then((ans) => {
            if (ans.confirmation) {
              return loginUser();
            }
            return 1;
          });
      } else if (body.match(/^[a-z0-9]+$/i) !== null) {
        const data = {};
        data.userKey = body;
        const requestBody = `api_dev_key=${config.dev.key}&api_user_key=${data.userKey}&api_option=userdetails`;
        request.post({
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          url: 'https://pastebin.com/api/api_post.php',
          body: requestBody,
        }, (error, response, body) => {
          if (error) {
            throw error;
          }
          const apiData = body.split('\r\n').slice(1);
          apiData.forEach((key) => {
            if (key.slice(0, 11) === '<user_name>') {
              data.userName = key.slice(11).replace('</user_name>', '');
            } else if (key.slice(0, 19) === '<user_format_short>') {
              data.extension = key.slice(19).replace('</user_format_short>', '');
            } else if (key.slice(0, 17) === '<user_expiration>') {
              data.expiration = key.slice(17).replace('</user_expiration>', '');
            } else if (key.slice(0, 14) === '<user_private>') {
              data.privacy = key.slice(14).replace('</user_private>', '');
            } else if (key.slice(0, 12) === '<user_email>') {
              data.email = key.slice(12).replace('</user_email>', '');
            } else if (key.slice(0, 19) === '<user_account_type>') {
              data.accountType = key.slice(19).replace('</user_account_type>', '');
            }
          });

          log(heading('\nHi!'), choice(data.userName), heading(', you are now logged in :)\n'));
          inquirer
            .prompt([
              {
                type: 'confirm',
                name: 'confirmation',
                message: 'Do you want to import your defaults (privacy, expiration and formate) ?',
                default: true,
              },
            ])
            .then(async (importSettings) => {
              if (importSettings.confirmation) {
                const success = await editENV(data, 'update');
                if (success === 0) {
                  log(heading('\nDefaults Updated !!!'));
                  log('You can see your defaults at', cli('$ pbiny config'), '\n');
                  return 0;
                }
              } else {
                const success = await editENV({
                  userKey: data.userKey,
                  email: data.email,
                  userName: data.userName,
                  accountType: data.accountType,
                }, 'update');
                if (success === 0) return 0;
              }
            });
        });
      } else return 1;
    });
  });

const login = () => {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'confirmation',
        message: `You are already logged in as ${choice(config.user.userName)}, Do you want to continue?`,
        default: true,
        when: config.user.key !== '',
      },
    ])
    .then((ans) => {
      if (ans.confirmation || !ans.hasOwnProperty('confirmation')) {
        log(dim('If you have created your account using Google, Facebook, etc you have to set your password to use any PasteBin tool\nhere:'), url('https://pastebin.com/password'), '\n');

        loginUser().then((result) => {
          if (result === 1) {
            return 1;
          }
        });
      }
      return 1;
    });
};

module.exports = login;
