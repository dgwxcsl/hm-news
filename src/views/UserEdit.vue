<template>
  <div class="userEdit">
    <my-header>编辑资料</my-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      <van-uploader :after-read="afterRead" class="uploader" />
    </div>
    <div class="nav">
      <my-navbar @click="showNickNameFn">
        <template>昵称</template>
        <template #content>{{ info.nickname }}</template>
      </my-navbar>
      <my-navbar @click="showPwdFn">
        <template>密码</template>
        <template #content>******</template>
      </my-navbar>
      <my-navbar @click="showGenderFn">
        <template>性别</template>
        <template #content>{{ info.gender === 0 ? '女' : '男' }}</template>
      </my-navbar>
    </div>
    <!-- 1.修改昵称的弹出框 -->
    <van-dialog
      v-model="showNickName"
      title="修改昵称"
      show-cancel-button
      @confirm="editNickNameFn"
    >
      <van-field v-model="nickname" placeholder="请输入新昵称" />
    </van-dialog>
    <!-- 2.修改密码的弹出框 -->
    <van-dialog
      v-model="showPwd"
      title="修改密码"
      show-cancel-button
      @confirm="editPwdFn"
    >
      <van-field v-model="password" placeholder="请输入新密码" />
    </van-dialog>
    <!-- 3.性别 -->
    <van-dialog
      v-model="showGender"
      title="修改性别"
      show-cancel-button
      @confirm="editGenderFn"
    >
      <van-radio-group v-model="radio" @confirm="editGenderFn">
        <van-cell-group>
          <van-cell title="男" clickable @click="radio = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="radio = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: '',
      showNickName: false,
      nickname: '',
      showPwd: false,
      password: '',
      oldpassword: '',
      showGender: false,
      radio: ''
    }
  },
  async created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      this.info = res.data.data
      // console.log(res.data)
    },
    showNickNameFn() {
      this.showNickName = true
      this.nickname = this.info.nickname
    },
    showPwdFn() {
      this.showPwd = true
      this.password = this.info.password
      this.oldpassword = this.info.password
    },
    showGenderFn() {
      this.showGender = true
      this.radio = this.info.gender
    },
    async editUser(data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async editNickNameFn() {
      this.editUser({ nickname: this.nickname })
    },
    async editPwdFn() {
      this.editUser({ password: this.password })
      if (this.oldpassword !== this.password) {
        // localStorage.removeItem('token')
        // localStorage.removeItem('userId')
        this.$router.push('/login')
      }
    },
    async editGenderFn() {
      this.editUser({ gender: this.radio })
    },
    async afterRead(file) {
      const fd = new FormData()
      fd.append('file', file.file)
      const res = await this.$axios.post('/upload', fd)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.editUser({ head_img: data.url })
      }
    }
  }
}
</script>

<style lang="less" scoped>
/* 对于模板中子组件（动态渲染）的是不会添加属性选择器的，要加/deep/深度选择器 */
/*
  scoped的注意点以及样式穿透
  scoped的作用：让样式只在当前组件生效。
    1. 会给所有的样式的选择器添加属性选择器
    2. 给模板中所有的元素添加一个属性 data-v-xxx  只会给模板中存在的元素添加这个属性
*/
/* 使用scoped后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件的scoped CSS和子组件的scoped CSS的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件 */
.userEdit {
  padding: 0 20px;
}
.avatar {
  text-align: center;
  position: relative;
}
.avatar img {
  width: 50px;
  height: 50px;
  text-align: center;
  border-radius: 50%;
}
.uploader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}

/deep/ .van-field__control {
  //css中深度选择器要加>>>,less中深度选择器要加/deep/,scss中要加::v-deep
  padding: 10px;
}
</style>
