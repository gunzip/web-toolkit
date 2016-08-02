const fractal = module.exports = require('@frctl/fractal').create()

fractal.set('project.title', 'Italia.it Web Toolkit Styleguide')

fractal.components.set('path', __dirname + '/src')

fractal.docs.set('path', __dirname + '/docs')

fractal.web.set('static.path', __dirname + '/build')

// prefix all resources url with '/build'
fractal.web.set('static.mount', 'build')

fractal.web.set('builder.dest', __dirname + '/styleguide')

fractal.components.set('default.preview', '@preview')

fractal.components.set('default.status', 'wip')

fractal.components.engine('@frctl/nunjucks')

fractal.docs.engine('@frctl/nunjucks')
fractal.docs.set('ext', '.md')

fractal.components.set('ext', '.tmpl')
