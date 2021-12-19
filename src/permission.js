import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // 加载进度条
  NProgress.start()
  await store.dispatch('user/getUserInfo')
  const hasusername = store.getters.name

  if (to.path === '/login') {
    if (hasusername) {
      next({ path: '/table' })
    } else {
      next()
    }
  } else {
    if (hasusername) {
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
