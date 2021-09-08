import { RouteRecordRaw } from 'vue-router';

//Frontend
import Error404 from 'pages/Error404.vue'
import FrontMainLayout from 'layouts/front/MainLayout.vue'
import Index from 'pages/Index.vue'
import JavascriptTimestamp from 'pages/javascript/Timestamp.vue'
import JavascriptDate from 'pages/javascript/Date.vue'

//go-base
import AdminGoBaseMainLayout from 'layouts/admin/go/base/MainLayout.vue'
import AdminGoBaseIndex from 'pages/admin/go/base/Index.vue'
import AdminGoBaseLogin from 'pages/admin/go/base/Login.vue'
//laravel-base
import AdminPhpLaravelBaseMainLayout from 'layouts/admin/php/laravel-base/MainLayout.vue'
import AdminPhpLaravelBaseIndex from 'pages/admin/php/laravel-base/Index.vue'
import AdminPhpLaravelBaseLogin from 'pages/admin/php/laravel-base/Login.vue'
// import { laravelBaseAdminAuth } from './middlewares'
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
      },
      {
        path: 'javascript/date',
        name: 'javascript.date',
        component: JavascriptDate
      }
    ],
  },

  //go
  {
    path: '/admin/go/base/login',
    name: 'admin.go.base.login',
    component: AdminGoBaseLogin
  },
  {
    path: '/admin/go/base',
    name: 'admin.go.base',
    component: AdminGoBaseMainLayout,
    meta: {
      // middlewares: [goBaseAdminAuth]
    },
    children: [
      {
        path: '',
        name: 'admin.go.base.index',
        component: AdminGoBaseIndex
      }
    ]
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
      // middlewares: [laravelBaseAdminAuth]
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
