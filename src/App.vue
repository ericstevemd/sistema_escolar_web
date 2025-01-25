<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/usuarios">Usuario</router-link></li> 
        <li><router-link to="/materia">Materia </router-link></li>
         <li class="submenu">
          <a href="#">Docentes</a>
          <ul class="sub-menu">
            <li><router-link to="/profesores">Profesor </router-link></li>
            <li><router-link to="/asistencias">Asistencias</router-link></li>
            <li><router-link to="/subir-tareas">Subir Tareas</router-link></li>
            <li><router-link to="/novedades">Novedades</router-link></li>
       
          </ul>
        </li>
         
        <li><router-link to="/representantes">Representantes</router-link></li>
      
        <li><router-link to="/estudiantes">Estudiantes</router-link></li>
      </ul>
    </nav>
    <router-view /> <!-- Aquí se renderiza el componente según la ruta -->
  i
  </div>
</template>

<script>

export default {
  name: 'App',
};

</script>

<style>
/* Estilos globales */
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
  color: #333;
}

/* Estilos del menú */
nav {
  background-color: #4CAF50; /* Verde moderno */
  padding: 10px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombras para resaltar */
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center; /* Centra los elementos */
}

nav ul li {
  margin: 0 15px; /* Espaciado entre elementos */
}

nav ul li a {
  text-decoration: none;
  color: #ffffff; /* Texto blanco */
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s ease, border-bottom 0.3s ease; /* Transiciones suaves */
  border-bottom: 2px solid transparent;
}

nav ul li a:hover {
  color: #ffeb3b; /* Cambia a amarillo en hover */
  border-bottom: 2px solid #ffeb3b; /* Agrega un subrayado decorativo */
}

/* Opcional: Ajuste para pantallas pequeñas */
@media (max-width: 768px) {
  nav ul {
    flex-direction: column; /* Cambia a vertical en pantallas pequeñas */
    align-items: center;
  }

  nav ul li {
    margin: 10px 0; /* Espaciado vertical */
  }
}

/* Estilos globales */
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
  color: #333;
}

/* Estilos del menú */
nav {
  background-color: #4CAF50; /* Verde moderno */
  padding: 10px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombras para resaltar */
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center; /* Centra los elementos */
}

nav ul li {
  margin: 0 15px; /* Espaciado entre elementos */
  position: relative; /* Necesario para el submenú */
}

nav ul li a {
  text-decoration: none;
  color: #ffffff; /* Texto blanco */
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s ease, border-bottom 0.3s ease; /* Transiciones suaves */
  border-bottom: 2px solid transparent;
}

nav ul li a:hover {
  color: #ffeb3b; /* Cambia a amarillo en hover */
  border-bottom: 2px solid #ffeb3b; /* Agrega un subrayado decorativo */
}

/* Submenú */
.submenu .sub-menu {
  display: none;
  list-style: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #4CAF50;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombras para resaltar */
  padding: 10px;
  margin-top: 5px;
}

.submenu:hover .sub-menu {
  display: block; /* Muestra el submenú al pasar el mouse */
}

.sub-menu li {
  padding: 5px 10px;
}

.sub-menu li a {
  font-weight: normal;
  color: #fff;
  text-decoration: none;
  display: block;
}

.sub-menu li a:hover {
  background-color: #ffeb3b;
  color: #333;
}

/* Opcional: Ajuste para pantallas pequeñas */
@media (max-width: 768px) {
  nav ul {
    flex-direction: column; /* Cambia a vertical en pantallas pequeñas */
    align-items: center;
  }

  nav ul li {
    margin: 10px 0; /* Espaciado vertical */
  }
}
</style>