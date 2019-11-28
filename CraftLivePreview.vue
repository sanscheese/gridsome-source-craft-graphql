<script>
import fetchCraftPreview from './utils/fetchCraftPreview'

export default {
  props: {
    url: {
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
        if (!!this.url) this.$router.push({ path: newPath, query: this.$route.query })
      }

    if (!!this.url) fetchCraftPreview(this, this.url)
  },
  watch: {
    '$route.path': function () { 
      if (!!this.url) fetchCraftPreview(this, this.url) 
    },
  },
}
</script>