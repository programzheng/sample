import { RouteRecordRaw } from 'vue-router';

//Frontend
import Error404 from 'pages/Error404.vue'
import FrontMainLayout from 'layouts/front/MainLayout.vue'
import Index from 'pages/Index.vue'
import JavascriptTimestamp from 'pages/javascript/Timestamp.vue'

//admin
import AdminGoBaseMainLayout from 'layouts/admin/go/base/MainLayout.vue'
//laravel-base
import AdminPhpLaravelBaseMainLayout from 'layouts/admin/php/laravel-base/MainLayout.vue'
import AdminPhpLaravelBaseIndex from 'pages/admin/php/laravel-base/Index.vue'
import AdminPhpLaravelBaseLogin from 'pages/admin/php/laravel-base/Login.vue'
import { laravelBaseAdminAuth } from './middlewares'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: FrontMainLayout,
    children: [
      {
        path: '',
        name: 'index',
        component: Index
      },
      {
        path: 'javascript/timestamp',
        name: 'javascript.timestamp',
        component: JavascriptTimestamp
      }
    ],
  },

  //go
  {
    path: '/admin/go/base',
    name: 'admin.go.base',
    component: AdminGoBaseMainLayout
  },

  //php
  {
    path: '/admin/php/laravel-base/login',
    name: 'admin.php.laravel-base.login',
    component: AdminPhpLaravelBaseLogin
  },
  {
    path: '/admin/php/laravel-base',
    component: AdminPhpLaravelBaseMainLayout,
    meta: {
      middlewares: [laravelBaseAdminAuth]
    },
    children: [
      {
        path: '',
        name: 'admin.php.laravel-base.index',
        component: AdminPhpLaravelBaseIndex,

      }
    ]
  },
  
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: Error404,
  },
];

export default routes;
