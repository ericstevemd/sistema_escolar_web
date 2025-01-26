<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
    <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">¡Bienvenido!</h2>
      <p class="text-sm text-center text-gray-500 mb-6">Por favor, ingresa tus datos para continuar.</p>
      <form @submit.prevent="handleLogin" class="space-y-6 flex flex-col items-center"> <!-- Centrado en el formulario -->
        <!-- Campo de Cédula -->
        <div class="mb-6 w-full">
          <label for="cedula" class="block text-sm font-medium text-gray-700 text-center">Cédula</label>
          <div class="relative w-full">
            <input
              type="text"
              id="cedula"
              v-model="cedula"
              class="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 border-gray-300 shadow-sm"
              placeholder="Ingresa tu cédula"
              :class="{'border-red-500': errors.cedula}"
              aria-describedby="cedulaError"
            />
            <p v-if="errors.cedula" id="cedulaError" class="mt-2 text-sm text-red-500 text-center">{{ errors.cedula }}</p>
          </div>
        </div>

        <!-- Campo de Contraseña -->
        <div class="mb-6 w-full">
          <label for="password" class="block text-sm font-medium text-gray-700 text-center">Contraseña</label>
          <div class="relative w-full">
            <input
              type="password"
              id="password"
              v-model="password"
              class="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 border-gray-300 shadow-sm"
              placeholder="Ingresa tu contraseña"
              :class="{'border-red-500': errors.password}"
              aria-describedby="passwordError"
            />
            <p v-if="errors.password" id="passwordError" class="mt-2 text-sm text-red-500 text-center">{{ errors.password }}</p>
          </div>
        </div>

        <!-- Botón de inicio de sesión -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3 px-4 text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:bg-gray-400"
        >
          <span v-if="isLoading" class="spinner"></span> <!-- Spinner de carga -->
          Iniciar Sesión
        </button>
        <p v-if="errorMessage" class="mt-4 text-sm text-center text-red-500">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginComponent",
  data() {
    return {
      cedula: "",
      password: "",
      errors: {},
      errorMessage: "",
      isLoading: false, // Variable para mostrar el spinner
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.cedula) {
        this.errors.cedula = "La cédula es obligatoria.";
      }

      if (!this.password) {
        this.errors.password = "La contraseña es obligatoria.";
      }

      return Object.keys(this.errors).length === 0;
    },
    async handleLogin() {
      if (!this.validateForm()) {
        return;
      }

      this.isLoading = true; // Empieza el spinner de carga

      try {
        const response = await axios.post(
          "http://158.220.124.141:3002/usuario/login",
          {
            cedula: this.cedula,
            password: this.password,
          }
        );

        const { token, userType } = response.data;
        localStorage.setItem("token", token);
        this.$router.push(userType === "admin" ? "/admin" : "/dashboard");
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message ||
          "Ocurrió un error al iniciar sesión.";
      } finally {
        this.isLoading = false; // Finaliza el spinner de carga
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Inter", sans-serif;
}

button:disabled {
  background-color: #cccccc; /* Fondo gris para el botón deshabilitado */
}

.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top: 2px solid rgba(40, 167, 69, 0.8); /* Color verde */
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

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

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  color: #333;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

input.invalid {
  border-color: red;
}

.error {
  color: red;
  font-size: 12px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center; /* Centra el spinner con el texto */
  justify-content: center;
  gap: 8px; /* Espaciado entre spinner y texto */
}

button:disabled {
  background-color: #cccccc;
}

button:hover {
  background-color: #218838;
}

.spinner {
  display: inline-block;
  width: 14px; /* Tamaño ajustado */
  height: 14px;
  border: 2px solid rgba(0, 0, 0, 0.1); /* Color de fondo claro */
  border-top: 2px solid rgba(40, 167, 69, 0.8); /* Color principal */
  border-radius: 50%;
  animation: spin 0.8s linear infinite; /* Velocidad ajustada */
}
</style>
