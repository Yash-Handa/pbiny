const path = require('path');
const env = require('dotenv').config({ path: path.join(__dirname, '.env') });

if (env.error) {
  throw env.error;
}

module.exports = {
  dev: {
    key: process.env.api_dev_key,
  },
  user: {
    key: process.env.user_key || '',
    UserName: process.env.user_key || '',
    email: process.env.user_key || '',
    accountType: process.env.user_key || '', // 0 normal, 1 PRO
  },
  pb: {
    extension: process.env.user_key || 'text',
    expiration: process.env.user_key || 'N',
    private: process.env.user_key || 0, // 0 Public, 1 Unlisted, 2 Private
  },
};
