<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rule" label-width="80px" class="demo-ruleForm">
      <el-container>
        <el-main>
          <div class="front">
            <el-card :body-style="{padding:'30px'}">
              <el-row align="middle" justify="center">
                <el-col :span="9">
                  <el-form-item label="客户姓名" prop="client_name">
                    <el-input v-model="form.client_name" class="client_name" placeholder="客户姓名..." />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="客户企业" prop="client_enterprise">
                    <el-input v-model="form.client_enterprise" class="client_enterprise" placeholder="客户企业..." />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="评价对象" prop="target">
                  <el-input v-model="form.target" class="target" placeholder="评价对象..." />
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
                    <el-radio border label="3">良好</el-radio>
                    <el-radio border label="2">一般</el-radio>
                    <el-radio border label="1">差劲</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item
                  label="图片："
                  prop="imageUrl"
                >
                  <el-upload
                    ref="upload"
                    v-model="form.imageUrl"
                    class="imageUrl"
                    :class="{uoloadSty:showBtnDealImg,disUoloadSty:noneBtnImg}"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handleDealImgPreview"
                    :on-remove="handleDealImgRemove"
                    :on-success="successDealImg"
                    :before-upload="beforeUploadDealImg"
                    :on-change="dealImgChange"
                    :file-list="dealImgFileList"
                    accept=".jpeg,.jpg,.gif,.png"
                    :limit="limitCountImg"
                    :auto-upload="false"
                  >
                    <i class="el-icon-plus" />
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-form-item>
              </el-row>

              <el-form-item>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-button type="primary" @click="onSubmit('form')">创建表单</el-button>
                  </el-col>
                  <el-col :span="6">
                    <el-button @click="onCancel('form')">取消</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-card>
          </div>
        </el-main>
      </el-container>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showBtnDealImg: true,
      noneBtnImg: false,
      limitCountImg: 3, // 上传图片的最大数量
      dialogImageUrl: '',
      dialogVisible: false,
      dealImgFileList: [],

      form: {
        client_name: '',
        client_enterprise: '',
        target: '',
        content: '',
        type: '',
        imageUrl: ''
      },
      rule: {
        client_name: [
          { required: true, message: '请输入客户姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '姓名不支持特殊字符',
            trigger: 'blur'
          }
        ],
        client_enterprise: [{ required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '活动名称不支持特殊字符',
            trigger: 'blur'
          }],
        target: [{ required: true, message: '请输入评价对象', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '评价对象不支持特殊字符',
            trigger: 'blur'
          }],
        content: [{ required: true, message: '请输入评价内容', trigger: 'blur' },
          { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' }],
        type: [{ required: true, message: '请点击评价性质按钮', trigger: 'change' }],
        imageUrl: [{ required: true, message: '请输入评价内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    dealImgChange(file, fileList) {
      if (fileList.length >= this.limitCountImg) {
        this.noneBtnImg = true
      } else {
        this.noneBtnImg = false
      }
    },
    handleDealImgRemove(file, fileList) {
      if (fileList.length >= this.limitCountImg) {
        this.noneBtnImg = true
      } else {
        this.noneBtnImg = false
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        // eslint-disable-next-line eqeqeq
        if (valid) {
          this.$message({
            message: 'submit!',
            type: 'success'
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCancel(formName) {
      this.$refs[formName].resetFields()
      this.noneBtnImg = false
      this.$refs.upload.clearFiles()
    }
  }
}
</script>

<style>
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
  width:270px;
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
.el-card{
  width: 620px;
  border-radius: 4px

}
</style>

