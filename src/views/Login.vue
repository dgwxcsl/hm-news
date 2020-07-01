<template>
  <div class="login">
    <my-header>我是登录页面</my-header>
    <my-logo></my-logo>
    <van-form @submit="onSubmit">
      <van-field v-model="username" label="用户名" placeholder="请输入用户名或手机号" :rules="rules.username" />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <p class="tips">
      没有账号？去
      <router-link to="/register">注册</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          {
            required: true,
            message: '请填写用户名或手机号',
            trigger: 'onChange'
          },
          {
            pattern: /^\d{5,11}$/,
            message: '必须输入5~11位数字',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'onChange' },
          {
            pattern: /^\w{3,9}$/, // \w表示[0-9a-zA-Z_]
            message: '必须输入3~9位数字',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  created() {
    // 在login页面初始化时获得注册页面所传过来的参数
    const { username, password } = this.$route.params
    // const { username, password } = this.$route.query
    this.username = username
    this.password = password
  },
  methods: {
    async onSubmit() {
      // console.log('submit', values) //values为密码
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      const { statusCode, message, data } = res.data
      // console.log(res.data)
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push('/')
        // 保存token
        localStorage.setItem('token', data.token)
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .tips {
    font-size: 14px;
    text-align: right;
    padding-right: 20px;
    a {
      color: orange;
    }
  }
}
</style>
