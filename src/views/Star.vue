<template>
  <div class="collect">
    <div class="header"><my-header>我的收藏</my-header></div>

    <hm-post v-for="item in info" :key="item.id" :post="item"
      ><template>{{ item.comments.length }}</template></hm-post
    >
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
      this.info = res.data.data
    }
  }
}
</script>

<style></style>
