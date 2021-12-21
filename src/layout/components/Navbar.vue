<template>
  <div class="navbar">
    <div class="left-title"><img src="@/assets/images/logo.png" class="logo-img"><h2 class="title">校园反馈系统</h2></div>
    <div class="right-menu">
      <div
        class="search-container"
        :class="{'hide-search':!showsearch}"
      >
        <el-input
          v-model="content"
          class="search-text"
          placeholder="按评价内容关键字搜索"
        />
        <el-button
          slot="append"
          class="search-button"
          icon="el-icon-search"
          @click="searchbycontent()"
        />
      </div>
      <div class="avatar-container">
        <div class="avatar-wrapper">
          <img
            :src="avatar+'?imageView2/1/w/80/h/80'"
            class="user-avatar"
          >
        </div>
      </div>
      <div class="user-name-logout">
        <div class="user-name">{{ name }}</div>
        <div class="log-out"><a @click.stop="logout()">退出登录</a></div>

      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      content: '', // 搜索内容
      showsearch: true
    }
  },
  computed: {
    ...mapGetters(['avatar', 'name'])
  },
  watch: {
    $route(route) {
      if (route.path.startsWith('/table')) {
        this.showsearch = true
      } else {
        this.showsearch = false
      }
    }
  },
  methods: {
    // await 来等待，相当于then
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    searchbycontent() {
      this.$bus.$emit('searchbycontent', this.content)
    }
  }

}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .right-menu {
    float: right;
    height: 50px;
    width: 580px;
    margin-right: 10px;
    margin-top: 0;

    /*搜索框*/
    .search-container {
      height: 50px;
      width: 360px;
      margin-right: 80px;
      display: inline-block;
      vertical-align: top;
      margin-top: 5px;
      .search-text {
        width: 80%;
        vertical-align: top;
      }
      .search-button {
        vertical-align: top;
      }

    }
    .hide-search{
      visibility: hidden;
    }

    /**头像部分*/
    .avatar-container {
      margin-right: 10px;
      width: 50px;
      height: 50px;
      display: inline-block;
      vertical-align: top;
      .user-avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    /*用户名和登录部分*/
    .user-name-logout {
      display: inline-block;
      vertical-align: top;
      height: 50px;
      width: 70px;

      .user-name {
        margin-top:3px;
        overflow: hidden;
        height: 18px;
      }
      .log-out {
        margin-top: 7px;
      }
    }
  }
  .left-title{
    float: left;
    height: 50px;
    width: 400px;
    display: inline-block;
    vertical-align:top;
    .logo-img{
      height: 40px;
      width:40px;
      margin-left:10px;
      margin-top: 5px;
      display: inline-block;
      vertical-align:top;

    }
    .title{
      max-height: 100%;
      display: inline-block;
      vertical-align: top;
      margin-left: 9px;
      margin-bottom: 0;
      margin-top: 11px;
      font-size: 24px;
      font-family:'STKaiti'
    }
  }
}
</style>
