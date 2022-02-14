<template>
  <div class="container">
    <p>HOME</p>
    <Chart></Chart>
  </div>
</template>

<script>
import Chart from "@/components/Chart.vue";
export default {
  name: "Home",
  props: {
    value: String,
  },
  data() {},
  components: { Chart },
  methods: {},
  computed: {},
};
</script>

<style scoped></style>
