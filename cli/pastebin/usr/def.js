const config = require('../../../config');
const {
  cli, choice, err, heading, dim,
} = require('../../../utils/colorStyle');

const { log } = console;

const def = () => {
  if (config.user.key === '') {
    log(err('No user is logged in'));
    log(dim('You can Login an user at'), cli('$ pbiny usr -l'), '\n');
    return 1;
  }

  log(heading(`Hi ${config.user.userName} !`));
  log(`User Name: ${choice(config.user.userName)}`);
  log(`User Email: ${choice(config.user.email)}`);
  log(`User Account Type: ${choice(config.user.accountType == 1 ? 'PRO' : 'normal')}\n`);
};

module.exports = def;
