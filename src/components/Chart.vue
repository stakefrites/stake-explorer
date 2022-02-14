<template>
  <div class="container">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "Chart",
  props: {
    chartData: Object,
  },
  mounted() {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, { type: "pie", data: this.chartData });
  },
};
</script>
