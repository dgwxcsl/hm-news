<template>
  <div class="hm-comment">
    <div class="comment">
      <div class="title">
        <!-- 自己的评论的结构 -->
        <div class="left">
          <div class="avatar">
            <img :src="$url(comment.user.head_img)" alt />
          </div>
        </div>
        <div class="center">
          <div class="name">{{comment.user.nickname}}</div>
          <div class="time">{{comment.create_date|fromNow}}</div>
        </div>
        <div class="right">回复</div>
      </div>
      <!--子组件  -->
      <HmFloor :num="getFloor(0, comment)" :comment="comment.parent" v-if="comment.parent"></HmFloor>
      <div class="content">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
import HmFloor from './HmFloor'
export default {
  components: {
    HmFloor
  },
  props: {
    comment: Object
  },
  methods: {
    getFloor(num, comment) {
      if (comment.parent) {
        return this.getFloor(num + 1, comment.parent)
      } else {
        return num
      }
    }
  }
}
</script>

<style lang="less" scoped>
.hm-comment {
  border-bottom: 1px solid #ccc;
  padding: 10px;
}
.comment {
  //   display: flex;
  //   justify-content: center;
  //   border: 1px solid gray;
  //   font-size: 14px;
  //   padding: 0 10px;
  .title {
    display: flex;
    .left {
      img {
        height: 35px;
        width: 35px;
        border-radius: 50%;
      }
    }
    .center {
      padding-left: 10px;
      flex: 1;
      font-size: 14px;
      .time {
        color: #999;
      }
    }
    .right {
      font-size: 14px;
      color: #999;
    }
  }
}
.content {
  font-size: 14px;
  margin: 10px 0;
}
</style>
