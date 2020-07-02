import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/admin.vue')
  },
  {
    path: '/index',
    component: () => import('../views/index.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/son/adindex.vue'), meta: ['后台首页']
      },
      {
        path: '/index/management',
        component: () => import('../views/son/management.vue'), meta: ['订单管理']
      },
      {
        path: '/index/shopplist',
        component: () => import('../views/son/shopplist.vue'), meta: ['商品管理', '商品列表']
      },
      {
        path: '/index/add-shop',
        component: () => import('../views/son/add_shop.vue'), meta: ['商品管理', '添加商品']
      },
      {
        // 获取上面传参数
        path: '/index/amend_shop/:id',
        component: () => import('../views/son/amend_shop.vue'), meta: ['商品管理', '修改商品']
      },
      {
        path: '/index/store',
        component: () => import('../views/son/store.vue'), meta: ['店铺管理']
      },
      {
        path: '/index/uesr_list',
        component: () => import('../views/son/user_list.vue'), meta: ['账号管理', '账号列表']
      },
      {
        path: '/index/add_user',
        component: () => import('../views/son/add_user.vue'), meta: ['账号管理', '添加账号']
      },
      {
        path: '/index/modify_user/:id',
        component: () => import('../views/son/modify_user.vue'), meta: ['账号管理', '修改账号']
      },
      {
        path: '/index/shop_info',
        component: () => import('../views/son/shop_info.vue'), meta: ['账号管理', '修改密码']
      },
      {
        path: '/index/order_info',
        component: () => import('../views/son/order.info.vue'), meta: ['销售统计', '商品统计']
      },
      {
        path: '/index/revise_pwd',
        component: () => import('../views/son/revise_pwd.vue'), meta: ['销售统计', '订单统计']
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
