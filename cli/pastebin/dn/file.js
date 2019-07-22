const request = require('request');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const config = require('../../../config');
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

const file = async (url, filePath, priv) => {
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

  try {
    fs.statSync(filePath);
    log(err('Sorry the given file path is already occupied.'));
    log(err(`The supplied file path is ${errFocus(filePath)}`));
    return 1;
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  const basenameArray = path.basename(filePath).split('.');
  let ext = config.file.fileExtension;
  let title = '';
  if (basenameArray.length <= 1) {
    // eslint-disable-next-line prefer-destructuring
    title = basenameArray[0];
    // eslint-disable-next-line no-param-reassign
    filePath += `.${config.file.fileExtension}`;
  } else {
    ext = basenameArray[basenameArray.length - 1];
    title = basenameArray[basenameArray.length - 2];
  }
  log(heading('File Data:'));
  log('File Path:', choice(filePath));
  log('File Name:', choice(title));
  log('File extension:', choice(ext), dim(ext === config.file.fileExtension ? ' (default)' : ''));

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
  log();

  // ASK for confirmation
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'confirmation',
        message: 'Do you want to create this file?',
        default: true,
      },
    ])
    .then((ans) => {
      if (ans.confirmation) {
        // Make directory if it doesn't exist
        fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
          if (err) {
            if (err.code === 'ENOENT') {
              // eslint-disable-next-line no-param-reassign
              err.message += ' or permission denied to access it';
            }
            throw err;
          }

          // write data to the file
          fs.writeFile(filePath, data, (err) => {
            if (err) {
              throw err;
            }
            // show final confirmation
            const stats = fs.statSync(filePath);
            log(heading('\nDone !!'));
            log(choice(`${stats.size / 1000.0} KB`), 'of data has been written to the file\n');
            return 0;
          });
        });
      }
      return 1;
    });
};

module.exports = file;
