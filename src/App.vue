<template>
  <div id="app">
    <div class="box">我是一个盒子</div>
    <div class="iconfont iconfenxiang"></div>
    <van-field></van-field>
    <van-button type="info">我是一个按钮</van-button>
    <van-button type="danger">默认按钮</van-button>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less">
.box {
  /* width: 300px  height: 300px font-size: 75px   750px设计稿（两倍图） */
  /* 1rem = 75px   375px  150px  37.5px */
  width: 300px;
  height: 300px;
  font-size: 75px;
  background-color: pink;
}
</style>
