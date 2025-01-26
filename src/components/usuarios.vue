<template>
  <div class="container">
    <h1>Gestionar Usuarios</h1>

    <!-- Crear Usuario -->
    <form @submit.prevent="createUser" class="form">
      <div class="form-group">
        <label for="cedula">Cédula:</label>
        <input
          type="text"
          v-model="user.cedula"
          id="cedula"
          required
          :class="{ invalid: errors.cedula }"
        />
        <span v-if="errors.cedula" class="error">{{ errors.cedula }}</span>
      </div>

      <div class="form-group">
        <label for="email">Correo:</label>
        <input
          type="email"
          v-model="user.correo"
          id="email"
          required
          :class="{ invalid: errors.email }"
        />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input
          type="password"
          v-model="user.password"
          id="password"
          required
          :class="{ invalid: errors.password }"
        />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
      </div>

      <div class="form-group">
        <label for="rol">Rol:</label>
        <select
          v-model="user.rol"
          id="rol"
          required
          :class="{ invalid: errors.rol }"
        >
          <option value="" disabled>Seleccionar rol</option>
          <option value="PROFESOR">Profesor</option>
          <option value="REPRESENTANTE">Estudiante</option>
          <option value="ADMIN">Administrador</option>
        </select>
        <span v-if="errors.rol" class="error">{{ errors.rol }}</span>
      </div>

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? "Creando..." : "Crear Usuario" }}
      </button>
    </form>

    <!-- Mensaje de estado -->
    <p v-if="message" :class="{ success, error: !success }">
      {{ message }}
    </p>

    <!-- Lista de Usuarios -->
    <h2>Usuarios Registrados</h2>
    <ul>
      <li v-for="usuario in usuarios" :key="usuario.id">
        {{ usuario.cedula }} - {{ usuario.correo }} - {{ usuario.rol }}
        <button @click="editUser(usuario)">Editar</button>
        <button @click="deleteUser(usuario.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GestionarUsuarios",
  data() {
    return {
      user: {
        cedula: "",
        correo: "",
        password: "",
        rol: "",
        sesionIniciada: true,  // Asignado como booleano
        isDeleted: false,      // Asignado como booleano
      },
      usuarios: [],
      message: "",
      success: false,
      isSubmitting: false,
      errors: {},
      api: axios.create({
        baseURL: "http://158.220.124.141:3002/",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    };
  },
  mounted() {
    this.fetchUsers(); // Cargar usuarios al inicio
  },
  methods: {
    async createUser() {
  this.resetMessages();
  if (!this.validateForm()) return;

  this.isSubmitting = true;
  try {
    await this.api.post("/usuario", this.user);
    this.message = `Usuario creado exitosamente: ${this.user.cedula}`;
    this.success = true;
    this.resetForm();
    this.fetchUsers(); // Actualizar lista de usuarios
  } catch (error) {
    this.handleApiError(error);
    this.success = false;
  } finally {
    this.isSubmitting = false;
  }
},
    async fetchUsers() {
      try {
        const response = await this.api.get("/usuarios");
        this.usuarios = response.data.data; // Acceder a los usuarios
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    },
    editUser(usuario) {
      this.user = { ...usuario }; // Cargar datos en el formulario para editar
    },
    async updateUser() {
      if (!this.validateForm()) return;
      this.isSubmitting = true;
      try {
        await this.api.put(`/usuario/${this.user.id}`, this.user);
        this.message = `Usuario actualizado: ${this.user.cedula}`;
        this.success = true;
        this.resetForm();
        this.fetchUsers();
      } catch (error) {
        this.handleApiError(error);
        this.success = false;
      } finally {
        this.isSubmitting = false;
      }
    },
    async deleteUser(id) {
      if (confirm("¿Estás seguro de eliminar este usuario?")) {
        try {
          await this.api.delete(`/usuario/${id}`);
          this.message = `Usuario eliminado: ${id}`;
          this.success = true;
          this.fetchUsers();
        } catch (error) {
          this.handleApiError(error);
          this.success = false;
        }
      }
    },
    validateForm() {
      this.errors = {};
      if (!this.user.cedula) this.errors.cedula = "La cédula es obligatoria.";
      if (!this.user.correo) this.errors.email = "El correo es obligatorio.";
      else if (!this.validateEmail(this.user.correo)) this.errors.email = "El correo no es válido.";
      if (!this.user.password) this.errors.password = "La contraseña es obligatoria.";
      else if (this.user.password.length < 6) this.errors.password = "Debe tener al menos 6 caracteres.";
      if (!this.user.rol) this.errors.rol = "El rol es obligatorio.";
      return Object.keys(this.errors).length === 0;
    },
    validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },
    resetMessages() {
      this.message = "";
      this.success = false;
      this.errors = {};
    },
    resetForm() {
      this.user = {
        cedula: "",
        correo: "",
        password: "",
        rol: "",
      };
    },
    handleApiError(error) {
      if (error.response?.data && Array.isArray(error.response.data)) {
        error.response.data.forEach((errMsg) => {
          if (errMsg.includes("correo")) {
            this.errors.email = this.formatError(errMsg, "Correo");
          }
        });
      } else {
        this.message = error.response?.data?.message || "Ocurrió un error al intentar crear el usuario.";
      }
    },
    formatError(message, field) {
      return `${field}: ${message}`;
    },
  },
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
}@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>