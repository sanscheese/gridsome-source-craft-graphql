<script>
import fetchCraftPreview from './utils/fetchCraftPreview'

export default {
  props: {
    endpoint: {
      type: String,
      default: null
    }
  },
  render() {
    return null
  },
  mounted () {
    const dataPath = this.$route.meta.dataPath
    if (dataPath && dataPath.endsWith('craft_preview_id.json')) {
        const newPath = dataPath.replace(".json", "")
        if (!!this.endpoint) this.$router.push({ path: newPath, query: this.$route.query })
      }

    if (!!this.endpoint) fetchCraftPreview(this, this.endpoint)
  },
  watch: {
    '$route.path': function () { 
      if (!!this.endpoint) fetchCraftPreview(this, this.endpoint) 
    },
  },
}
</script>