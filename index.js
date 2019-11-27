const GraphQLSource = require('@gridsome/source-graphql')
const templatesRoutes = require('./lib/templates-routes')
const livePreview = require('./lib/live-preview')

module.exports = (api, options) => {
  options.fieldName = options.fieldName || 'craft'
  options.typeName = options.typeName || 'craft'
  options.livePreview = options.livePreview || false

  new GraphQLSource(api, options)
  
  templatesRoutes(api, options)
  
  if (options.livePreview) livePreview(api, options)

}
