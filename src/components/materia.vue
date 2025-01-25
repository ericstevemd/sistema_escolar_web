<template>
    <div>
      <h1>Lista de Materias</h1>
      <ul>
        <li v-for="materia in materias" :key="materia.nombreMateria">
          {{ materia.nombreMateria }} - Profesor ID: {{ materia.profesorId }}
          <span v-if="materia.fecha">{{ formatDate(materia.fecha) }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        materias: [],  // Almacenará los datos de las materias
      };
    },
    mounted() {
      // Método que se ejecuta cuando el componente se ha montado
      this.obtenerMaterias();
    },
    methods: {
      obtenerMaterias() {
        // Llamada a la API externa
        fetch("http://158.220.124.141:3002/materias")
          .then((response) => response.json())  // Convertir la respuesta en JSON
          .then((data) => {
            this.materias = data;  // Almacenar los datos en el array de materias
          })
          .catch((error) => {
            console.error("Error al obtener los datos de las materias:", error);
          });
      },
      formatDate(dateString) {
        // Crear un objeto Date con la cadena proporcionada
        const date = new Date(dateString);
  
        // Extraer el día, mes y año
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
        const year = date.getFullYear();
  
        // Formatear la fecha como "DD/MM/YYYY"
        return `${day}/${month}/${year}`;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Aquí puedes agregar estilos CSS personalizados si lo deseas */
  </style>
  