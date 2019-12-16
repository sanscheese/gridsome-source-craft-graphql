import { setResults } from 'gridsome/app/graphql/shared'
import { setCraftPreview, cache } from './shared'
import axios from 'axios'

export default async ({ $route, $context, $page }, endpoint) => {
  if (!$context.craftQueryVariables) return
 

  if (cache.code && cache.token ||
      ($route.query['x-craft-live-preview'] || $route.query['x-craft-preview']) &&
      $route.query.token) {
    const codeKey = cache.queryKey || $route.query['x-craft-live-preview'] ? 'x-craft-live-preview' : 'x-craft-preview'
    const code = $route.query[codeKey]
    const token = cache.token || $route.query.token
    const craftQuery = $context.craftQuery
    const craftQueryVariables = $context.craftQueryVariables

    setCraftPreview({
      codeKey: codeKey,
      code: code,
      token: token
    })

    // Override for non-existent pages
    craftQueryVariables.id =  ($route.dataPath && $route.meta.dataPath.endsWith('craft_preview_id.json') && $route.query['CraftPreviewId']) ? $route.query['CraftPreviewId'] : craftQueryVariables.id

    // @TODO - Sort out the best handling for the domain
    const res = await axios.post(`${endpoint}?token=${token}&${codeKey}=${code}`, {
      query: craftQuery,
      variables: craftQueryVariables
    })

    document.body.classList.remove('craft-preview')

    const result = $page
    result.craft = res.data.data
    setResults($context.craftQueryVariables['__path'], { data: result, context: $context })
  }
}
