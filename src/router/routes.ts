import { RouteRecordRaw } from 'vue-router';

import Error404 from 'pages/Error404.vue'
import FrontMainLayout from 'layouts/front/MainLayout.vue'
import Index from 'pages/Index.vue'
import JavascriptTimestamp from 'pages/javascript/Timestamp.vue'

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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: Error404,
  },
];

export default routes;
