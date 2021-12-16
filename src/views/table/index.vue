/* eslint-disable vue/no-parsing-error */
<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      style="width:100%"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="100">
        <template slot-scope="scope">
          {{ baseindex+scope.$index }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="客户姓名" width="100">
        <template slot-scope="scope">
          {{ scope.row.client_name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="客户企业" width="100">
        <template slot-scope="scope">
          {{ scope.row.client_enterprise }}
        </template>
      </el-table-column>

      <el-table-column label="评价对象" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.target }}</span>
        </template>
      </el-table-column>

      <el-table-column label="评价内容" style="table-layout:fixed;" align="left">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="评价等级" width="90" align="center">
        <template slot-scope="scope">
          <el-tag :type="color[scope.row.type-1]"> {{ pinglun[scope.row.type-1] }} </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="反馈截图" width="200">
        <template slot-scope="scope">
          <span v-for="capture in scope.row.captures " :key="capture">
            <el-image :src="capture" :preview-src-list="[capture]" />
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="操作员" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.operator }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="修改删除" width="200">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" @click="onUpdate(scope.row.feedback_id)">修改</el-button>
            <el-button type="danger" @click="onDelete(scope.row.feedback_id)">删除</el-button>
          </el-row>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      display:inline-block
      :current-page="currentpage"
      :page-size="pagesize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      @current-change="handleCurrentChange"
    />
    <div align="right">
      <el-button type="primary" title="导出csv" style="text-size=15px" icon="el-icon-download" @click="onExportData()" />
      <el-button type="primary" title="展示最新反馈" style="text-size=15px" icon="el-icon-s-platform" @click="onNewInf()" />
      <el-button class="create-form" title="创建表单" type="primary" icon="el-icon-plus" @click="onCreated()" />
    </div>
  </div>
</template>
<script>
import { getList, DeleteById, ExportData } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      baseindex: '',
      pagesize: 20,
      currentpage: 1,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        page: 5,
        limit: 20
      },
      pinglun: ['差劲', '一般', '良好'],
      color: ['danger', '', 'success']
    }
  },
  created() {
    this.fetchData(this.currentpage)
  },
  methods: {

    fetchData(newPage) {
      this.listLoading = true
      getList(newPage).then(response => {
        this.list = response.data.list
        this.total = response.data.count
        this.listLoading = false
        this.baseindex = (newPage - 1) * this.pagesize
      })
    },

    handleCurrentChange(newPage) {
      this.listQuery.pagenum = newPage
      this.fetchData(newPage)
      // 回到顶部
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },

    onUpdate(id) {
      this.$router.push({ name: 'UpdateForm', params: { id: id }})
    },
    onCreated() {
      this.$router.push('/form/createform')
    },
    onNewInf() {
      this.$router.push('/newInf')
    },
    onDelete(id) {
      DeleteById(id).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success',
          duration: 5 * 1000
        })
        location.reload()
      })
    },
    onExportData() {
      ExportData().then(res => {
        console.log(res.url)
        window.open(res.url)
      })
    }

  }
}
</script>
<style scoped>
/* 设置鼠标移动到创建表单上边显示文字 */
.create-form:hover::after{

}
.el-image{
  width: 30%;
  height: 80%;
}
.el-button{
  font-size: 25px;
  padding: 7px,19px;
}
</style>
