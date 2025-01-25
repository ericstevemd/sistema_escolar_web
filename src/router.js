import { createRouter, createWebHistory } from 'vue-router';

import RepresentantesList from './components/RepresentantesList.vue';
import EstudianesteList from './components/estudianesteList.vue';
import BarChart from './components/BarChart.vue';
import usuarios from './components/usuarios.vue';




const routes = [
  { path: '/', name: 'home', component: BarChart },
  { path: '/usuarios', name: 'usuarios', component: usuarios },
{ path: '/representantes', name: 'representantes', component: RepresentantesList },
{ path: '/estudiantes', name: 'estudiantes', component: EstudianesteList },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
