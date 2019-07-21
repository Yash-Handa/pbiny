const request = require('request');
const config = require('../../../config');
const {
  err, cli, dim,
} = require('../../../utils/colorStyle');

const { log } = console;

function getPrivate(key) {
  return new Promise(((resolve, reject) => {
    if (config.user.key === '') {
      log(err('No user is logged in so the private Paste cannot be fetched'));
      log(dim(`A user can be Logged in at ${cli('$ pbin usr')}\n`));
      resolve(1);
      return 1;
    }

    const body = `api_dev_key=${config.dev.key}&api_option=show_paste&api_user_key=${config.user.key}&api_paste_key=${key}`;
    request.post({
      url: 'https://pastebin.com/api/api_raw.php',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    }, (error, res, body) => {
      if (error) {
        reject(error);
        return 1;
      }
      if (body.slice(0, 17) === 'Bad API request, ') {
        log(err('Sorry, something went wrong:'));
        log(`${err(body)}\n`);
        resolve(1);
        return 1;
      }
      resolve(body);
    });
  }));
}


module.exports = getPrivate;
