import { RouteRecordRaw } from 'vue-router';

import FrontMainLayout from 'layouts/front/MainLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => FrontMainLayout,
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'javascript/timestamp',
        component: () => import('pages/javascript/Timestamp.vue')
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
