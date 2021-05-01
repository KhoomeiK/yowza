const path = require('path');

module.exports = {
  webpack: (config) => {
    /* eslint-disable-next-line */
    config.resolve.alias['@src'] = path.resolve(__dirname);
    return config;
  },
};
