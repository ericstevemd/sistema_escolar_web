import { createRouter, createWebHistory } from 'vue-router';

import RepresentantesList from './components/RepresentantesList.vue';
import EstudianesteList from './components/estudianesteList.vue';



const routes = [

{ path: '/representantes', name: 'representantes', component: RepresentantesList },

{ path: '/estudiantes', name: 'estudiantes', component: EstudianesteList },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
