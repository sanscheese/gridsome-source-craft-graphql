import Vue from 'vue'

export const cache = Vue.observable({
  craftPreview: {
    codeKey: null,
    code: null,
    token: null
  }
})

export const setCraftPreview = val => {
  cache.codeKey = val.codeKey
  cache.code = val.code
  cache.token = val.token
}
