module.exports = {
  use: [
    'postcss-extend',
    'postcss-color-function',
    'postcss-assets-rebase'
  ],
  'postcss-assets-rebase': {
    assetsPath: 'styleguide/assets'
  },
  postcss: {
    map: {
      inline: false
    }
  }
};
