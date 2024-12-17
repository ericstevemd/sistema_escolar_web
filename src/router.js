import { createRouter, createWebHistory } from 'vue-router';

import RepresentantesList from './components/RepresentantesList.vue';
import EstudianesteList from './components/estudianesteList.vue';
import Homepage from './components/homepage.vue';



const routes = [
  { path: '/', name: 'homepage', component: Homepage },

{ path: '/representantes', name: 'representantes', component: RepresentantesList },

{ path: '/estudiantes', name: 'estudiantes', component: EstudianesteList },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
