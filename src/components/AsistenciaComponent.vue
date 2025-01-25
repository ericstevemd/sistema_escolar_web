<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Lista de Actividades</h1>
    <div v-if="error" class="bg-red-100 text-red-800 p-2 rounded mb-4">
      {{ error }}
    </div>
    <div v-if="isLoading" class="text-center text-gray-500">Cargando actividades...</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="actividad in actividades"
        :key="actividad.id"
        class="p-4 border rounded shadow-lg"
      >
        <img
          :src="`http://158.220.124.141:3002${actividad.foto}`"
          alt="Actividad"
          class="w-full h-48 object-cover rounded mb-2"
        />
        <h2 class="text-lg font-semibold">{{ actividad.nombre }}</h2>
        <p class="text-sm text-gray-700">{{ actividad.descripcion }}</p>
        <p class="text-sm text-gray-500">Fecha: {{ formatDate(actividad.fecha) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'AsistenciaLista',
  data() {
    return {
      actividades: [],
      isLoading: true,
      error: null,
    };
  },
  methods: {
    async fetchActividades() {
      try {
        const response = await axios.get("http://158.220.124.141:3002/actividad");
        this.actividades = response.data;
      } catch (err) {
        this.error = "Error al cargar las actividades. Intenta nuevamente.";
      } finally {
        this.isLoading = false;
      }
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("es-ES", options);
    },
  },
  mounted() {
    this.fetchActividades();
  },
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
