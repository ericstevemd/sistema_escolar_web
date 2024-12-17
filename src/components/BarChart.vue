<template>
    <div>
      <canvas ref="barChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  
  export default {
    name: 'BarChart',
    data() {
      return {
        chartInstance: null,
      };
    },
    mounted() {
      Chart.register(...registerables);
      this.renderChart();
    },
    methods: {
      renderChart() {
        const ctx = this.$refs.barChart.getContext('2d');
        this.chartInstance = new Chart(ctx, {
          type: 'bar', // Tipo de gráfico
          data: {
            labels: ['Matemáticas', 'Sociales', 'Inglés'],
            datasets: [
              {
                label: 'Rendimiento',
                data: [50, 30, 20], // Datos de ejemplo
                backgroundColor: ['#FF5733', '#8E44AD', '#3498DB'],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: true, position: 'top' },
              tooltip: { enabled: true },
            },
          },
        });
      },
    },
    beforeUnmount() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
    },
  };
  </script>
  
  <style scoped>
  canvas {
    max-width: 100%;
  }
  </style>
  