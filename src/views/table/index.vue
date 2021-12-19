/* eslint-disable vue/no-parsing-error */
<template>
  <div class="app-container" style="overflow-y:auto">
    <el-table
      v-loading="listLoading"
      :data="list"
      style="width:100%"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="客户姓名" width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.client_name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="反馈人身份" width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.client_enterprise }}
        </template>
      </el-table-column>

      <el-table-column label="评价对象" width="100" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.target }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评价时间" :render-header="renderHeader" width="180" align="center" :show-overflow-tooltip="true">
        <template slot="header" slot-scope="scope">
          上传时间
          <el-dropdown @command="handleCommandBytime">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="asc">时间升序</el-dropdown-item>
              <el-dropdown-item command="desc">时间降序</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot-scope="scope">
          <span>{{ scope.row.input_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评价内容" style="table-layout:fixed;" align="left" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="评价等级" width="110" align="center">
        <template slot="header" slot-scope="scope">
          <div> 评价等级
            <el-dropdown @command="handleCommandBycomment">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="good">良好</el-dropdown-item>
                <el-dropdown-item command="mid">一般</el-dropdown-item>
                <el-dropdown-item command="bad">差劲</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
        <template slot-scope="scope">
          <el-tag :type="color[scope.row.type-1]"> {{ pinglun[scope.row.type-1] }} </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="反馈截图" width="200">
        <template slot-scope="scope">
          <div v-for="capture in scope.row.captures " :key="capture" class="image-comtainer">
            <el-image :src="capture" :preview-src-list="[capture]" />
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="录入员" width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.operator }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" @click="onUpdate(scope.row.feedback_id)">修改</el-button>
            <el-button type="danger" @click="onDelete(scope.row.feedback_id)">删除</el-button>
          </el-row>
        </template>
      </el-table-column>

    </el-table>

    <div class="foot-container">
      <div class="pagination-container"><el-pagination
        display:inline-block
        :current-page="currentpage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      /></div>

      <div class="right-bo-button-contain">

        <el-button class="right-bo-button " title="创建表单" type="primary" @click="onCreated()"><svg-icon icon-class="edit" /></el-button>

        <el-button class="right-bo-button " type="primary" title="显示最新反馈" style="text-size=15px" @click="onNewInf()">
          <i class="el-icon-s-platform " /></el-button>

        <el-button class="right-bo-button" type="primary" title="导出反馈" style="text-size=15px" @click="onExportData()">
          <svg-icon icon-class="excel" />
        </el-button>
      </div>
    </div>

  </div>
</template>
<script>
import { getList, DeleteById, ExportData } from '@/api/table'
import { Divider } from 'element-ui'

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
    handleCommandBytime(command) {
      // 根据时间排序  升序command=='esc'  降序command=='desc'
      alert(command)
    },
    handleCommandBycomment(command) {
      // 根据评论排序 升序command=='esc'  降序command=='desc'
      alert(command)
    },
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
      console.log(this.currentpage)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteById(id).then(res => {
        }).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 5 * 1000
          })

          this.fetchData(this.currentpage)
          this.listQuery.pagenum = this.currentpage
        })
      }).catch(() => {
      })
    },
    onExportData() {
      ExportData().then(res => {
        window.open(res.data)
      })
    }
  }
}
</script>
<style  scoped>
.app-container{
  width: 100%;
  height: 100%;
  overflow: auto;
}
.el-image{
  width: 100%;
  height: 100%;
}

.img-container{
  width: 100%;
  height: 100%;
}
.pagination-container{
display: inline-block;
vertical-align:middle;
}
.right-bo-button-contain{
display: inline-block;
vertical-align:middle;
float: right;
overflow: hidden;
}

.right-bo-button-icon{
  font-weight: 500;
  margin: 0%;

}
.image-comtainer{
  display: inline-block;
  vertical-align: middle;
  width: 30%;
  height: 30%;
  margin-inline: 1%;
}
.foot-container{
  margin-top: 10px;

}
</style>
