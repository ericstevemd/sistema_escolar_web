<template>
    <div>
      <h1>Courses</h1>
      <ul>
        <li v-for="course in courses" :key="course.id">{{ course.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "CursoComponet", 
    data() {
        
      return {
        courses: []
      };
    },
    created() {
      fetch('http://158.220.124.141:3002/curso')
        .then(response => response.json())
        .then(data => {
          this.courses = data;
        })
        .catch(error => console.error('Error fetching courses:', error));
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  