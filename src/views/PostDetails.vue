<template>
  <div class="details">
    <div class="header">
      <div class="left" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <span v-if="!post.has_follow" @click="follow(post.user.id)" class="follow">关注</span>
        <span v-else @click="unfollow(post.user.id)" class="unfollow">已关注</span>
      </div>
    </div>
    <div class="content">
      <div class="title">{{post.title}}</div>
      <span>{{post.user.nickname}}</span>
      <span>{{post.user.create_date|time}}</span>
      <div class="postContent" v-if="post.type===2">
        <video :src="post.content" controls loop></video>
      </div>
      <div class="postContent" v-html="post.content" v-else></div>
    </div>
    <div class="dianzan">
      <span
        class="iconfont icondianzan dianzan1"
        @click="dianzan(post.id)"
        :class="{active:post.has_like}"
      >{{post.like_length}}</span>
      <!-- <span class="iconfont icondianzan dianzan2" @click="dianzan(post.id)"></span> -->
      <span class="iconfont iconweixin share"></span>
    </div>
    <div class="footer">
      <div class="title">精彩跟贴</div>
      <hm-comment v-for="item in comments" :key="item.id" :comment="item"></hm-comment>
      <input type="text" name id placeholder="写跟贴" />
      <span class="iconfont iconpinglun-">
        <div class="badge">{{post.comment_length}}</div>
      </span>
      <span class="iconfont iconshoucang" @click="star" :class="{active:post.has_star}"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      post: {
        user: {}
      },
      comments: []

      //   post: {}//为什么加上v-if="post"还是会报错
    }
  },
  created() {
    this.getPost()
    this.getComments()
  },
  methods: {
    async getPost() {
      const postId = this.$route.params.id // 为什么用this.$route.params.id，而this.$route.query.id拿不到？
      // const postId = this.$route.query.id
      console.log(postId)
      const res = await this.$axios.get(`/post/${postId}`)
      console.log('文章详情页信息', res)
      const { data } = res.data
      this.post = data
      // post.count = this.count
    },
    async follow(id) {
      try {
        await this.$dialog.confirm({
          title: '关注用户',
          message: '只有登陆的用户才能关注，是否要登陆?'
        })
        const token = localStorage.getItem('token')
        if (token) {
          const res = await this.$axios.get(`/user_follows/${id}`)
          console.log(res)
          const { statusCode, message } = res.data
          if (statusCode === 200) {
            this.$toast.success(message)
            this.getPost()
          }
        } else {
          // this.$router.push({ path: '/login', query: { back: true } })
          // console.log('由文章详情页跳转过来的链接为', this.$route.path)
          localStorage.setItem('backURL', this.$route.path)
          this.$router.push('/login')
        }
      } catch {
        this.$toast('取消成功')
      }
    },
    async unfollow(id) {
      try {
        await this.$dialog.confirm({
          title: '关注用户',
          message: '亲，您确认取关改用户吗？'
        })
        const res = await this.$axios.get(`/user_unfollow/${id}`)
        console.log(res)
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.$toast.success(message)
          this.getPost()
        }
      } catch {
        this.$toast('取消成功')
      }
    },
    async dianzan(id) {
      const token = localStorage.getItem('token')
      if (token) {
        const res = await this.$axios.get(`/post_like/${id}`)
        console.log('点赞和取关返回信息', res)
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.$toast.success(message)
          if (message === '点赞成功') {
            this.count++
          } else {
            this.count--
          }
          this.getPost()
        }
      } else {
        this.$router.push({ path: '/login', query: { back: true } })
      }
    },
    async star() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({ path: '/login', query: { back: true } })
        return
      }
      console.log(this.$route.params.id)
      const res = await this.$axios.get(`/post_star/${this.$route.params.id}`)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPost()
      }
    },
    async getComments() {
      const res = await this.$axios.get(
        `/post_comment/${this.$route.params.id}`
      )
      const { statusCode, data } = res.data
      console.log('该文章的评论信息', data)

      if (statusCode === 200) {
        this.comments = data
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  line-height: 50px;
  .center {
    flex: 1;
    span {
      font-size: 40px;
    }
  }
  .right {
    font-size: 16px;
    span {
      display: inline-block;
      line-height: 20px;
      height: 20px;
      padding: 0px 15px;
      border-radius: 15px;
    }
    .follow {
      background-color: red;
      color: aliceblue;
    }
    .unfollow {
      background-color: #ccc;
    }
  }
}
.content {
  span {
    font-size: 20px;
  }
}
.dianzan {
  display: flex;
  justify-content: space-around;
  span {
    display: block;
    text-align: center;
    border-radius: 13px;
    border: 1px solid gray;
    width: 80px;
    height: 30px;
    line-height: 30px;
  }
  .share {
    color: greenyellow;
  }
  .active {
    color: red;
  }
}
.info {
  font-size: 12px;
  /deep/ img {
    width: 100%;
  }
}
video {
  width: 100%;
}
.footer {
  padding: 10px;
  // position: fixed;
  .title {
    text-align: center;
  }
  .active {
    color: red;
  }
  .iconpinglun- {
    position: relative;
    .badge {
      position: absolute;
      background-color: red;
      top: -15px;
      right: -5px;
      color: white;
    }
  }
}
</style>
