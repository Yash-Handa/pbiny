const request = require('request');

const validKey = require('./validKey');
const {
  choice, err, heading, errFocus, dim, cli,
} = require('../../../utils/colorStyle');

const { log } = console;

// promise wrapper around request module
function getRequest(url) {
  return new Promise(((resolve, reject) => {
    const specialError = 'Error, this is a private paste. If this is your private paste, please login to Pastebin first.';
    request(url, (error, res, body) => {
      if (error) {
        reject(error);
        return 1;
      }
      if (res.statusCode !== 200) {
        log(err(`There is no Paste available with key: ${errFocus(url.slice(25))}`));
        resolve(1);
        return 1;
      }
      if (body === specialError) {
        log(err('Error, this is a private paste. If this is your private paste and you are logged in then add'), errFocus('-p flag'), err('to the command'));
        log(dim(`A user can be Logged in at ${cli('$ pbin usr')}\n`));
        resolve(1);
        return 1;
      }

      resolve(body);
    });
  }));
}

const def = async (url, priv) => {
  // pasteKey will either be a key or false
  const pasteKey = validKey(url);

  // error msg for dirty key
  if (!pasteKey) {
    log(err('Please enter a valid URL or Key to fetch the paste'));
    log(err('The -u option takes one argument of the formate:'));
    log(err('1. "https://pastebin.com/xxxxxxx"'));
    log(err('2. "pastebin.com/xxxxxxx"'));
    log(err('3. "xxxxxxx"'));
    log(err(`where " ${errFocus('xxxxxxx')}`), err('" is an alpha-numeric key of the Paste'));
    return 1;
  }

  let data;
  if (priv) {
    // handle private auth
    const privatePaste = require('./private');
    try {
      data = await privatePaste(pasteKey);
    } catch (error) {
      throw error;
    }
  } else {
    try {
      data = await getRequest(`https://pastebin.com/raw/${pasteKey}`);
    } catch (error) {
      throw error;
    }
  }

  if (data === 1) return 1;

  log(heading('\nPaste Data:'));
  log(data, ` (${choice(data.length, 'Characters')})`);
  log('');
  return 0;
};

module.exports = def;
