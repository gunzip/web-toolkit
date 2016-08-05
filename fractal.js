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

const faker = require('faker')
const _ = require('lodash')

const nunj = require('@frctl/nunjucks')({
  globals: {
    __TEXTS__: _.range(10).map(function(){ return faker.lorem.paragraphs() }),
    __SHORT_TEXTS__: _.range(10).map(function(){ return faker.lorem.sentence() }),
    __LONG_TEXTS__: _.range(10).map(function(){ return faker.lorem.text() }),
  },
})

fractal.components.engine(nunj)
fractal.docs.engine(nunj)

fractal.components.set('ext', '.tmpl')
fractal.docs.set('ext', '.md')
