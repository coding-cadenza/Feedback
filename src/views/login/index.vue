<template>
  <div class="login-container">

    <div id="wx_reg" class="QR" />

  </div>
</template>

<script>
import WwLogin from '@/utils/wwlogin'

export default {
  name: 'Login',
  mounted() {
    var wwlogin = new WwLogin({
      'id': 'wx_reg',
      'appid': 'ww3b790a02102fe9a4',
      'agentid': '1000002',
      'redirect_uri': 'https%3A%2F%2Fipandai.club%2Fapi%2Flogin'
    })
  }
}
</script>

<style lang="scss">

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

/* reset element-ui css */

</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .QR{
      width: 280px;
      height: 280px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;

    }
}

</style>
