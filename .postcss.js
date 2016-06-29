module.exports = {
  use: [
    'postcss-extend',
    'postcss-color-function',
    'postcss-url',
    'postcss-reporter'
  ],
  'postcss-url': {
    url: 'copy'
  },
  postcss: {
    from: 'index.css',
    to: 'build/build.css',
    map: {
      inline: false
    }
  }
};
