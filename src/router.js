import { createRouter, createWebHistory } from 'vue-router';

import RepresentantesList from './components/RepresentantesList.vue';
import EstudianesteList from './components/estudianesteList.vue';
import BarChart from './components/BarChart.vue';
import usuarios from './components/usuarios.vue';
import ListaProfesores from './components/profesores.vue';
import materia from './components/materia.vue';
import AsistenciaComponent from './components/AactividadesComponent.vue';



const routes = [
  { path: '/', name: 'home', component: BarChart },
  { path: '/usuarios', name: 'usuarios', component: usuarios },
  { path: '/representantes', name: 'representantes', component: RepresentantesList },
  { path: '/representantes', name: 'representantes', component: RepresentantesList },
  { path: '/estudiantes', name: 'estudiantes', component: EstudianesteList },
  { path: '/profesores',name:'ListaProfesores', component: ListaProfesores },
  { path: '/materias', name: 'ListaMaterias' ,component: materia },
 { path: '/actividades',name : 'ActividadesLista' ,component: AsistenciaComponent },
 // { path: '/profesor/subir-tareas', component: SubirTareasComponent },
//  { path: '/profesor/novedades', component: NovedadesComponent }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
