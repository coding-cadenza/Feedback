import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // 加载进度条
  NProgress.start()
  const hasusername = store.getters.name
  if (hasusername !== '' && hasusername !== null && hasusername !== undefined) {
    await store.dispatch('user/getUserInfo')
  }
  if (to.path === '/login') {
    if (store.getters.name) {
      next({ path: '/table' })
    } else {
      next()
    }
  } else {
    if (store.getters.name) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
