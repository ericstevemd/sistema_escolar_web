// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa el archivo de configuración de rutas

const app = createApp(App);
app.use(router); // Usa Vue Router
app.mount('#app');