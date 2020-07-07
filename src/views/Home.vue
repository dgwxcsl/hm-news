<template>
  <div class="home">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <div class="searchson">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="user">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <div class="tab">
      <van-tabs v-model="active" sticky animated>
        <van-tab :title="item.name" v-for="item in categories" :key="item.id" :post="item"></van-tab>
      </van-tabs>
    </div>
    <div class="posts">
      <van-list
        v-model="loading"
        :finished="finished"
        :loading="loading"
        :offset="10"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <hm-post v-for="item in posts" :key="item.id" :post="item">
          <template>{{item.comment_length}}</template>
        </hm-post>
      </van-list>
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
      loading: false
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
        this.getTabList()
      }, 2000)
    }
  },
  watch: {
    active(value) {
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
