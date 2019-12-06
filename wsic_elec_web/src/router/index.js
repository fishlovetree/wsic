import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/Login/Login.vue'
import index from '../views/index/index'
import home from '../views/index/home'

Vue.use(Router)
const router = new Router({
  mode: 'history',  //去掉url中的#
  routes: [
    {
      path : "/login",
      name : "login",
      component : login,
      meta:{
        keepAlive:false,
      }
    },
    {
      path : "/",
      name : "index",
      component : index,
      meta:{
        keepAlive:true,
        requireAuth: true,  // 是否需要判断是否登录
      },
      children:[
        {
          path : "/home",
          name : "home",
          component : home,
          meta:{
            keepAlive:true,
            requireAuth: true,  // 是否需要判断是否登录
          }
        },
        {
          // 集中器管理F:\00-SVN\WSIC\Services\wsic_elec_web\src\views\Main\concentrator
          path : "concentrator/view",
          name : "concentrator",
          component : () => import('@/views/Main/concentrator/concentrator.vue'),
          meta:{
            keepAlive:true
          },
        },
        {
          // 常量管理
          path : "constant/view",
          name : "constant",
          component : () => import('@/views/Main/constant/constant.vue'),
          meta:{
            keepAlive:true
          },
        },
        {
          // 系统异常
          path : "errorLog/view",
          name : "errorLog",
          component : () => import('@/views/Main/errorLog/errorLog.vue'),
          meta:{
            keepAlive:true
          },
        },
        {
          // 菜单管理
          path : "menu/view",
          name : "menu",
          component : () => import('@/views/Main/menu/menu.vue'),
          meta:{
            keepAlive:true
          },
        },
        {
          // 电表管理equipment/view
          path : "meter/view",
          name : "meter",
          component : () => import('@/views/Main/meter/meter.vue'),//电力
          //component : () => import('@/views/Main/meter/water.vue'),//水务
          meta:{
            keepAlive:true
          },
        },
        {
          // 设备管理
          path : "equipment/view",
          name : "equipment",
          component : () => import('@/views/Main/equipment/equipment.vue'),//消防
          meta:{
            keepAlive:true
          },
        },
        {
          // 组织机构
          path : "organization/view",
          name : "organization",
          component : () => import('@/views/Main/organization/organization.vue'),
          meta:{
            keepAlive:true
          },
        },
        {
          // 角色管理
          path : "role/view",
          name : "role",
          component : () => import('@/views/Main/role/role.vue'),
          meta:{
            keepAlive:true
          },
        },
        {
          // 系统日志
          path : "sysLog/view",
          name : "sysLog",
          component : () => import('@/views/Main/sysLog/sysLog.vue'),
          meta:{
            keepAlive:true
          },
        },
        {
          // 账号管理
          path : "user/view",
          name : "user",
          component : () => import('@/views/Main/user/user.vue'),
          meta:{
            keepAlive:true
          },
        },
        {
          // 客户管理
          path : "customer/view",
          name : "customer",
          component : () => import('@/views/Main/customer/customer.vue'),
          meta:{
            keepAlive:true
          },
        },
        {
          // 第三方接口管理
          path : "api/view",
          name : "API",
          component : () => import('@/views/Main/API/API.vue'),
          meta:{
            keepAlive:true
          },
        },
      ]
    }
  ]
})
// 解决多次点击同一个路由报错的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
