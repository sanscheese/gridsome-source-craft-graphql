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
    return []
  },
  async mounted () {
    if (!!this.url) fetchCraftPreview(this, this.url)
  },
  watch: {
    '$route.path': function () { 
      if (!!this.url) fetchCraftPreview(this, this.url)}
  },
}
</script>