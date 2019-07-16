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
    key: process.env.api_dev || '',
  },
};
