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

    <div class="mask" v-show="isShowMask">
      <van-button type="primary" @click="crop">裁剪</van-button>
      <van-button type="danger" @click="cancel">取消</van-button>
      <vueCropper
        ref="cropper"
        :img="img"
        :autoCrop="true"
        :autoCropWidth="150"
        :autoCropHeight="150"
        :centerBox="true"
      ></vueCropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      info: '',
      showNickName: false,
      nickname: '',
      showPwd: false,
      password: '',
      oldpassword: '',
      showGender: false,
      radio: '',
      isShowMask: false,
      img: ''
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
      console.log(file)
      this.isShowMask = true
      this.img = file.content
      // if (file.file.size > 20 * 1024) {
      //   this.$toast('您所上传的图片不得超过20k')
      //   return
      // }
      // const isGif = file.file.type === 'image/gif'
      // const isJPg = file.file.type === 'image/jeg'
      // const isPng = file.file.type === 'image/png'

      // if (!isGif || !isJPg || !isPng) {
      //   this.$toast('您所上传的图片必须是gif格式或是jpg格式或是png格式')
      //   return
      // }

      // const fd = new FormData()
      // fd.append('file', file.file)
      // const res = await this.$axios.post('/upload', fd)
      // const { statusCode, data } = res.data
      // if (statusCode === 200) {
      //   this.editUser({ head_img: data.url })
      // }
    },
    crop() {
      // 获取截图的base64 数据
      // this.$refs.cropper.getCropData(data => {
      //   // do something
      //   console.log('base64', data)
      // })
      // 获取截图的blob数据
      this.$refs.cropper.getCropBlob(async blob => {
        // do something
        // console.log('blob', data)
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.isShowMask = false
          this.editUser({ head_img: data.url })
        }
      })
    },
    cancel() {
      this.$toast('取消成功')
      this.isShowMask = false
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
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  .van-button {
    position: absolute;
    top: 0;
    z-index: 999;
  }
  .van-button:nth-child(1) {
    left: 0;
  }

  .van-button:nth-child(2) {
    right: 0;
  }
}
</style>
