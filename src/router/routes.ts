import { RouteRecordRaw } from 'vue-router';

//Frontend
import Error404 from 'pages/Error404.vue'
import FrontMainLayout from 'layouts/front/MainLayout.vue'
import Index from 'pages/Index.vue'
import JavascriptTimestamp from 'pages/javascript/Timestamp.vue'

//Backend
import BackStageGoBaseMainLayout from 'layouts/backstage/go/base/MainLayout.vue'
import BackStagePhpLineMessagingMainLayout from 'layouts/backstage/php/line-messaging/MainLayout.vue'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: FrontMainLayout,
    children: [
      {
        path: '',
        component: Index
      },
      {
        path: 'javascript/timestamp',
        component: JavascriptTimestamp
      }
    ],
  },

  //go
  {
    path: '/backstage/go/base',
    component: BackStageGoBaseMainLayout
  },

  //php
  {
    path: '/backstage/php/line-messaging',
    component: BackStagePhpLineMessagingMainLayout
  },
  
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: Error404,
  },
];

export default routes;
