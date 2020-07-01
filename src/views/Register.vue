<template>
  <div>
    <my-header>我是注册页面</my-header>
    <my-logo></my-logo>
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.username"
        label="用户名"
        placeholder="请输入用户名或手机号"
        :rules="rules.username"
      />
      <van-field
        v-model="user.nickname"
        type="text"
        label="昵称"
        placeholder="请输入昵称"
        :rules="rules.nickname"
      />
      <van-field
        v-model="user.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        nickname: '',
        password: ''
      },
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
        nickname: [
          {
            required: true,
            message: '请填写昵称',
            trigger: 'onChange'
          },
          {
            pattern: /^[\u4e00-\u9fa5]{3,5}$/,
            message: '必须输入3~5为汉字',
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
  methods: {
    async onSubmit() {
      // console.log('submit', values) //values为密码
      const res = await this.$axios.post('/register', this.user)
      const { statusCode, message } = res.data
      console.log(res.data)
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push(
          // 路由传参
          // 1.地址栏直接拼接
          // `/login?username=${this.user.username}&password=${this.user.password}`
          {
            // 2.使用query对象传参，所传参数显示在地址栏中
            // path: '/login',
            // query: {
            //   username: this.user.username,
            //   password: this.user.password
            // }
            // 3.使用params传参，所传参数不在地址栏中，但是path无效，需要给路径指定name并用name
            // name: 'login',
            // params: {
            //   username: this.user.username,
            //   password: this.user.password
            // }
          }
        )
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.register {
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
