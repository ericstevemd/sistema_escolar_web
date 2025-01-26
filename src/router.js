import { createRouter, createWebHistory } from 'vue-router';

import RepresentantesList from './components/RepresentantesList.vue';
import EstudianesteList from './components/estudianesteList.vue';
import BarChart from './components/BarChart.vue';
import usuarios from './components/usuarios.vue';
import ListaProfesores from './components/profesores.vue';
import materia from './components/materia.vue';
import AsistenciaComponent from './components/AactividadesComponent.vue';
import logincomponent from './components/logincomponent.vue';



const routes = [
  { path: '/', redirect: '/login',},
  { path: '/login', component: logincomponent, name: 'loginn', },
  { path: '/home', name: 'home', component: BarChart   ,meta: { requiresAuth: true }, },
  { path: '/usuarios', name: 'usuarios', component: usuarios ,  meta: { requiresAuth: true },},
  { path: '/representantes', name: 'representantes', component: RepresentantesList ,  meta: { requiresAuth: true }, },
  { path: '/representantes', name: 'representantes', component: RepresentantesList ,  meta: { requiresAuth: true }, },
  { path: '/estudiantes', name: 'estudiantes', component: EstudianesteList ,  meta: { requiresAuth: true },},
  { path: '/profesores',name:'ListaProfesores', component: ListaProfesores ,  meta: { requiresAuth: true }, },
  { path: '/materias', name: 'ListaMaterias' ,component: materia ,  meta: { requiresAuth: true },},
 { path: '/actividades',name : 'ActividadesLista' ,component: AsistenciaComponent ,  meta: { requiresAuth: true },},
// { path: '/profesor/subir-tareas', component: SubirTareasComponent },
//  { path: '/profesor/novedades', component: NovedadesComponent }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



// Verificar si el usuario está autenticado antes de navegar
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next("/login"); // Si la ruta requiere autenticación y no está autenticado, redirige a login
  } else {
    next(); // Si está autenticado o la ruta no requiere autenticación, continúa
  }
});
export default router;
