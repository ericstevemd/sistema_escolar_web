<template>
    <div>
      <h1>Gráfico de Rendimiento</h1>
      <BarChart />
    </div>
  </template>
  
  <script>

  import barChart from './barChart.vue';
  export default {
    name: 'HomePage',
    components: {
      BarChart
    },
  };
  </script>