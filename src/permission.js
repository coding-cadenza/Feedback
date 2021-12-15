import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // 加载进度条
  NProgress.start()
  // 如果是到登录页面，获取name,那么直接到达table页面
  if (to.path === '/login') {
    // await store.dispatch('user/login')
    if (store.getters.name) {
      next({ path: '/table' })
    } else {
      next()
    }
  } else {
    next()
  }
  NProgress.done()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
