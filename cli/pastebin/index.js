/* eslint-disable global-require */

const def = () => {
  // do something
};

module.exports = {
  file: require('./up/file'),
  text: require('./up/text'),
  def,
};
