<template>
  <div class="home">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <div class="searchson">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻闻</span>
        </div>
      </div>
      <div class="user">
        <span class="iconfont iconwode" @click="$router.push('/user')"></span>
      </div>
    </div>
    <div class="tab">
      <van-tabs v-model="active" sticky animated>
        <van-tab :title="item.name" v-for="item in categories" :key="item.id" :post="item"></van-tab>
      </van-tabs>
    </div>
    <div class="posts">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :loading="loading"
          :offset="10"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <hm-post v-for="item in posts" :key="item.id" :post="item"></hm-post>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      categories: [],
      pageIndex: 1,
      pageSize: 5,
      posts: [],
      finished: false,
      loading: false,
      isLoading: false
    }
  },
  created() {
    this.getTabList()
  },
  methods: {
    async getTabList() {
      const res = await this.$axios.get('/category')
      console.log(res)
      const { statusCode, data } = res.data
      this.categories = data
      if (statusCode === 200) {
        this.getPostList(this.categories[0].id)
      }
    },
    async getPostList(id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res)
      const { data } = res.data
      if (this.pageIndex === 1) {
        this.posts = []
      }
      this.posts = [...this.posts, ...data]
      this.loading = false
      if (data.length < this.pageSize) {
        this.finished = true
      }
    },
    onLoad() {
      setTimeout(() => {
        console.log('onLoad事件执行了，我要请求数据了')
        this.pageIndex++
        this.getPostList(this.categories[this.active].id)
      }, 2000)
    },
    onRefresh() {
      this.posts = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true // tab栏切换的时候，需要把loading改成true,防止load事件重复的触发
      setTimeout(() => {
        this.getPostList(this.categories[this.active].id)
        this.isLoading = false
      }, 1000)
    }
  },
  watch: {
    active(value) {
      this.posts = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true // tab栏切换的时候，需要把loading改成true,防止load事件重复的触发
      this.getPostList(this.categories[value].id)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 54px;
  width: 100%;
  background-color: #ff0000;
  color: aliceblue;
  .logo span {
    font-size: 54px;
  }
  .search {
    flex: 1;
    .searchson {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      height: 34px;
      border-radius: 20px;
      background-color: rgba(
        255,
        255,
        255,
        0.3
      ); // rgba(255,255,255,1)--全白;rgba(255,255,255,1)--全黑
      span:first-child {
        font-size: 20px;
      }
    }
  }

  .user {
    span {
      font-size: 20px;
    }
  }
}
</style>
