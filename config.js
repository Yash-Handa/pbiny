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
    key: process.env.userKey || '',
    userName: process.env.userName || '',
    email: process.env.email || '',
    accountType: process.env.accountType || '', // 0 normal, 1 PRO
  },
  pb: {
    extension: process.env.extension || 'text',
    expiration: process.env.expiration || 'N',
    private: process.env.privacy || 0, // 0 Public, 1 Unlisted, 2 Private
  },
  file: {
    fileExtension: process.env.fileExtension || 'txt',
  },
};
