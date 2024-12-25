<template>
  <div class="charts-container">
    <!-- Gráfico Circular de Rendimiento -->
    <div>
      <h3>Rendimiento</h3>
      <canvas ref="rendimientoChart"></canvas>
    </div>

    <!-- Gráfico de Barras de Materias -->
    <div>
      <h3>Materias y Observaciones</h3>
      <canvas ref="materiasChart"></canvas>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: "Charts",
  setup() {
    const rendimientoChart = ref(null);
    const materiasChart = ref(null);

    // Datos de los gráficos
    const datosRendimiento = [30, 70]; // Ejemplo: 30% completado, 70% pendiente
    const datosMaterias = {
      labels: ["Matemáticas", "Sociales", "Inglés"],
      tareas: [5, 4, 4], // Cantidad de tareas
    };

    // Gráfico Circular (Rendimiento)
    const renderRendimientoChart = () => {
      new Chart(rendimientoChart.value, {
        type: "doughnut",
        data: {
          labels: ["Completado", "Pendiente"],
          datasets: [
            {
              data: datosRendimiento,
              backgroundColor: ["#FF6384", "#36A2EB"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true, position: "bottom" },
          },
        },
      });
    };

    // Gráfico de Barras (Materias)
    const renderMateriasChart = () => {
      new Chart(materiasChart.value, {
        type: "bar",
        data: {
          labels: datosMaterias.labels,
          datasets: [
            {
              label: "Tareas",
              data: datosMaterias.tareas,
              backgroundColor: ["#FFCE56", "#FF6384", "#36A2EB"],
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    };

    onMounted(() => {
      renderRendimientoChart();
      renderMateriasChart();
    });

    return { rendimientoChart, materiasChart };
  },
};
</script>

<style scoped>
.charts-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

canvas {
  max-width: 300px;
  max-height: 300px;
}
</style>
