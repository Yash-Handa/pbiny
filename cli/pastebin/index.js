module.exports = {
  up: {
    file: require('./up/file'),
    text: require('./up/text'),
    def: require('./up/def'),
  },
  dn: {
    file: require('./dn/file'),
    def: require('./dn/def'),
  },
  config: {
    config: require('./config/config'),
    def: require('./config/def'),
  },
};
