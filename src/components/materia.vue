<template>
    <div>
      <h1>Lista de Materias</h1>
  
      <!-- Formulario para agregar una nueva materia -->
      <form @submit.prevent="agregarMateria">
        <div>
          <label for="nombreMateria">Nombre de la Materia:</label>
          <input
            type="text"
            id="nombreMateria"
            v-model="nuevaMateria.nombreMateria"
            required
          />
        </div>
        <div>
          <label for="profesorId">ID del Profesor:</label>
          <input
            type="number"
            id="profesorId"
            v-model="nuevaMateria.profesorId"
            required
          />
        </div>
        <button type="submit">Agregar Materia</button>
      </form>
  
      <!-- Lista de materias -->
      <ul>
        <li v-for="materia in materias" :key="materia.nombreMateria">
          {{ materia.nombreMateria }} - Profesor ID: {{ materia.profesorId }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "ListaMaterias",
    data() {
      return {
        materias: [], // Almacenará los datos de las materias
        nuevaMateria: {
          nombreMateria: "", // Nombre de la nueva materia
          profesorId: null, // ID del profesor de la nueva materia
        },
      };
    },
    mounted() {
      // Método que se ejecuta cuando el componente se ha montado
      this.obtenerMaterias();
    },
    methods: {
      obtenerMaterias() {
        // Llamada a la API externa para obtener las materias
        fetch("http://158.220.124.141:3002/materias")
          .then((response) => response.json()) // Convertir la respuesta en JSON
          .then((data) => {
            console.log("Datos recibidos:", data); // Muestra los datos recibidos en consola
            this.materias = data; // Almacenar los datos en el array de materias
          })
          .catch((error) => {
            console.error("Error al obtener los datos de las materias:", error);
          });
      },
      agregarMateria() {
        // Llamada a la API externa para agregar una nueva materia
        fetch("http://158.220.124.141:3002/materias", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.nuevaMateria), // Enviar la nueva materia como JSON
        })
          .then((response) => {
            if (response.ok) {
              console.log("Materia agregada con éxito");
              this.obtenerMaterias(); // Volver a cargar la lista de materias
              this.nuevaMateria = { nombreMateria: "", profesorId: null }; // Limpiar el formulario
            } else {
              console.error("Error al agregar la materia");
            }
          })
          .catch((error) => {
            console.error("Error en la solicitud de agregar materia:", error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados */
  form {
    margin-bottom: 20px;
  }
  
  form div {
    margin-bottom: 10px;
  }
  
  button {
    padding: 5px 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 5px;
  }
  </style>
  