<template>
  <div class="hm-post" @click="$router.push(`/postDetails/${post.id}`)">
    <div class="list">
      <div class="video" v-if="post.type==2">
        <span class="iconfont iconshipin"></span>
        <img :src="$url(post.cover[0].url)" alt />
      </div>
      <div class="singleImg" v-else-if="post.cover.length < 3">
        <div class="left">
          <div class="title">{{post.title}}</div>
          <div class="down">
            <div class="name">{{post.user.nickname}}</div>
            <div class="post">{{ post.comment_length}}跟帖</div>
          </div>
        </div>
        <div class="right">
          <img :src="$url(post.cover[0].url)" alt />
        </div>
      </div>
      <div class="mutipleImg" v-else>
        <div class="up">
          <div class="title">{{ post.title }}</div>
        </div>
        <div class="center">
          <img :src="$url(post.cover[0].url)" alt />
          <img :src="$url(post.cover[1].url)" alt />
          <img :src="$url(post.cover[2].url)" alt />
        </div>
        <div class="down">
          <span class="name">{{ post.user.nickname }}</span>
          <span class="post">{{ post.comment_length}}跟帖</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  padding: 10px;
}
.singleImg {
  display: flex;
  font-size: 16px;
  padding: 0 10px;
  .left {
    flex: 1;
  }
  .right {
    img {
      width: 121px;
      height: 75px;
    }
  }
}
.mutipleImg {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 16px;
  .center {
    display: flex;
    justify-content: space-between;
    img {
      width: 121px;
      height: 75px;
      object-fit: cover;
    }
  }
}
.down {
  width: 150px;
  font-size: 12px;
  color: gray;
  display: flex;
  padding-top: 20px;
  .name {
    margin-right: 20px;
  }
}
.video {
  width: 100%;
  position: relative;
  img {
    width: 100%;
    object-fit: cover;
  }
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .iconfont {
    height: 46px;
    width: 46px;
    // background-color: rgba(255, 255, 255, 0.5);//白色透明
    background-color: rgba(136, 55, 55, 0.3); //黑色透明
    line-height: 46px;
    text-align: center;
    border-radius: 50%;
    font-size: 40px;
    color: white;
  }
}
</style>
