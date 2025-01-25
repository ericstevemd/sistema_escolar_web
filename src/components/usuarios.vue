<template>
  <div>
    <h1>Crear Usuario</h1>
    <form @submit.prevent="createUser">
      <div>
        <label for="cedula">Cédula:</label>
        <input type="text" v-model="user.cedula" required />
      </div>
      <div>
        <label for="email">Correo:</label>
        <input type="email" v-model="user.email" required />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input type="password" v-model="user.password" required />
      </div>
      <div>
        <label for="rol">Rol:</label>
        <select v-model="user.rol" required>
          <option value="" disabled>Seleccionar rol</option>
          <option value="PROFESOR">Profesor</option>
          <option value="REPRESENTANTE">Estudiante</option>
          <option value="ADMIN">Administrador</option>
        </select>
      </div>
      <button type="submit">Crear Usuario</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CrearUsuario',
  data() {
    return {
      user: {
        cedula: '',
        email: '',
        password: '',
        rol: '', // Agregado para el rol
      },
      message: '',
      api: null, // Axios instance
    };
  },
  created() {
    // Configuración de Axios
    this.api = axios.create({
      baseURL: 'http://localhost:3002', // Cambia esto a la URL de tu API
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  methods: {
    async createUser() {
      try {
        const response = await this.api.post('/usuario', this.user);
        this.message = 'Usuario creado exitosamente: ' + response.data.cedula;
        this.resetForm();
      } catch (error) {
        this.message =
          'Error al crear el usuario: ' +
          (error.response?.data?.message || error.message);
      }
    },
    resetForm() {
      this.user.cedula = '';
      this.user.email = '';
      this.user.password = '';
      this.user.rol = ''; // Resetear el rol
    },
  },
};
</script>

<style>
/* Añade estilos según sea necesario */
body {
  font-family: Arial, sans-serif;
}

form {
  max-width: 400px;
  margin: auto;
}

div {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

p {
  text-align: center;
  font-weight: bold;
  color: #ff0000;
}
</style>
