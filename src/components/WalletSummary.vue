<template>
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
export default {
  name: "WalletSummary",
  props: {
    rewards: Object,
    delegations: Object,
    balances: Object,
    total: Number,
  },
  components: {},
  methods: {},
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
