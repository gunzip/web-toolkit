module.exports = {
  use: [
    'postcss-extend',
    'postcss-color-function',
    'postcss-assets',
    'postcss-url',
    'postcss-reporter'
  ],
  'postcss-url': {
    url: 'copy'
  },
  'postcss-assets': {
    loadPaths: [ 'src/' ],
    cachebuster: true
  },
  postcss: {
    from: 'index.css',
    to: 'build/build.css',
    map: {
      inline: false
    }
  }
};
