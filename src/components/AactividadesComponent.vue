<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold mb-6">Lista de Actividades</h1>

    <!-- Formulario para agregar actividad -->
    <div class="form bg-white p-6 rounded-lg shadow-xl">
      <h2 class="text-xl font-semibold text-center mb-4">Agregar Nueva Actividad</h2>
      <form @submit.prevent="addActividad" class="space-y-6">
        <div class="form-group">
          <label for="nombre">Nombre de la actividad</label>
          <input
            type="text"
            id="nombre"
            v-model="newActividad.nombre"
            class="input-field"
            placeholder="Escribe el nombre"
            required
          />
        </div>

        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            v-model="newActividad.descripcion"
            class="input-field"
            placeholder="Escribe la descripción"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="fecha">Fecha</label>
          <input
            type="date"
            id="fecha"
            v-model="newActividad.fecha"
            class="input-field"
            required
          />
        </div>

        <div class="form-group">
          <label for="foto">Foto</label>
          <input
            type="file"
            id="foto"
            @change="handleFileUpload"
            class="input-file"
            required
          />
        </div>

        <button
          type="submit"
          class="submit-btn w-full"
        >
          Agregar Actividad
        </button>
      </form>
    </div>

    <!-- Mostrar error si existe -->
    <div v-if="error" class="error bg-red-100 text-red-800 p-3 rounded-md mb-6 text-center">
      {{ error }}
    </div>

    <!-- Mostrar actividades mientras se cargan o si ya hay datos -->
    <div v-if="isLoading" class="text-center text-gray-500">Cargando actividades...</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="actividad in actividades"
        :key="actividad.id"
        class="user-item"
      >
        <img
          :src="`http://158.220.124.141:3002${actividad.foto}`"
          alt="Actividad"
          class="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div>
          <h2 class="text-lg font-semibold">{{ actividad.nombre }}</h2>
          <p class="text-sm text-gray-600 mb-3">{{ actividad.descripcion }}</p>
          <p class="text-sm text-gray-500">Fecha: {{ formatDate(actividad.fecha) }}</p>
          <div class="flex justify-between mt-4">
            <button class="btn-edit">Editar</button>
            <button class="btn-delete" @click="deleteActividad(actividad.id)">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ActividadesLista',
  data() {
    return {
      actividades: [],
      isLoading: true,
      error: null,
      newActividad: {
        nombre: '',
        descripcion: '',
        fecha: '',
        foto: ''
      }
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
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.newActividad.foto = file;
      }
    },
    async addActividad() {
      if (!this.newActividad.nombre || !this.newActividad.descripcion || !this.newActividad.fecha || !this.newActividad.foto) {
        this.error = "Por favor complete todos los campos antes de enviar.";
        return;
      }

      const formData = new FormData();
      formData.append("nombre", this.newActividad.nombre);
      formData.append("descripcion", this.newActividad.descripcion);
      formData.append("fecha", this.newActividad.fecha);
      formData.append("foto", this.newActividad.foto);

      try {
        const response = await axios.post("http://158.220.124.141:3002/actividad", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.actividades.push(response.data); // Agregar la nueva actividad a la lista
        this.newActividad = { nombre: "", descripcion: "", fecha: "", foto: "" }; // Limpiar formulario
        this.error = null; // Limpiar mensaje de error
      } catch (err) {
        this.error = "Error al agregar la actividad. Intenta nuevamente.";
      }
    },
    deleteActividad(id) {
      axios.delete(`http://158.220.124.141:3002/actividad/${id}`).then(() => {
        this.actividades = this.actividades.filter(actividad => actividad.id !== id);
      }).catch(() => {
        this.error = "Error al eliminar la actividad. Intenta nuevamente.";
      });
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

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  text-align: center;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  color: #333;
}

.input-field, .input-file {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  background-color: #f8f9fa;
  transition: all 0.3s ease;
}

.input-field:focus, .input-file:focus {
  border-color: #007BFF;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.input-file {
  background-color: #fff;
  cursor: pointer;
}

button {
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  background-color: #007BFF;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.submit-btn {
  background-color: #28a745;
}

.submit-btn:hover {
  background-color: #218838;
}

.user-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.user-item button {
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 6px;
}

.btn-edit {
  background-color: #ffc107;
}

.btn-edit:hover {
  background-color: #e0a800;
}

.btn-delete {
  background-color: #dc3545;
}

.btn-delete:hover {
  background-color: #c82333;
}

.error {
  color: red;
  font-size: 14px;
  font-weight: 500;
}

.success {
  color: green;
  font-size: 14px;
}
</style>
