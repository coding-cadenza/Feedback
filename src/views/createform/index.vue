<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rule" label-width="80px" class="demo-ruleForm">

      <div class="front">
        <el-card :body-style="{padding:'30px'}">
          <el-row>
            <el-form-item label="录入员" prop="operator">
              <el-input v-model="form.operator" class="operator" placeholder="录入员..." :disabled="true" />
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
              <el-form-item label="客户企业" prop="client_enterprise">
                <el-input
                  v-model="form.client_enterprise"
                  class="client_enterprise"
                  placeholder="客户企业..."
                  onchange="this.value=this.value.substring(0, 20)"
                  onkeydown="this.value=this.value.substring(0, 20)"
                  onkeyup="this.value=this.value.substring(0, 20)"
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
                onchange="this.value=this.value.substring(0, 20)"
                onkeydown="this.value=this.value.substring(0, 20)"
                onkeyup="this.value=this.value.substring(0, 20)"
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
                class="avatar-uploader"
                :class="{uoloadSty:showBtnDealImg,disUoloadSty:noneBtnImg}"
                list-type="picture-card"
                :on-preview="handleDealImgPreview"
                :on-remove="handleDealImgRemove"
                :on-change="dealImgChange"
                :file-list="form.dealImgFileList"
                accept=".jpeg,.jpg,.gif,.png"
                :limit="limitCountImg"
                :auto-upload="false"
                action="#"
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
                <el-button type="primary" @click="onSubmit('form')">创建表单</el-button>
              </el-col>
              <el-col :span="6">
                <el-button @click="onCancel('form')">返回</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-card>
      </div>

    </el-form>
  </div>
</template>

<script>
import { CreatItem } from '@/api/form'
import { mapGetters } from 'vuex'

export default {

  data() {
    return {
      showBtnDealImg: true,
      noneBtnImg: false,
      dialogImageUrl: '',
      dialogVisible: false,
      limitCountImg: 3,
      form: {
        client_name: '',
        client_enterprise: '',
        target: '',
        content: '',
        type: '',
        operator: '',
        dealImgFileList: []
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
        client_enterprise: [{ required: true, message: '请输入客户企业', trigger: 'blur' },
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
        imageUrl: [{ required: true, message: '请提交至少一张图片', trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getOperator()
  },

  methods: {
    dealImgChange(file, fileList) {
      if (fileList.length >= this.limitCountImg) {
        this.noneBtnImg = true
      } else {
        this.noneBtnImg = false
      }
      console.log(fileList)
      // eslint-disable-next-line no-unused-vars
      const { imageUrl, ...data } = this.rule
      this.rule = data
      this.$refs.form.clearValidate('imageUrl')
    },
    handleDealImgRemove(file, fileList) {
      if (fileList.length >= this.limitCountImg) {
        this.noneBtnImg = true
      } else {
        this.noneBtnImg = false
      }
      console.log(fileList)
      if (fileList.length === 0) {
        this.rule.imageUrl = [{ required: true, message: '请上传至少一张图片', trigger: 'change' }]
      }
    },
    handleDealImgPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          CreatItem(this.form).then(res => {
            this.$message({
              message: '创建成功',
              type: 'success',
              duration: 5 * 1000
            })
            this.$router.push('/table')
          })
        } else {
          return false
        }
      })
    },
    onCancel(formName) {
      this.$router.push('/')
    },
    getOperator() {
      this.form.operator = this.name
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
.app-container{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.el-card{
  width: 620px;
  border-radius: 4px

}
</style>

