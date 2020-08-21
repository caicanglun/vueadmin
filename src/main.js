import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
 import imageViewer from 'image-viewer-vue'
import Vuex from 'vuex'
import VueJsonp from 'vue-jsonp'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
import Mock from './mock'
Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
import VueResource from 'vue-resource'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueJsonp)
Vue.use(VueResource)
Vue.use(preview)
//NProgress.configure({ showSpinner: false });

//Vue.prototype.baseUrl= 'http://192.168.11.141'
//Vue.prototype.baseUrl= 'http://test.144f.com:8080/hleos-cms'
//Vue.prototype.baseUrl= 'http://test.144f.com:8080/sl-web'
Vue.prototype.baseUrl= 'http://app.ecfpros.com:8080/sl-web'
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

