module.exports = {
  use: [
    'postcss-extend',
    'postcss-color-function',
    'postcss-inline-svg',
    'postcss-assets',
    'postcss-url',
    'postcss-reporter'
  ],
  'postcss-url': {
    url: 'copy'
  },
  'postcss-inline-svg': {
    path: 'src/'
  },
  'postcss-assets': {
    loadPaths: [ 'src/' ],
    cachebuster: true
  },
  postcss: {
    from: 'index.css',
    to: 'build/build.css',
    map: false,
  }
};
