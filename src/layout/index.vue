<template>
  <div class="app-wrapper">
    <div class="main-container">
      <div class="navbar">
        <navbar ref="mychild" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain
  }
}
</script>
<style scoped>
.app-wrapper{

}
</style>

