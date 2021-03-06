const fs = require('fs');
const path = require('path');

// eslint-disable-next-line no-unused-vars
const edit = (values, command) => new Promise((resolve, reject) => {
  const envPath = path.join(path.dirname(__dirname), '.env');
  fs.readFile(envPath, 'utf-8', (err, data) => {
    if (err) throw err;

    const lines = data.split('\n');

    if (command === 'update') {
      lines.forEach((line, i) => {
        const key = line.split('=')[0];
        if (values[key]) {
          lines[i] = `${key}=${values[key]}`;
          // eslint-disable-next-line no-param-reassign
          delete values[key];
        }
      });

      // eslint-disable-next-line no-restricted-syntax
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          lines.push(`${key}=${values[key]}`);
        }
      }
    } else {
      lines.forEach((line, i) => {
        const key = line.split('=')[0];
        if (values[key]) {
          lines.splice(i);
        }
      });
    }

    fs.writeFile(envPath, lines.join('\n'), 'utf-8', (err) => {
      if (err) throw err;
      resolve(0);
    });
  });
});
module.exports = edit;
