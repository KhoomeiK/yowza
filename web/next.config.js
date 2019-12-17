const path = require('path');

module.exports = {
  webpack: (config) => {
    /* eslint-disable-next-line */
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};
