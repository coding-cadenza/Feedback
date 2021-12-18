<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rule" label-width="95px" class="demo-ruleForm">
      <el-container>

        <div class="front">
          <el-card :body-style="{padding:'30px'}">
            <el-row>
              <el-form-item label="录入员" prop="operator">
                <el-input v-model="form.operator" class="operator" placeholder="管理员..." :disabled="true" />
              </el-form-item>
            </el-row>
            <el-row align="middle" justify="center">
              <el-col :span="9">
                <el-form-item label="客户姓名" prop="client_name">
                  <el-input
                    v-model="form.client_name"
                    class="client_name"
                    placeholder="客户姓名..."
                    value="sum"
                    onchange="this.value=this.value.substring(0, 20)"
                    onkeydown="this.value=this.value.substring(0, 20)"
                    onkeyup="this.value=this.value.substring(0, 20)"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="反馈人身份" prop="client_enterprise">
                  <el-input
                    v-model="form.client_enterprise"
                    class="client_enterprise"
                    placeholder="反馈人身份..."
                    onchange="this.value=this.value.substring(0, 30)"
                    onkeydown="this.value=this.value.substring(0, 30)"
                    onkeyup="this.value=this.value.substring(0, 30)"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="评价对象" prop="target">
                <el-input
                  v-model="form.target"
                  class="target"
                  placeholder="评价对象..."
                  onchange="this.value=this.value.substring(0, 40)"
                  onkeydown="this.value=this.value.substring(0, 40)"
                  onkeyup="this.value=this.value.substring(0, 40)"
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="评价内容" prop="content">
                <el-input
                  v-model="form.content"
                  class="content"
                  type="textarea"
                  rows="5"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="评价内容...(不超过200个字)"
                  resize="none"
                  max="200"
                  maxlength="200"
                  onchange="this.value=this.value.substring(0, 200)"
                  onkeydown="this.value=this.value.substring(0, 200)"
                  onkeyup="this.value=this.value.substring(0, 200)"
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="评价性质" prop="type">
                <el-radio-group v-model="form.type" size="medium">
                  <el-radio border :label="3">良好</el-radio>
                  <el-radio border :label="2">一般</el-radio>
                  <el-radio border :label="1">差劲</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                label="图片："
                prop="imageUrl"
              >
                <el-upload
                  v-model="form.imageUrl"
                  rules="ruleiamge"
                  class="avatar-uploader"
                  :class="{uoloadSty:showBtnDealImg,disUoloadSty:noneBtnImg}"
                  action="#"
                  list-type="picture-card"
                  :on-preview="handleDealImgPreview"
                  :on-remove="handleDealImgRemove"
                  :on-change="dealImgChange"
                  :file-list="dealImgFileList"
                  accept=".jpeg,.jpg,.gif,.png"
                  :limit="limitCountImg"
                  :auto-upload="false"
                >
                  <i
                    slot="default"
                    class="el-icon-plus
                      avatar-uploader-icon"
                  />
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
            </el-row>

            <el-form-item>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-button
                    type="primary"
                    :disabled="submitLoading"
                    @click="onSubmit('form')"
                  >{{ submitLoading ? '处理中...' : '确认修改' }}</el-button>
                </el-col>
                <el-col :span="6">
                  <el-button
                    @click="onCancel('form')"
                  >返回</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-card>
        </div>

      </el-container>
    </el-form>
  </div>
</template>

<script>
import { UpdateItemById } from '@/api/form'
import { GetItemById } from '@/api/form'
export default {
  data() {
    return {
      showBtnDealImg: true,
      noneBtnImg: false,
      dialogImageUrl: '',
      dialogVisible: false,
      dealImgFileList: [],
      limitCountImg: 3,
      cap_id: [], // 要删除的id
      uploadImgList: [], // 要上传的图片
      submitLoading: false, // 设置更新表单按钮的属性
      form: {
        feedback_id: '',
        client_name: '',
        client_enterprise: '',
        target: '',
        content: '',
        type: '',
        operator: '',
        captures: [],
        input_time: ''

      },
      rule: {
        client_name: [
          { required: true, message: '请输入客户姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'change' }],
        client_enterprise: [{ required: true, message: '请输入反馈人身份', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'change' }],
        target: [{ required: true, message: '请输入评价对象', trigger: 'blur' },
          { min: 2, max: 40, message: '长度在 2 到 40 个字符', trigger: 'change' }],
        content: [{ required: true, message: '请输入评价内容', trigger: 'blur' },
          { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'change' }],
        type: [{ required: true, message: '请点击评价性质按钮', trigger: 'change' }]
      }
    }
  },
  created() {
    this.GetItemById(this.$route.params.id)
  },
  methods: {
    dealImgChange(file, fileList) {
      if (fileList.length >= this.limitCountImg) {
        this.noneBtnImg = true
      } else {
        this.noneBtnImg = false
      }

      const { imageUrl, ...data } = this.rule
      this.rule = data
      this.$refs.form.clearValidate('imageUrl')
      var temp = []
      // 将图片放入list(本来有的不放)
      fileList.forEach(element => {
        if (element.raw !== undefined) {
          temp.push(element.raw)
        }
      })
      this.uploadImgList = temp
    },
    handleDealImgRemove(file, fileList) {
      if (fileList.length >= this.limitCountImg) {
        this.noneBtnImg = true
      } else {
        this.noneBtnImg = false
      }
      if (fileList.length === 0) {
        this.rule.imageUrl = [{ required: true, message: '请上传至少一张图片', trigger: 'change' }]
      }
      // 如果是本来有的图片，就要删掉

      if (file.cap_id !== undefined) {
        this.cap_id.push(file.cap_id)
      }
    },

    handleDealImgPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        // eslint-disable-next-line eqeqeq
        if (valid) {
          this.submitLoading = true
          // 更新表单
          if (this.cap_id.length > 0) {
            this.form.cap_id = this.cap_id // 加入要删除的图片id
          }
          if (this.uploadImgList.length > 0) {
            this.form.uploadImgList = this.uploadImgList
          }
          UpdateItemById(this.form)
        } else {
          return false
        }
      })
    },
    onCancel(formName) {
      this.$router.push('/table')
    },
    GetItemById(id) {
      GetItemById(id).then(res => {
        this.form = res.data
        this.setDealImgFileList()
      })
    },
    // 设置图片墙的初始值
    setDealImgFileList() {
      var dealImgFileList = this.dealImgFileList
      this.form.captures.forEach(
        (val, index) => {
          dealImgFileList.push({ url: val.image, cap_id: val.cap_id })
        }
      )
      if (this.form.captures.length >= this.limitCountImg) {
        this.noneBtnImg = true
      }
    }
  }
}
</script>

<style >
.line{
  text-align: center;
}
.uoloadSty .el-upload--picture-card{
  width:110px;
  height:110px;
  line-height:110px;
}
.disUoloadSty .el-upload--picture-card{
  display: none;
}
.client_name{
  width: 120px;
}
.client_enterprise{
  width:265px;
}
.target{
  width:480px;
}
.content{
  width:480px;
}
.front {
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}
.app-container{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.el-card{
  width: 640px;
  border-radius: 4px

}
</style>

