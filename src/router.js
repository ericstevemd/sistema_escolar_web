import { createRouter, createWebHistory } from 'vue-router';

import RepresentantesList from './components/RepresentantesList.vue';
import EstudianesteList from './components/estudianesteList.vue';
import BarChart from './components/BarChart.vue';




const routes = [
  { path: '/', name: 'home', component: BarChart },
{ path: '/representantes', name: 'representantes', component: RepresentantesList },
{ path: '/estudiantes', name: 'estudiantes', component: EstudianesteList },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
