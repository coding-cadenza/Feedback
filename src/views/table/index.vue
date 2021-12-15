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
          {{ scope.$index }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="客户姓名" width="100">
        <template slot-scope="scope">
          {{ scope.row.client_name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="客户企业" width="180">
        <template slot-scope="scope">
          {{ scope.row.client_enterprise }}
        </template>
      </el-table-column>

      <el-table-column label="评价对象" width="180" align="center">
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
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="反馈截图" width="240">
        <template slot-scope="scope">
          <span v-for="capture in scope.row.captures " :key="capture">
            <el-image style="width: 20px; height: 20px" :src="capture" :preview-src-list="[capture]" />
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <div align="right">
      <el-button type="primary" icon="el-icon-plus" @click="newInf()" />
      <el-button type="primary" icon="el-icon-plus" @click="onCreated()" />
    </div>
  </div>
</template>
<script>
import { getList } from '@/api/table'
import { DeleteById } from '@/api/table'
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
      pagesize: 10,
      currentpage: 1,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        page: 5,
        limit: 20
      }
    }
  },
  created() {
    this.$store.commit('user/SET_COOKEI')
    this.fetchData(this.currentpage)
  },
  methods: {

    fetchData(newPage) {
      this.listLoading = true
      getList(newPage).then(response => {
        this.list = response.data.list
        this.total = response.data.count
        this.listLoading = false
      })
    },
    handleSizeChange(newSize) {
      this.listQuery.pagesize = newSize
    },
    handleCurrentChange(newPage) {
      this.listQuery.pagenum = newPage
      this.fetchData(newPage)
    },

    onUpdate(id) {
      this.$router.push({ name: 'UpdateForm', params: { id: id }})
    },
    onCreated() {
      this.$router.push('/form/createform')
    },
    newInf() {
      this.$router.push('/newInf')
    },
    onDelete(id) {
      DeleteById(id)
    }
  }
}
</script>
<style scoped>
/* .create-form:hover::after{
    position: absolute;
		left: 15px;
		top: 5px;
		padding: 5px;
		background-color: #0095ff;
		border-radius: 5px;
		color: #fff;

		content: attr(添加反馈);
		z-index: 2;
		width: 120px;
} */
</style>
