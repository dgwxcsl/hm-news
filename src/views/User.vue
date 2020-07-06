<template>
  <div class="user">
    <div class="header">
      <div class="avatar" @click="$router.push(`/userEdit`)">
        <img :src="this.$axios.defaults.baseURL + info.head_img" alt />
      </div>
      <div class="info">
        <div class="name">
          <span class="iconfont iconxingbienv" v-if="info.gender === 0"></span>
          <span class="iconfont iconxingbienan" v-else></span
          >{{ info.nickname }}
        </div>
        <div class="time">{{ info.create_date | time }}</div>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <div class="nav">
      <my-navbar @click="$router.push('/follow')">
        <template>我的关注</template>
        <template v-slot:content>关注的用户</template>
      </my-navbar>
      <my-navbar @click="$router.push('/comment')">
        <template>我的跟帖</template>
        <template v-slot:content>跟帖/回复</template>
      </my-navbar>
      <my-navbar>
        <template>我的收藏</template>
        <template v-slot:content>文章/视频</template>
      </my-navbar>
      <my-navbar @click="clickFn">
        <template>设置</template>
      </my-navbar>
      <my-navbar @click="logout">
        <template>退出</template>
      </my-navbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 接受请求回来的个人信息
    return {
      info: {},
      userId: ''
    }
  },
  async created() {
    const userId = localStorage.getItem('userId')
    this.userId = userId
    // const token = localStorage.getItem('token')
    const res = await this.$axios.get(
      `/user/${userId}`
      // , {
      //   // 配置请求头
      //   // axios传headers请求头，用Authorization携带token
      //   headers: {
      //     Authorization: token
      //   }
      // }
    )
    // console.log(res.data)
    // const { statusCode, message } = res.data
    const { statusCode } = res.data
    if (statusCode === 200) {
      // 发送请求获取个人用户数据成功
      this.info = res.data.data
    }
    // if (statusCode === 401 && message === '用户信息验证失败') {
    //   // 若token由于时间问题失效或者token被篡改（用户名或者密码错误也是401）
    //   localStorage.removeItem('userId')
    //   localStorage.removeItem('token')
    //   this.$router.push('/login')
    // }
  },
  methods: {
    clickFn() {
      this.$router.push('/userEdit')
    },
    async logout() {
      try {
        await this.$dialog.confirm({
          // 基于promise对象封装的函数，返回的结果若成功则走then,若失败则走catch
          // 用于确认消息，包含取消和确认按钮
          title: '退出登录',
          message: '亲，您确认退出该系统吗？'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.$toast.success('退出成功')
        this.$router.push('/login')
      } catch {
        this.$toast('取消退出')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  .header {
    display: flex;
    height: 120px;
    border-bottom: 5px solid #ccc;
    align-items: center;
    padding: 0 20px;
    .avatar {
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    .info {
      flex: 1; //左右盒子不需要设置宽度
      padding-left: 20px;
      font-size: 14px;
      color: #333;
      .name {
        margin-bottom: 10px;
        .iconxingbienv {
          color: #f23ebf;
        }
        .iconxingbienan {
          color: #80bbe4;
        }
      }
      .time {
        color: #999;
      }
    }
  }
  .nav {
    padding-left: 20px;
  }
}
</style>
