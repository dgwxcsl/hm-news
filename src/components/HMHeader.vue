<template>
  <div class="hm-header">
    <div class="back" @click="back">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="title">
      <slot></slot>
    </div>
    <div class="extra"></div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      // this.$router.back()
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.hm-header {
  height: 40px;
  border-bottom: 1px solid #ccc;
  display: flex;
  line-height: 40px;
  .back,
  .extra {
    width: 40px;
    text-align: center;
  }
  .title {
    flex: 1;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
