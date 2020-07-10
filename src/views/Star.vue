<template>
  <div class="collect">
    <div class="header">
      <my-header>我的收藏</my-header>
    </div>

    <hm-post v-for="item in info" :key="item.id" :post="item"></hm-post>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: []
    }
  },
  async created() {
    this.getCollects()
  },
  methods: {
    async getCollects() {
      const res = await this.$axios.get('/user_star')
      console.log(res.data)
      const { data } = res.data
      data.forEach(item => {
        item.comment_length = item.comments.length
      })
      this.info = data
      console.log(this.info)
    }
  }
}
</script>

<style></style>
