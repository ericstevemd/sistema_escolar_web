<template>
  <div class="container">
    <h1>Lista de Profesores</h1>

    <!-- Formulario para agregar docente -->
    <div class="form-container">
      <h3>Agregar Docente</h3>
      <form @submit.prevent="addProfesor">
        <input
          type="text"
          v-model="nuevoProfesor.nombre"
          placeholder="Nombre del Profesor"
          required
        />
        <input
          type="text"
          v-model="nuevoProfesor.cedula"
          placeholder="Cédula"
          required
        />
        <button type="submit">Agregar Profesor</button>
      </form>
    </div>

    <!-- Lista de Profesores -->
    <ul class="profesor-list">
      <li v-for="profesor in profesores" :key="profesor.id" class="profesor-item">
        <span>{{ profesor.nombre }} - {{ profesor.cedula }}</span>
      </li>
    </ul>

    <!-- Mensaje de carga o error -->
    <p v-if="loading" class="loading">
      <span>🔄</span> Cargando...
    </p>
    <p v-if="error" class="error">
      <span>⚠️</span> {{ error }}
    </p>

    <!-- Botón para recargar datos -->
    <button v-if="!loading && !error" @click="fetchProfesores" class="reload-button">
      Recargar Lista
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListaProfesores',
  data() {
    return {
      profesores: [],   // Lista de profesores
      loading: false,   // Estado de carga
      error: '',        // Mensaje de error
      nuevoProfesor: {  // Datos del nuevo profesor
        nombre: '',
        cedula: ''
      }
    };
  },
  mounted() {
    this.fetchProfesores(); // Obtener los profesores al cargar la página
  },
  methods: {
    async fetchProfesores() {
      this.loading = true;
      this.error = '';
      try {
        const response = await axios.get('http://158.220.124.141:3002/profesor/');
        this.profesores = response.data;  // Asignamos los datos recibidos
      } catch (err) {
        if (err.response) {
          this.error = `Error: ${err.response.status} - ${err.response.data}`;
        } else if (err.request) {
          this.error = 'No se pudo conectar con el servidor.';
        } else {
          this.error = 'Hubo un error inesperado al obtener los profesores.';
        }
      } finally {
        this.loading = false;
      }
    },
    async addProfesor() {
      this.loading = true;
      this.error = '';
      try {
        // Enviar la solicitud POST para agregar un nuevo profesor
        const response = await axios.post('http://158.220.124.141:3002/profesor/', this.nuevoProfesor);
        this.profesores.push(response.data);  // Agregar el nuevo profesor a la lista
        this.nuevoProfesor = { nombre: '', cedula: '' };  // Limpiar el formulario
      } catch (err) {
        if (err.response) {
          this.error = `Error: ${err.response.status} - ${err.response.data}`;
        } else if (err.request) {
          this.error = 'No se pudo conectar con el servidor.';
        } else {
          this.error = 'Hubo un error al agregar el profesor.';
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

.form-container {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
}

.form-container input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.form-container button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.form-container button:hover {
  background-color: #45a049;
}

.profesor-list {
  list-style-type: none;
  padding: 0;
}

.profesor-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.profesor-item:hover {
  background-color: #f1f1f1;
}

.loading {
  text-align: center;
  color: #007BFF;
}

.error {
  text-align: center;
  color: red;
  font-size: 14px;
}

.reload-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.reload-button:hover {
  background-color: #45a049;
}
</style>
