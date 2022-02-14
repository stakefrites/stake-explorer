<template>
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th scope="col">Tx Hash</th>
        <th scope="col">Height</th>
        <th scope="col">Gas</th>
        <th scope="col">Type</th>
        <th scope="col">Fee</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(tx, i) in transactions" :key="tx.txhash">
        <th scope="row">{{ i + 1 }}</th>
        <td>{{ reduce(tx.txhash) }}</td>
        <td>{{ tx.height }}</td>
        <td>{{ tx.gas_used }}/{{ tx.gas_wanted }}</td>
        <td>{{ tx.tx.type }}</td>
        <td>
          {{ tx.tx.value.fee.amount[0].amount }}
          {{ tx.tx.value.fee.amount[0].denom }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
//import { mapGetters } from "vuex";
const reduce = (hash) => {
  return hash.slice(0, 10) + "..." + hash.slice(hash.length - 10);
};

export default {
  name: "ValidatorList",
  props: {
    transactions: Array,
  },
  methods: { reduce },
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
