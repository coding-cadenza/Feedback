<template>
  <div align="center">

        <el-carousel height="540px" indicator-position="outside"  style="width:1400px" >
          <el-carousel-item v-for="capture in list[currentpage-1].captures" :key="capture">
          <img :src="capture" class="rightImg">
          </el-carousel-item>
        </el-carousel>
        <div class="container">
        <el-table
            :data=[list[currentpage-1]]
            style="width: 100%"
        border>
            <el-table-column
              prop="feedback_id"
              label="序号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="client_name"
              label="客户姓名"
              width="200">
            </el-table-column>
            <el-table-column
              prop="client_enterprise"
              label="客户企业"
              width="200">
            </el-table-column>
            <el-table-column
              prop="target"
              label="评价对象"
              width="200">
            </el-table-column>
            <el-table-column
              prop="content"
              label="评价内容"
              width="200">
            </el-table-column>
            <el-table-column class-name="status-col" label="评价等级" width="200" align="center">
               <template slot-scope="scope">
               <el-tag :type="color[scope.row.type-1]"> {{ pinglun[scope.row.type-1] }} </el-tag>
                </template>
            </el-table-column>
            <el-table-column
              prop="operator"
              label="操作员"
              width="200">
            </el-table-column>
          </el-table>
          </div>
          <div>
          <el-pagination
            :current-page="currentpage"
            :page-size="1"
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
       />
       </div>
  </div>

</template>
<script>
import { GetLestItem } from '@/api/table'
export default {
  data() {
    return {
      currentpage: 1,
      total: 5,
      pinglun: ['差评', '中评', '好评'],
      color: ['danger', '', 'success'],
      list : [{
        feedback_id: '1',
        input_time: '8464',
        type: '1',
        client_name: '王志辰',
        client_enterprise: '夜莺科技',
        target: '微伴助手',
        content: '真的好用',
        operator: 'name',
        captures: [
          '../assert/111.jpg',
          '../assert/111.jpg'
        ] },
      {
        feedback_id: '2',
        input_time: '8464',
        type: '1',
        client_name: '王志辰',
        client_enterprise: '夜莺科技',
        target: '微伴助手',
        content: '真的好用',
        operator: 'name',
        captures: [
          '../assert/111.jpg',
          '../assert/111.jpg'
        ] },
        {
        feedback_id: '3',
        input_time: '8464',
        type: '1',
        client_name: '王志辰',
        client_enterprise: '夜莺科技',
        target: '微伴助手',
        content: '真的好用',
        operator: 'name',
        captures: [
          '../assert/111.jpg',
          '../assert/111.jpg'
        ] },
        {
        feedback_id: '4',
        input_time: '8464',
        type: '1',
        client_name: '王志辰',
        client_enterprise: '夜莺科技',
        target: '微伴助手',
        content: '真的好用',
        operator: 'name',
        captures: [
          '../assert/111.jpg',
          '../assert/111.jpg'
        ] },
        {
        feedback_id: '5',
        input_time: '8464',
        type: '1',
        client_name: '王志辰',
        client_enterprise: '夜莺科技',
        target: '微伴助手',
        content: '真的好用',
        operator: 'name',
        captures: [
          '../assert/111.jpg',
          '../assert/111.jpg'
        ] },
        ],
      listLoading: true,
      listQuery: {
        page: 5,
        limit: 20
      }
    }
  },
  mounted:function(){
    this.created()
  },
  methods:{
    created() {
            // 每次进入界面时，先清除之前的所有定时器，然后启动新的定时器
            clearInterval(this.timer)
            this.timer = null
            this.setTimer()
    },
    destroyed() {
      // 每次离开界面时，清除定时器
      clearInterval(this.timer)
      this.time = null
    },
    handleCurrentChange(newPage) {
      this.currentpage = newPage
    },
    changePage(){
     var page=this.currentpage;
      if(page==this.total)
       page=1
      else
        page=page+1
      this.currentpage=page;
    },
    setTimer() {
      this.timer = setInterval(this.changePage, 1000)
    },
    getLestItem() {
      GetLestItem().then(res => {
        this.list = res.list
      })
    }
  }
}
</script>
<style>
.rightImg {
  width: 1400px;
  height: 540px;
}
.container{
  width: 1400px;
  height: 120px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
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
</style>
