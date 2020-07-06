<template>
  <div class="mycomment">
    <my-header>我的跟帖</my-header>
    <van-list
      :finished="finished"
      v-model="loading"
      @load="onLoad"
      finished-text="没有更多了"
      :immediate-check="false"
      :offset="10"
    >
      <div class="item" v-for="item in info" :key="item.id">
        <div class="time">
          {{ item.create_date | time('YYYY-MM-DD HH:mm') }}
        </div>
        <div class="parent" v-if="item.parent">
          <div class="name">回复：{{ item.parent.user.nickname }}</div>
          <div class="content">{{ item.parent.content }}</div>
        </div>
        <div class="mycontent">{{ item.content }}</div>
        <div class="link">
          <span>原文：{{ item.post.title }}</span
          ><span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: [],
      pageIndex: 1,
      pageSize: 5,
      finished: false,
      loading: false
    }
  },
  async created() {
    // console.log(this.info)
    this.getCommentInfo()
  },
  methods: {
    async getCommentInfo() {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.info = this.info.concat(res.data.data)
        this.loading = false
        if (res.data.data.length !== this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      setTimeout(() => {
        console.log('我需要加载数据了')
        this.pageIndex++
        this.getCommentInfo()
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.mycomment {
  font-size: 14px;
  .item {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    .time {
      color: #999;
      line-height: 40px;
    }
    .parent {
      background-color: #ddd;
      padding: 10px;
      color: #999;
      line-height: 30px;
    }
    .content {
      margin: 20px 0;
    }
    .link {
      color: #999;
      display: flex;
      justify-content: space-between;
      span:first-child {
        width: 60%;
      }
    }
  }
}
</style>
