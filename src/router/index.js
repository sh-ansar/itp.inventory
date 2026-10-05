import Vue from 'vue'
import Router from 'vue-router'
import AuthLayout from '../components/auth/AuthLayout'
import AppLayout from '../components/admin/AppLayout'

Vue.use(Router)

// const demoRoutes = []
// if (process.env.NODE_ENV === 'development' || process.env.VUE_APP_INCLUDE_DEMOS) {
//   const vueBookRoutes = require('./vueBookRoutes').default
//   vueBookRoutes.forEach(route => demoRoutes.push(route))
// }

const router = new Router({
  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes: [
    // ...demoRoutes,
    {
      path: '*',
      redirect: { name: 'dashboard' },
    },
    // {
    //   name: 'forms',
    //   path: '/forms',
    //   component: () => import('../components/forms/form-elements/FormElements.vue')
    // },
    {
      name: 'main',
      path: '/main',
      component: AppLayout,
      children: [
        {
          name: 'items',
          path: 'items',
          component: () => import('../components/main/Main.vue'),
          meta: {
            title: 'ITP Inventory | Основные средства',
          },
        },
        {
          name: 'utilized-items',
          path: 'utilized-items',
          component: () => import('../components/main/UtilizedItems.vue'),
          meta: {
            title: 'ITP Inventory | Утилизированные средства',
          },
        },
        {
          name: 'add-item',
          path: 'add-item',
          component: () => import('../components/main/AddItem.vue'),
          meta: {
            title: 'ITP Inventory | Добавление средства',
          },
        },
        {
          name: 'inventorization',
          path: 'inventorization',
          component: () => import('../components/main/Inventorizations.vue'),
          meta: {
            title: 'ITP Inventory | Инвентаризации',
          },
        },
      ],
    },
    {
      name: 'directories',
      path: '/directories',
      component: AppLayout,
      children: [
        {
          name: 'persons',
          path: 'persons',
          component: () => import('../components/directories/Persons.vue'),
          meta: {
            title: 'ITP Inventory | Ответственные лица',
          },
        },
        {
          name: 'locations-1s',
          path: 'locations-1s',
          component: () => import('../components/directories/Locations1s.vue'),
          meta: {
            title: 'ITP Inventory | Расположение 1С',
          },
        },
        {
          name: 'locations-fact',
          path: 'locations-fact',
          component: () => import('../components/directories/LocationsFact.vue'),
          meta: {
            title: 'ITP Inventory | Фактическое расположение',
          },
        },
      ],
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          name: 'login',
          path: 'login',
          component: () => import('../components/auth/login/Login.vue'),
        },
        {
          name: 'logout',
          path: 'logout',
          component: () => import('../components/auth/logout/Logout.vue'),
        },
        {
          name: 'signup',
          path: 'signup',
          component: () => import('../components/auth/signup/Signup.vue'),
        },
        {
          name: 'recover-password',
          path: 'recover-password',
          component: () => import('../components/auth/recover-password/RecoverPassword.vue'),
        },
        {
          path: '',
          redirect: { name: 'login' },
        },
      ],
    },
    // {
    //   path: '/404',
    //   component: EmptyParentComponent,
    //   children: [
    //     {
    //       name: 'not-found-advanced',
    //       path: 'not-found-advanced',
    //       component: () => import('../components/pages/404-pages/VaPageNotFoundSearch.vue'),
    //     },
    //     {
    //       name: 'not-found-simple',
    //       path: 'not-found-simple',
    //       component: () => import('../components/pages/404-pages/VaPageNotFoundSimple.vue'),
    //     },
    //     {
    //       name: 'not-found-custom',
    //       path: 'not-found-custom',
    //       component: () => import('../components/pages/404-pages/VaPageNotFoundCustom.vue'),
    //     },
    //     {
    //       name: 'not-found-large-text',
    //       path: '/pages/not-found-large-text',
    //       component: () => import('../components/pages/404-pages/VaPageNotFoundLargeText.vue'),
    //     },
    //   ],
    // },
    {
      name: 'Admin',
      path: '/admin',
      component: AppLayout,
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: () => import('../components/dashboard/Dashboard.vue'),
          default: true,
          meta: {
            title: 'ITP Inventory | Главная',
          },
        },
        {
          name: 'sync',
          path: 'sync',
          component: () => import('../components/admin/Sync.vue'),
          meta: {
            title: 'ITP Inventory | Синхронизации',
          },
        },
        {
          name: 'sync-settings',
          path: 'sync-settings',
          component: () => import('../components/admin/SyncSettings.vue'),
          meta: {
            title: 'ITP Inventory | Настройки компаний',
          },
        },
        {
          name: 'manage-roles',
          path: 'manage-roles',
          component: () => import('../components/admin/ManageRoles.vue'),
          meta: {
            title: 'ITP Inventory | Роли специалистов',
          },
        },
        {
          name: 'manage-guests',
          path: 'manage-guests',
          component: () => import('../components/admin/ManageGuestRoles.vue'),
          meta: {
            title: 'ITP Inventory | Роли гостей',
          },
        },
      ],
    },
  ],
})

// router.beforeEach((to, from, next) => {
//   alert("Hii");
// })
export default router
