/* eslint-disable vue/no-parsing-error */
<template>
  <div class="table-container" style="overflow-y:auto" :class="{'hide-index':hideindex}">
    <el-table
      v-loading="listLoading"
      :data="list"
      style="width:100%"
      element-loading-text="Loading"

      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="反馈人姓名" width="100" :show-overflow-tooltip="true">
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
      <el-table-column label="评价时间" width="180" align="center" :show-overflow-tooltip="true">
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
      <el-table-column label="评价内容" style="table-layout:fixed;" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="评价等级" width="105" align="center">
        <template slot="header" slot-scope="scope">
          <div> 评价等级
            <el-dropdown @command="handleCommandBycomment">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="0">默认</el-dropdown-item>
                <el-dropdown-item command="3">良好</el-dropdown-item>
                <el-dropdown-item command="2">一般</el-dropdown-item>
                <el-dropdown-item command="1">差劲</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
        <template slot-scope="scope">
          <el-tag :type="color[scope.row.type-1]"> {{ pinglun[scope.row.type-1] }} </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="反馈截图" width="150">
        <template slot-scope="scope">
          <div v-for="capture in scope.row.captures " :key="capture" class="image-container">
            <el-image :src="capture" :preview-src-list="[capture]" />
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="录入员" width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span align="left">{{ scope.row.operator }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="操作" width="150">
        <template slot-scope="scope">
          <el-row>
            <el-button class="operate-button" type="primary" @click="onUpdate(scope.row.feedback_id)">修改</el-button>
            <el-button class="operate-button" type="danger" @click="onDelete(scope.row.feedback_id)">删除</el-button>
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

      hideindex: true,
      pagesize: 20,
      currentpage: 1,
      fetchparams: {
        page: '',
        type: '',
        content: '', // 关键字
        is_time_sort_asc: 0 // 0是按时间降序,1是按时间升序
      }, // fetchData参数
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
    this.fetchData()
  },
  mounted() {
    this.$bus.$on('searchbycontent', (content) => {
      this.fetchparams.content = content
      this.fetchData()
    })
  },

  methods: {
    // 根据时间排序  升序command=='asc'  降序command=='desc'
    handleCommandBytime(command) {
      if (command === 'asc' && this.fetchparams.is_time_sort_asc !== 1) {
        this.fetchparams.is_time_sort_asc = 1
        this.fetchData()
      } else if (command === 'desc' && this.fetchparams.is_time_sort_asc !== 0) {
        this.fetchparams.is_time_sort_asc = 0
        this.fetchData()
      }
    },
    // 根据评价设置请求参数
    handleCommandBycomment(command) {
      if (command !== this.fetchparams.type) {
        this.fetchparams.type = command
        this.fetchData()
      }
    },
    fetchData() {
      this.listLoading = true
      // 设置请求参数
      this.fetchparams.page = this.currentpage

      getList(this.fetchparams).then(response => {
        // 在查找的时候，如果查找的页数过大，可能会显示没有数据，这时候要查找前一页
        if (response.data.list.length === 0 && this.currentpage !== 1) {
          this.currentpage -= 1
          this.fetchData()
        } else {
          this.list = response.data.list
          // 解析时间
          this.list.forEach((ele, index) => {
            this.list[index].input_time = ele.input_time.replace('T', ' ').replace('Z', ' ')
          })
          this.total = response.data.count
          this.listLoading = false
          this.hideindex = false
        }
      })
    },

    handleCurrentChange(newPage) {
      this.listQuery.pagenum = newPage
      this.currentpage = newPage
      this.fetchData()
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
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
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
          if (this.total % this.pagesize === 1 && this.currentpage === (Math.floor(this.total / this.pagesize) + 1)) {
            if (this.currentpage > 1) { this.currentpage-- }
          }

          this.fetchData()
        })
      }).catch(() => {
      })
    },
    onExportData() {
      ExportData().then(res => {
        window.open(res.data, self)
      })
    }

  }
}
</script>
<style scoped >
.hide-index{
  display: none;
}
.table-container{
  width: 90%;
  height: 90%;
  margin: auto;
  overflow: hidden;
  margin-top:10px;
  margin-bottom: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)

}
.el-image{
  width: 90%;
  height: 80%;
  max-width: 40px;
  max-height: 40px;
  vertical-align:middle;
}

.image-container{
  display: inline-block;
  line-height: 10%;
  max-width:30%;
  max-height: 70%;

}

.pagination-container{
display: inline-block;
vertical-align:middle;
margin-top: 9px;
}
.right-bo-button-contain{
display: inline-block;
vertical-align:middle;
float: right;
overflow: hidden;
margin-top: 5px;
margin-right: 5px;
}

.right-bo-button-icon{
  font-weight: 500;
  margin: 0%;

}

.foot-container{
  height: 50px;

}
.operate-button{
padding: 10px 10px;
}

>>> .el-table td{
  padding:5px;
  max-width: 100%;

}
>>> .el-table .cell{
  padding: 0;
}

</style>
