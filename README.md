# Craft CMS (GraphQL) source for Gridsome

> This package is under development. The API might change before v1 is released.

A detailed write up

## Gridsome

### Install

Yarn: `yarn add @bhws/gridsome-source-craft-graphql`
Or, NPM: `npm install  @bhws/gridsome-source-craft-graphql`

### Usage

Add `[CraftPreviewId].vue` to your projects `.gitignore` file. These files are for live preview and should be added to your repo.

#### Source plugin

```js
module.exports = {
  plugins: [
    {
      use: '@bhws/gridsome-source-craft-graphql',
      options: {
        url: 'https://example.com/api',
        fieldName: 'craft',
        typeName: 'craft',
        livePreview: true,
      }
    }
  ]
}
```

##### Options

- **url** - *String* required
  The URL of a GraphQL API endpoint to request your schema from.

- **fieldName** - *String*
  *Default: 'craft'*
  The URL of a GraphQL API endpoint to request your schema from.

- **typeName** - *String*
  *Default: 'craft'*
  The prefix to be used for your imported schema's field types.

- **headers** - *Object*
  An object of headers to be passed along with your request to the API endpoint. This will generally be used to authenticate your request.

- **livePreview** - *Boolean*
  *Default: true*
  Allows switching disabling live preview and query being added on frontend (useful for an environment variable to disable it on production)


#### Enable Live Preview

Add the `CraftLivePreview` component to you build.

[Override `App.vue`](https://gridsome.org/docs/overriding-app/)

```html
<template>
  <CraftLivePreview endpoint="https://example.com/api" />
</template>

<script>
import CraftLivePreview from '@bhws/gridsome-source-craft-graphql/CraftLivePreview'

export default {
  components: {
    CraftLivePreview
  }
}
</script>
```



## Craft CMS setup

1. Setup the [GraphQL API on Craft](https://docs.craftcms.com/v3/graphql.html#getting-started)

2. Setup the [preview targets](https://docs.craftcms.com/v3/sections-and-entries.html#sections)

3. Ensure your preview targets also have `?CraftPreviewId={id}` at the end.