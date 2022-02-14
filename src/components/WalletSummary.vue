<template>
  <div><Chart :chartData="chartData"></Chart></div>
  <b-card>
    <p>
      Rewards:
      {{ (parseFloat(rewards.total[0].amount) / 1000000).toFixed(2) }}

      {{ rewards.total[0].denom.substring(1) }}
    </p>
    <p v-if="delegations.delegation_responses.length > 0">
      Staked:
      {{ (parseFloat(delegations.total.amount) / 1000000).toFixed(2) }}

      {{ delegations.total.denom.substring(1) }}
    </p>
    <p v-if="balances.result.length > 0">
      Available:
      {{ (parseFloat(balances.result[0].amount) / 1000000).toFixed(2) }}

      {{ balances.result[0].denom.substring(1) }}
    </p>
    <p v-if="balances.result.length > 0">
      Total:
      {{ (total / 1000000).toFixed(2) }}

      {{ balances.result[0].denom.substring(1) }}
    </p>
  </b-card>
</template>

<script>
import Chart from "@/components/Chart.vue";
export default {
  name: "WalletSummary",
  props: {
    rewards: Object,
    delegations: Object,
    balances: Object,
    total: Number,
  },
  components: { Chart },
  methods: {},
  mounted() {
    console.log(this.rewards);
  },
  computed: {
    chartData: function () {
      return {
        labels: ["Staked", "Available", "Rewards"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 5,
          },
        ],
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
