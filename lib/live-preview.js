// const { parse, print } = require('gridsome/graphql')

module.exports = (api, options) => {
  api._app.pages.hooks.pageContext.tap('CraftLivePreview', (data, { pageQuery, queryVariables }) => {
    if (!pageQuery) return

    // @TODO - use document instead
    // const document = parse(pageQuery)
    // // modify the document

    const fieldRegex = new RegExp(`{ ${options.fieldName} {`, 'gi')
    const typeRegex = new RegExp(`on ${options.typeName}_`, 'gi')
    const variableRegex = new RegExp(`\\[${options.typeName}_`, 'gi')

    const craftQuery = pageQuery
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace(/ {1,}/g, ' ') // use single spaces
      .replace(fieldRegex, '{')
      .slice(0, -1) // remove trailing "}"
      .replace(typeRegex, 'on ') // remove type prefix "on craft_"
      .replace(variableRegex, '\[')

    data.craftQuery = craftQuery // print(document)

    // May not need these
    data.craftQueryVariables = queryVariables
  })
}
