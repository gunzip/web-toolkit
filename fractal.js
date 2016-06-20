'use strict';

const fractal = require('@frctl/fractal');

fractal.set('project.title', 'Ita Web Toolkit Styleguide');

fractal.set('components.path', 'src');

fractal.set('docs.path', 'docs');

fractal.set('plugins.web.static.path', 'styleguide');

fractal.set('components.default.preview', '@preview');

fractal.set('components.default.status', 'wip');

/* templates */
fractal.engine('nunjucks', '@frctl/nunjucks-adapter', {
  loadHelpers: true
});
fractal.set('components.engine', 'nunjucks');
fractal.set('components.ext', '.tmpl');
