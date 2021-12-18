<template>
  <div class="page-container">
    <div align="center" :class="{'hide-img' : hasfeedback}" class="img-container"><img src="@/assets/images/noFeedBack.png"></div>
    <div v-if="total>0" align="center" :class="{'hide-page':hasnofeedback}" class="roll-container">
      <el-carousel class="img-carousel" indicator-position="outside">
        <el-carousel-item v-for="capture in list[currentpage-1].captures" :key="capture">
          <img :src="capture" class="rightImg">
        </el-carousel-item>
      </el-carousel>
      <div class="container">
        <!-- 向左的按钮 -->
        <div class="bt-container" @mouseenter="showButton()" @mouseleave="hideButton()"><el-button class="my-button" :class="{'hide-button': hidebutton,}" icon="el-icon-arrow-left" circle @click="rollBack()" /></div>
        <el-table
          :data="[list[currentpage-1]]"
          border
        >
          <el-table-column
            align="center"
            prop="feedback_id"
            label="序号"
            width="100px"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            align="center"
            prop="client_name"
            label="客户姓名"
            width="100px"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            align="center"
            prop="client_enterprise"
            label="反馈人身份"
            width="100px"
            :show-overflow-tooltip="true"
          />
          />
          <el-table-column
            align="center"
            prop="target"
            label="评价对象"
            width="100px"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="content"
            label="评价内容"
            style="overflow: scroll;"
            :show-overflow-tooltip="true"
          />
          <el-table-column class-name="status-col" label="评价等级" width="100px" align="center">
            <template slot-scope="scope">
              <el-tag :type="color[scope.row.type-1]"> {{ pinglun[scope.row.type-1] }} </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="operator"
            label="录入员"
            width="100px"
            :show-overflow-tooltip="true"
          />
        </el-table>
        <!-- 向右的按钮 -->
        <div class="bt-container" @mouseenter="showButton()" @mouseleave="hideButton()"><el-button class="my-button" :class="{'hide-button': hidebutton,}" icon="el-icon-arrow-right" circle @click="rollForward()" /></div>
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
  </div>

</template>
<script>
import { GetLatestItem } from '@/api/table'
export default {
  data() {
    return {
      currentpage: 1,
      hasfeedback: true,
      hasnofeedback: true,
      hidebutton: true,
      total: 0,
      pinglun: ['差劲', '一般', '良好'],
      color: ['danger', '', 'success'],
      list: [],
      listLoading: true,
      listQuery: {
        page: 5,
        limit: 20
      }
    }
  },

  created() {
    this.getLatestItem()
  },
  destroyed() {
    this.destroyTimer() // 清除计时器
  },
  methods: {
    startTimer() {
      // 每次进入界面时，先清除之前的所有定时器，然后启动新的定时器
      clearInterval(this.timer)
      this.timer = null
      this.setTimer()
    },
    destroyTimer() {
      // 每次离开界面时，清除定时器
      clearInterval(this.timer)
      this.time = null
    },
    handleCurrentChange(newPage) {
      this.currentpage = newPage
    },
    changePage() {
      var page = this.currentpage
      if (page === this.total) { page = 1 } else { page = page + 1 }
      this.currentpage = page
      this.startTimer() // 重置时间
    },
    setTimer() {
      // 等轮播完所有图片就换下一个

      this.timer = setInterval(this.changePage, 3000 * (this.list[this.currentpage - 1].captures.length))
    },
    getLatestItem() {
      GetLatestItem().then(res => {
        this.list = res.data.list
        this.total = this.list.length
        if (this.total > 0) {
          this.hasnofeedback = false
          this.startTimer()// 启动计时器
        } else {
          this.hasfeedback = !this.hasfeedback
        }
      })
    },
    showButton() {
      this.hidebutton = false
    },
    hideButton() {
      this.hidebutton = true
    },
    rollBack() {
      var page = this.currentpage
      if (page === 1) { page = this.total } else { page = page - 1 }
      this.currentpage = page
      this.startTimer() // 刷新定时器
    },
    rollForward() {
      var page = this.currentpage
      if (page === this.total) { page = 1 } else { page = page + 1 }
      this.currentpage = page
      this.startTimer() // 刷新定时器
    }
  }
}
</script>

      <style scoped>

      .page-container{
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
        >>> .el-carousel__container {
        position: relative;
        height: 95%;
        width: 100%;
        padding: 0;
        }

        .roll-container{
        height: 100%;
        width: 100%;
        overflow: hidden;
        }
        .img-container{
          height: 100%;
          width: 100%;
        }

        .el-pagination{
        display: none;
        }
        .el-carousel__item{
        color: #475669;
        height: 100%;
        width: 100%;
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

        .img-carousel {
        width: 100%;
        height: 83%;
        overflow: hidden;
        }
        .container{
        width: 100%;
        height: 16%;

        }
        .el-table{
        height: 95%;
        width: 90%;
        display: inline-block;
        vertical-align: middle;
        }

        /* 表格里面那两行 */
        >>>.el-table__header-wrapper{
        height: 40%;
        }
        >>>.el-table__body-wrapper{
        height: 60%;
        }
        .el-table tr,.el-table th,.el-table td{
        padding: 0;
        }

        >>>.el-table__header {
        height: 100%;
        }
        >>>.el-table__body{
          height: 100%;
        }

        .bt-container{
        display: inline-block;
        height: 100%;
        width: 5%;
        }
        /* .rightImg{
         width: 100%;
         height: 100%;
        } */
        .hide-button{
        visibility: hidden;
        }
        .hide-img{
          display: none;
        }
        .hide-page{
          display: none;
        }
      </style>

