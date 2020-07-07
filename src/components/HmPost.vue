<template>
  <div class="hm-post">
    <div class="list">
      <div class="singleImg" v-if="post.cover.length < 3">
        <div class="left">
          <div class="title">{{post.title}}</div>
          <div class="down">
            <div class="name">{{post.user.nickname}}</div>
            <div class="post">
              <slot></slot>跟帖
            </div>
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
          <span class="post">
            <slot></slot>跟帖
          </span>
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
  .name {
    margin-right: 20px;
  }
}
</style>
