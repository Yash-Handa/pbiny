const inquirer = require('inquirer');
const editENV = require('../../../utils/editENV');
const config = require('../../../config');
const {
  choice, heading,
} = require('../../../utils/colorStyle');

const { log } = console;

const logout = () => {
  if (config.user.key === '') {
    log('No user was logged in :)\n');
    return 1;
  }

  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'confirmation',
        message: `Are you sure you want to Logout from ${choice(config.user.userName)} ?`,
        default: true,
      },
    ])
    .then(async (ans) => {
      if (ans.confirmation) {
        const success = await editENV({
          userName: true,
          accountType: true,
          email: true,
          userKey: true,
        }, 'remove');

        if (success === 0) {
          log(heading('\nYour account has been successfully Logged Out\n'));
          return 0;
        }
        return 1;
      }
      return 1;
    });
};

module.exports = logout;
