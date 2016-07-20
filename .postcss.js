module.exports = {
  use: [
    'postcss-devtools',

    'postcss-easy-import',
    'postcss-custom-properties',
    'postcss-custom-media',

    'postcss-each',
    'postcss-nesting',

    'postcss-extend',
    'postcss-color-function',
    'postcss-inline-svg',
    'postcss-assets',
    'postcss-url',
    'postcss-calc',
    'autoprefixer',
    'postcss-flexbugs-fixes',
    'postcss-reporter'
  ],
  'autoprefixer': {
    browsers: ['last 10 versions', 'ie 8', 'ie 9']
  },
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
