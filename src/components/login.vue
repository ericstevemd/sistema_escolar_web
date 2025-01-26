<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Inicio de Sesión</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="cedula" class="block text-sm font-medium text-gray-700">Cédula</label>
            <input
              type="text"
              id="cedula"
              v-model="cedula"
              class="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu cédula"
            />
            <p v-if="errors.cedula" class="mt-1 text-sm text-red-500">{{ errors.cedula }}</p>
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu contraseña"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
          </div>
          <button
            type="submit"
            class="w-full py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-lg focus:outline-none"
          >
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
    name:'login',
    data() {
      return {
        cedula: "",
        password: "",
        errors: {},
        errorMessage: "",
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
  
        try {
          const response = await axios.post("http://158.220.124.141:3002/usuario/login", {
            cedula: this.cedula,
            password: this.password,
          });
  
          // Almacena el token y redirige al dashboard
          const { token, userType } = response.data;
          localStorage.setItem("token", token);
          this.$router.push(userType === "admin" ? "/admin" : "/dashboard");
        } catch (error) {
          this.errorMessage =
            error.response?.data?.message || "Ocurrió un error al iniciar sesión.";
        }
      },
    },
  };
  </script>
  
  <style>
  body {
    font-family: "Inter", sans-serif;
  }
  </style>
  