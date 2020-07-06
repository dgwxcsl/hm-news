<template>
  <div class="myfollow">
    <my-header>我的关注</my-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL + item.head_img" alt="" />
        </div>
        <div class="center">
          <p>{{ item.nickname }}</p>
          <p class="time">{{ item.create_date | time }}</p>
        </div>
        <div class="right">
          <van-button round type="warning" @click="unFollow(item.id)"
            >取消关注</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getFollows()
  },
  methods: {
    async getFollows() {
      const res = await this.$axios.get('/user_follows')
      console.log('关注列表数据', res)
      this.list = res.data.data
    },
    async unFollow(id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '亲，你确定要取关该用户吗'
        })
        const res = await this.$axios.get(`/user_unfollow/${id}`)
        // console.log(res)
        if (res.data.statusCode === 200) {
          this.$toast.success('取关成功')
          this.getList()
        }
      } catch {
        this.$toast('取消')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  .item {
    border-bottom: 1px solid #ccc;
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    justify-content: space-between;
    .left {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      padding-left: 10px;
      font-size: 14px;
      .time {
        color: #999;
        margin-top: 5px;
      }
    }
    .van-button {
      width: 100px;
      height: 40px;
      font-size: 12px;
    }
  }
}
</style>
