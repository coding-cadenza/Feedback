<template>
  <div align="center" >

        <el-carousel height="600px" indicator-position="outside"  style="width:1400px" >
          <el-carousel-item v-for="capture in list[currentpage-1].captures" :key="capture">
          <img :src="capture" class="rightImg">
          </el-carousel-item>
        </el-carousel>
        <div class="app-container">
        <el-table
            :data=[list[currentpage-1]]
            style="width: 100%"
            border="">
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
            <el-table-column
              prop="type"
              label="评价等级"
              width="200">
            </el-table-column>
            <el-table-column
              prop="operator"
              label="操作员"
              width="180">
            </el-table-column>
          </el-table>
          </div>
          <div>
          <el-pagination
            :current-page="currentpage"
            :page-size="1"
            layout="prev, pager, next"
            :total="10"
            @current-change="handleCurrentChange"
       />
       </div>
  </div>

</template>
<script>

export default {
  data() {
    return {
      currentpage: 1,
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
        ]},
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
        ]}],
        listLoading: true,
        listQuery: {
        page: 5,
        limit: 20
      }
    }
  },
  methods:{
    created() {
      this.getFamilyBase_info()
            // 每次进入界面时，先清除之前的所有定时器，然后启动新的定时器
            clearInterval(this.timer)
            this.timer = null
            this.setTimer()
    },
    destroyed(){
      //每次离开界面时，清除定时器
      clearInterval(this.timer)
      this.time=null
    },
    handleCurrentChange(newPage) {
      this.currentpage=newPage
    },
    changePage(){
     page=this.currentpage;
      if(page==10)
       page=1
      else
        page=page+1
      this.currentpage=page;
    },
    setTimer(){
      this.timer = setInterval(this.changePage,1000)
    }
  }
}
</script>
<style>
.rightImg {
  width: 1400px;
  height: 600px;
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