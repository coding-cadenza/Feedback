<template>
  <div class="navbar">
    <div class="right-menu">
      <div class="avatar-container">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
        </div>

      </div>
      <div class="user-name-logout">
        <div class="user-name">{{ name }}</div>
        <div class="log-out"><a href="" @click="logout()">退出登录</a></div>

      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'avatar',
      'name'
    ])
  },
  methods: {
    // await 来等待，相当于then
    logout() {
      this.$store.dispatch('user/logout')
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
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .right-menu {
    float: right;
    height: 100%;
    width: 140px;
    margin-right: 10px;

    .avatar-container {
      margin-right: 10px;
      width: 50px;
      height: 50px;
      display: inline-block;

      .user-avatar{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .user-name-logout{
       display: inline-block;
       vertical-align: bottom;
       height: 50px;
       width: 70px;
       position: relative;

       .user-name{
        margin-bottom: 2px;
        overflow: hidden;
        height: 18px;
       }
       .log-out{
        margin-top: 7px;
       }

    }
  }
}
</style>
