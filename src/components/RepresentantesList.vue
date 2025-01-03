<template>
  <div class="container">
    <h1 class="title"> Ficha Representante</h1>

    <!-- Formulario para agregar un nuevo representante -->
    <div v-if="!isEditing">
      <h2>Nuevo Representante</h2>
      <form  class="form-container" @submit.prevent="createRepresentante">
        <div class="form-group">
        <label for="Nombre">Nombre</label>
        <input v-model="newRepresentante.nombre" @input="logField('nombre')" placeholder="Nombre" required />
      </div>
        <div class="form-group">
        <label for="Apellido">Apellido</label>
        <input v-model="newRepresentante.apellido" @input="logField('apellido')" placeholder="Apellido" required />
      </div>
        <div class="form-group">       
        <label for="Cédula">Cédula</label>
        <input v-model="newRepresentante.cedula" placeholder="Cédula" required />
        </div> 
        <div class="form-group">     
        <label for="Nacionalidad">Nacionalidad</label>
        <input v-model="newRepresentante.nacionalidad" placeholder="Nacionalidad" required />
         </div>  
         <div class="form-group">      
        <label for="Ciudad">Ciudad</label>
        <input v-model="newRepresentante.ciudad" placeholder="Ciudad" required />
         </div> 
        <div class="form-group">
          <label for="Correo">Correo</label>
         <input v-model="newRepresentante.correo" type="email" placeholder="Correo" required />
        </div>       
        <div class="form-group"></div>      
        <label for="Dirección">Dirección</label>
        <input v-model="newRepresentante.direccion_Domicilio" placeholder="Dirección" required />
       <div class="form-group">  
        <label for="Foto">Foto</label>
        <input v-model="newRepresentante.foto" placeholder="Foto" required />
        </div>   
        <div class="form-group">   
        <label for="Celular">Celular</label>
        <input v-model="newRepresentante.numeroCelular1" placeholder="Celular 1" required />
        </div>
       <div class="form-group">   
        <label for="Celular">Celular</label>
        <input v-model="newRepresentante.numeroCelular2" placeholder="Celular 2" required />
        </div>   
        <div class="form-group">     
        <label for="Celular">Celular</label>
         <input v-model="newRepresentante.numeroCelular3" placeholder="Celular 3" required />
       </div>  
       <div class="form-group">
        <label for="Género">Género</label>  
        <input v-model="newRepresentante.genero" placeholder="Género" required />
        </div>
       <div class="form-group">   
        <label for="Cantidad Representados">Cantidad Representados</label>
        <input v-model="newRepresentante.cantidadRepresentados" type="number" placeholder="Cantidad Representados" required />
        </div>  
        <div class="form-group">  
        <label for="Personas No Autorizadas">Personas No Autorizadas</label>
        <input v-model="newRepresentante.personasNoAutorizadas" placeholder="Personas No Autorizadas" required />
      </div>  
        <button type="submit"  class="btn" >Agregar Representante</button>
      </form>
    </div>

    <!-- Formulario para editar un representante -->
    <div v-if="isEditing">
      <h2>Editar Representante</h2>
      <form  class="form-container"  @submit.prevent="updateRepresentante">
        <div class="form-group">  
        <label for="Nombre">Nombre</label>
        <input v-model="currentRepresentante.nombre" placeholder="Nombre" required />
        </div>
        <div class="form-group"> 
        <label for="Apellido">Apellido</label>
        <input v-model="currentRepresentante.apellido" placeholder="Apellido" required />
      </div>
      <div class="form-group"> 
        <label for="Cédula">Cédula</label>
        <input v-model="currentRepresentante.cedula" placeholder="Cédula" required />
      </div>
      <div class="form-group"> 
        <label for="Nacionalidad">Nacionalidad</label>
        <input v-model="currentRepresentante.nacionalidad" placeholder="Nacionalidad" required />
      </div>
      <div class="form-group"> 
        <label for="Ciudad">Ciudad</label>
        <input v-model="currentRepresentante.ciudad" placeholder="Ciudad" required />
      </div>
      <div class="form-group"> 
        <label for="Correo">Correo</label>
        <input v-model="currentRepresentante.correo" type="email" placeholder="Correo" required />
      </div>
      <div class="form-group"> 
        <label for="Dirección">Dirección</label>
        <input v-model="currentRepresentante.direccion_Domicilio" placeholder="Dirección" required />
      </div>
      <div class="form-group"> 
        <label for="Foto">Foto</label>
        <input v-model="currentRepresentante.foto" placeholder="Foto" required />
      </div>
      <div class="form-group"> 
        <label for="Celular 1">Celular 1</label>
        <input v-model="currentRepresentante.numeroCelular1" placeholder="Celular 1" required />
      </div>
      <div class="form-group"> 
        <label for="Celular 2">Celular 2</label>
        <input v-model="currentRepresentante.numeroCelular2" placeholder="Celular 2" required />
      </div>
      <div class="form-group"> 
        <label for="Celular 3">Celular 3</label>
        <input v-model="currentRepresentante.numeroCelular3" placeholder="Celular 3" required />
      </div>
      <div class="form-group"> 
        <label for="Genero ">Género</label>
        <input v-model="currentRepresentante.genero" placeholder="Género" required />
      </div>
      <div class="form-group"> 
        <label for="Cantidad Representados ">Cantidad Representados</label>
        <input v-model="currentRepresentante.cantidadRepresentados" type="number" placeholder="Cantidad Representados" required />
      </div>
      <div class="form-group"> 
        <label for="Personas No Autorizadas ">Personas No Autorizadas</label>
        <input v-model="currentRepresentante.personasNoAutorizadas" placeholder="Personas No Autorizadas" required />
      </div>
        <button type="submit"  class="btn">Actualizar Representante</button>
      </form>
    </div>
    <div v-if="errorMessage">
  <p style="color: red;">{{ errorMessage }}</p>
</div>
<input v-model="searchQuery" placeholder="Buscar representante..." />
<div class="buttons">
      <button class="btn load-btn" @click="loadRepresentantes">Cargar Representantes</button>
      <br/>

      <button class="btn load-btn" @click="descargarPDF">Descargar PDF</button>
    </div>


    <div class="table-container">
     <table v-if="representantes.length">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cédula</th>
            <th>Nacionalidad</th>
            <th>Ciudad</th>
            <th>Correo</th>
            <th>Dirección</th>
            <th>Celular 1</th>
            <th>Celular 2</th>
            <th>Celular 3</th>
            <th>Género</th>
            <th>Cantidad Representados</th>
            <th>Personas No Autorizadas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="representante in representantes" :key="representante.id">
            <td>{{ representante.nombre }}</td>
            <td>{{ representante.apellido }}</td>
            <td>{{ representante.cedula }}</td>
            <td>{{ representante.nacionalidad }}</td>
            <td>{{ representante.ciudad }}</td>
            <td>{{ representante.correo }}</td>
            <td>{{ representante.direccion_Domicilio }}</td>
            <td>{{ representante.numeroCelular1 }}</td>
            <td>{{ representante.numeroCelular2 }}</td>
            <td>{{ representante.numeroCelular3 }}</td>
            <td>{{ representante.genero }}</td>
            <td>{{ representante.cantidadRepresentados }}</td>
            <td>{{ representante.personasNoAutorizadas }}</td>
            <td>
              <button class="btn edit-btn" @click="editRepresentante(representante)">Editar</button>
              <button class="btn delete-btn" @click="removeRepresentante(representante.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="errorMessage">
      <p>{{ errorMessage }}</p>
    </div>
  </div>

</template>

<script>
import { representantesService } from '../services/representantesService';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default {
  data() {
    return {
      representantes: [],
      newRepresentante: {
        nombre: '',
        apellido: '',
        cedula: '',
        nacionalidad: '',
        ciudad: '',
        correo: '',
        direccion_Domicilio: '',
        foto: '',
        numeroCelular1: '',
        numeroCelular2: '',
        numeroCelular3: '',
        genero: '',
        cantidadRepresentados: '',
        personasNoAutorizadas: '',
      },
     currentRepresentante: null, // Para mantener el representante que se está editando
      isEditing: false,
      errorMessage: '',
    };
  },

  methods: {
    logField(fieldName) {
    console.log(`Campo actualizado: ${fieldName}`, this.newRepresentante[fieldName]);

  },
    onFormSubmit() {
    console.log('Datos actuales antes de enviar:', this.newRepresentante);
    this.updateRepresentante();
  },

    validateFields(obj) {
    return Object.values(obj).every(value => value !== '');
  },

    async loadRepresentantes() {
      try {
        const response = await representantesService.getAll();
        this.representantes = response.data;
      } catch (error) {
        this.errorMessage = 'Hubo un error al cargar los representantes.';
        this.clearErrorMessage();
      }
    },
    async createRepresentante() {

      // Validación frontend
      if (!this.newRepresentante.nombre || !this.newRepresentante.apellido || !this.newRepresentante.cedula ||
          !this.newRepresentante.nacionalidad || !this.newRepresentante.ciudad || !this.newRepresentante.correo ||
          !this.newRepresentante.direccion_Domicilio || !this.newRepresentante.foto || !this.newRepresentante.numeroCelular1 ||
          !this.newRepresentante.numeroCelular2 || !this.newRepresentante.numeroCelular3 || !this.newRepresentante.genero ||
          !this.newRepresentante.cantidadRepresentados || !this.newRepresentante.personasNoAutorizadas) {
        this.errorMessage = 'Por favor, complete todos los campos.';
        this.clearErrorMessage();
        return;
      }

      try {
        await representantesService.create(this.newRepresentante);
     
        this.loadRepresentantes();
        this.newRepresentante = {
          nombre: '',
          apellido: '',
          cedula: '',
          nacionalidad: '',
          ciudad: '',
          correo: '',
          direccion_Domicilio: '',
          foto: '',
          numeroCelular1: '',
          numeroCelular2: '',
          numeroCelular3: '',
          genero: '',
          cantidadRepresentados: 0,
          personasNoAutorizadas: ''
        };
      } catch (error) {
        this.errorMessage = 'Error al agregar el representante.';
        this.clearErrorMessage();
      }
    },
    async editRepresentante(representante) {
    if (!representante || typeof representante !== 'object') {
        console.error('Representante inválido o no definido.');
        return;
    }

    try {
        this.isEditing = true; 
        this.currentRepresentante = { ...representante }; // Clonar los datos del representante para evitar referencias directas

        // Opcional: Agregar lógica adicional, como cargar datos del servidor si es necesario
        console.log('Representante listo para edición:', this.currentRepresentante);
    } catch (error) {
        console.error('Error al iniciar la edición del representante:', error);
    }
},
async updateRepresentante() {
 // console.log('Datos del nuevo representante antes de validar:', this.newRepresentante);

      if (!this.newRepresentante.nombre.trim()  ||
         !this.newRepresentante.apellido.trim() ||
         !this.newRepresentante.cedula.trim()  ||
         !this.newRepresentante.nacionalidad.trim() || 
         !this.newRepresentante.ciudad.trim() || 
         !this.newRepresentante.correo.trim()  ||
         !this.newRepresentante.direccion_Domicilio.trim()  ||
         !this.newRepresentante.foto.trim()  || 
         !this.newRepresentante.numeroCelular1.trim()  ||
         !this.newRepresentante.numeroCelular2.trim()  ||
         !this.newRepresentante.numeroCelular3.trim() ||
         !this.newRepresentante.genero.trim()  ||
         !this.newRepresentante.cantidadRepresentados.trim()  || 
         !this.newRepresentante.personasNoAutorizadas.trim() ) {

        this.errorMessage = 'Por favor, complete todos los campos.';
        this.clearErrorMessage();
        return;
      }

  try {
    console.log('Enviando datos al servicio:', this.currentRepresentante);

    await representantesService.update(this.currentRepresentante.id, this.currentRepresentante);
  
    this.isEditing = false;
    this.loadRepresentantes();
    this.currentRepresentante = null; // Limpiar el formulario de edición
  } catch (error) {
    this.errorMessage =
      error.response?.data?.message || 'Error al actualizar el representante.';
    this.clearErrorMessage();
  }
}, 


/* async updateRepresentante() {
    if (!this.currentRepresentante.nombre || 
        !this.currentRepresentante.apellido || 
        !this.currentRepresentante.cedula || 
        !this.currentRepresentante.nacionalidad || 
        !this.currentRepresentante.ciudad || 
        !this.currentRepresentante.correo || 
        !this.currentRepresentante.direccion_Domicilio || 
        !this.currentRepresentante.foto || 
        !this.currentRepresentante.numeroCelular1 || 
        !this.currentRepresentante.numeroCelular2 || 
        !this.currentRepresentante.numeroCelular3 || 
        !this.currentRepresentante.genero || 
        !this.currentRepresentante.cantidadRepresentados || 
        !this.currentRepresentante.personasNoAutorizadas) {
        this.errorMessage = 'Por favor, complete todos los campos.';
        this.clearErrorMessage();
        return;
    }
    try {
        await representantesService.update(this.currentRepresentante.id, this.currentRepresentante);
        this.isEditing = false;
        this.loadRepresentantes();
        this.currentRepresentante = null; // Limpia el formulario de edición
    } catch (error) {
        this.errorMessage = 'Error al actualizar el representante.';
        this.clearErrorMessage();
    }
}, */

    async removeRepresentante(id) {
      try {
        await representantesService.delete(id);
        this.loadRepresentantes();
      } catch (error) {
        this.errorMessage = 'Error al eliminar el representante.';
        this.clearErrorMessage();
      }
    },
    clearErrorMessage() {
      setTimeout(() => {
        this.errorMessage = '';
      }, 5000); // El mensaje de error desaparece después de 5 segundos
    }
  },
  computed: {
    filteredRepresentantes() {
        return this.representantes.filter(r => 
            r.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            r.apellido.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            r.cedula.includes(this.searchQuery)
        );
    }
},
descargarPDF() {
    const doc = new jsPDF();
    doc.text("Reporte de Representantes", 20, 10);

    const columns = ["#", "Nombre", "Apellido", "Cédula", "Ciudad", "Género"];
    const rows = this.representantes.map((representante, index) => [
        index + 1,
        representante.nombre,
        representante.apellido,
        representante.cedula,
        representante.ciudad,
        representante.genero
    ]);

    autoTable(doc, {
        startY: 20,
        head: [columns],
        body: rows,
    });

    doc.save("Reporte_de_representantes.pdf");
}


     }
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
