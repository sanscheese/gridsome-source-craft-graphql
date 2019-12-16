const { existsSync } = require('fs')

module.exports = (api, options) => {
  const fieldName = options.fieldName

  api.createManagedPages(async ({ graphql, createPage }) => {
    // Query our local GraphQL schema to get all sections
    const { data: sectionsQuery } = await graphql(`
      query {
        ${fieldName} {
          entries {
            typeHandle
            sectionHandle
          }
        }
      }
    `)

    // Get array of sectionHandles & typeHandles
    const entries = sectionsQuery.craft.entries

    // Remove duplicates
    const sectionsAndTypes = entries.filter(
      (item, index) => entries
        .findIndex(obj => obj.sectionHandle === item.sectionHandle && obj.typeHandle === item.typeHandle) === index)

    // Loop over each section and type
    await Promise.all(
      sectionsAndTypes.map(async ({ sectionHandle, typeHandle }) => {
        const templatePath = `./src/templates/${sectionHandle}/${typeHandle}.vue`
        const templateExists = existsSync(templatePath)

        // Skip if there's no template
        if (!templateExists) return false

        // Query our local GraphQL schema for this section's entries
        const { data: entriesQuery } = await graphql(`
          query {
            ${fieldName} {
              entries (section: "${sectionHandle}") {
                slug
                id
                uri
              }
            }
          }
        `)
        // Skip if section doesn't have entries
        if (!entriesQuery || !entriesQuery.craft) return false

        // Loop through each entry in this section, and register it as a page (route)
        entriesQuery.craft.entries.forEach(entry => {
          const path = entry.uri
            ? `/${entry.uri}`
            : `/${sectionHandle}/${entry.slug}`
          createPage({
            path,
            component: templatePath,

            // Provide variables about this entry which can be used in the entry's tempate, and <page-query>
            context: {
              id: entry.id,
              slug: entry.slug,
              section: {
                // id: section.id,
                handle: sectionHandle
              }
            }
          })
        })
      })
    )
  })
}
