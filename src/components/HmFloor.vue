<template>
  <div class="hm-floor">
    <!-- 自己调用自己 -->
    <HmFloor :comment="comment.parent" v-if="comment.parent" :num="num-1"></HmFloor>
    <!-- 自己的结构 -->
    <div class="floor">
      <div class="title">
        <div class="left">{{num}}楼：{{comment.user.nickname}}</div>
        <div class="center">{{comment.create_date | fromNow}}</div>
        <div class="right">回复</div>
      </div>
      <div class="content">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HmFloor',
  props: {
    comment: Object,
    num: Number
  }
}
</script>

<style lang="less" scoped>
.floor {
  margin-top: -1px;
  border: 1px solid #000;
  // border-top: none;
  padding: 10px;
  .title {
    display: flex;
    font-size: 14px;
    .center {
      flex: 1;
      padding-left: 10px;
      color: #999;
    }
    .right {
      color: #999;
    }
  }
  .content {
    font-size: 14px;
    margin: 10px 0;
  }
}
</style>
