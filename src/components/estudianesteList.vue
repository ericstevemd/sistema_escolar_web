<template>
  <div class="container">
    <h1 class="title">Ficha de Estudiantes</h1>

    <!-- Formulario para agregar o editar estudiantes -->
    <div class="form-container">
      <h2>{{ isEditing ? "Editar Estudiante" : "Nuevo Estudiante" }}</h2>
      <form @submit.prevent="isEditing ? updateEstudiante() : createEstudiante()">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input id="nombre" v-model="formData.nombre" placeholder="Nombre" required />
        </div>
        <div class="form-group">
          <label for="cedula">Cédula</label>
          <input id="cedula" v-model="formData.cedula" placeholder="Cédula" required />
        </div>
        <div class="form-group">
          <label for="genero">Género</label>
          <select id="genero" v-model="formData.genero" required>
            <option value="">Seleccione una opción</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div class="form-group">
          <label for="nacionalidad">Nacionalidad</label>
          <input id="nacionalidad" v-model="formData.nacionalidad" placeholder="Nacionalidad" required />
        </div>
        <div class="form-group">
          <label for="fechaNacimiento">Fecha de Nacimiento</label>
          <input id="fechaNacimiento" v-model="formData.fechaNacimiento" type="date" required />
        </div>
        <div class="form-group">
          <label for="curso">Curso</label>
          <input id="curso" v-model="formData.curso" placeholder="Curso" required />
        </div>
        <div class="form-group">
          <label for="edad">Edad</label>
          <input id="edad" v-model.number="formData.edad" type="number" min="0" placeholder="Edad" required />
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" v-model="formData.problemasDiscapacidad" />
            Problemas de Discapacidad
          </label>
        </div>
        <div class="form-group">
          <label for="problemasSalud">Problemas de Salud</label>
          <input id="problemasSalud" v-model="formData.problemasSalud" placeholder="Problemas de Salud" />
        </div>
        <div class="form-group">
          <label for="tipoSangre">Tipo de Sangre</label>
          <input id="tipoSangre" v-model="formData.tipoSangre" placeholder="Tipo de Sangre" />
        </div>
        <div class="form-group">
          <label for="representanteId">Representante ID (opcional)</label>
          <input id="representanteId" v-model.number="formData.representanteId" type="number" placeholder="Representante ID" />
        </div>
        <button class="btn load-btn" type="submit">{{ isEditing ? "Actualizar" : "Agregar" }}</button>
      </form>
    </div>

    <!-- Tabla de estudiantes -->
    <div class="table-container">
      <h2>Lista de Estudiantes</h2>
      <table v-if="estudiantes.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cédula</th>
            <th>Género</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="estudiante in estudiantes" :key="estudiante.id">
            <td>{{ estudiante.id }}</td>
            <td>{{ estudiante.nombre }}</td>
            <td>{{ estudiante.cedula }}</td>
            <td>{{ estudiante.genero }}</td>
            <td>{{ estudiante.edad }}</td>
            <td>
              <button class="btn edit-btn" @click="editEstudiante(estudiante)">Editar</button>
              <button class="btn delete-btn" @click="deleteEstudiante(estudiante.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No hay estudiantes registrados.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      estudiantes: [],
      formData: {
        nombre: "",
        cedula: "",
        genero: "",
        nacionalidad: "",
        fechaNacimiento: "",
        curso: "",
        edad: null,
        problemasDiscapacidad: false,
        problemasSalud: "",
        tipoSangre: "",
        representanteId: null,
      },
      isEditing: false,
      currentId: null,
    };
  },
  methods: {
    async loadEstudiantes() {
      try {
        const response = await axios.get("http://localhost:3002/estudiantes");
        this.estudiantes = response.data;
      } catch (error) {
        console.error("Error al cargar los estudiantes:", error);
        alert("Error al cargar los estudiantes. Por favor, inténtelo de nuevo más tarde.");
      }
    },
    async createEstudiante() {
      try {
        await axios.post("http://localhost:3002/estudiantes", this.formData);
        this.resetForm();
        this.loadEstudiantes();
      } catch (error) {
        console.error("Error al crear el estudiante:", error);
        alert("No se pudo agregar el estudiante. Verifique los datos e inténtelo nuevamente.");
      }
    },
    editEstudiante(estudiante) {
      this.isEditing = true;
      this.currentId = estudiante.id;
      this.formData = { ...estudiante };
    },
    async updateEstudiante() {
      try {
        await axios.put(`http://localhost:3002/estudiantes/${this.currentId}`, this.formData);
        this.isEditing = false;
        this.resetForm();
        this.loadEstudiantes();
      } catch (error) {
        console.error("Error al actualizar el estudiante:", error);
        alert("No se pudo actualizar el estudiante. Inténtelo nuevamente.");
      }
    },
    async deleteEstudiante(id) {
      if (!confirm("¿Está seguro de que desea eliminar este estudiante?")) return;
      try {
        await axios.delete(`http://localhost:3002/estudiantes/${id}`);
        this.loadEstudiantes();
      } catch (error) {
        console.error("Error al eliminar el estudiante:", error);
        alert("No se pudo eliminar el estudiante. Inténtelo nuevamente.");
      }
    },
    resetForm() {
      this.formData = {
        nombre: "",
        cedula: "",
        genero: "",
        nacionalidad: "",
        fechaNacimiento: "",
        curso: "",
        edad: null,
        problemasDiscapacidad: false,
        problemasSalud: "",
        tipoSangre: "",
        representanteId: null,
      };
      this.isEditing = false;
      this.currentId = null;
    },
  },
  mounted() {
    this.loadEstudiantes();
  },
};
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  margin: 0 auto;
  max-width: 900px;
  padding: 20px;
}
.title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}
.form-container {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}
input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.btn {
  display: inline-block;
  padding: 10px 15px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
}
.btn:hover {
  background-color: #0056b3;
}
.load-btn {
  margin-bottom: 10px;
}
.edit-btn {
  background-color: #ffc107;
  color: #fff;
  border: none;
}
.edit-btn:hover {
  background-color: #e0a800;
}
.delete-btn {
  background-color: #dc3545;
  color: #fff;
  border: none;
}
.delete-btn:hover {
  background-color: #c82333;
}
.table-container {
  overflow-x: auto;
  margin-top: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
}
thead {
  background-color: #f4f4f4;
}
th, td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}
th {
  background-color: #007BFF;
  color: #fff;
  font-weight: bold;
}
tr {
  transition: background-color 0.2s ease-in-out;
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}
tr:hover {
  background-color: #f1f1f1;
}
</style>
