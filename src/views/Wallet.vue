<template>
  <div class="container">
    <div class="header">
      <b-form>
        <div class="row">
          <label class="col-form-label" for="inline-form-input-name"
            >Enter your wallet address</label
          >
          <b-form-input
            id="inline-form-input-name"
            class="mb-2 mr-sm-2 mb-sm-0"
            :placeholder="
              getSelectedChain + '1z98tqqgeq2zp060dugur5xmr9al3ch499g2wm7'
            "
            v-model="address"
          ></b-form-input>
        </div>
        <b-button v-on:click="getData" variant="primary">Save</b-button>
      </b-form>
    </div>

    <div class="response">
      <div v-if="getLoadingStatus"><b-spinner></b-spinner></div>
      <div v-if="getLoadingStatus == false && getTransactions.length > 0">
        <b-card>Total transactions: {{ getTransactions.length }} </b-card>
        <WalletSummary
          :rewards="getRewards"
          :balances="getBalances"
          :delegations="getDelegations"
          :total="getTotal"
        />
        <TransactionList :transactions="getTransactions" />
      </div>
    </div>
  </div>
</template>

<script>
import TransactionList from "@/components/TransactionList.vue";
import WalletSummary from "@/components/WalletSummary.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Wallet",
  props: {
    value: String,
  },
  data() {
    return {
      address: "akash1z98tqqgeq2zp060dugur5xmr9al3ch499g2wm7",
    };
  },
  components: { TransactionList, WalletSummary },
  methods: {
    ...mapActions(["fetchTotalWallet"]),
    getData() {
      this.fetchTotalWallet(this.address);
    },
  },
  computed: {
    ...mapGetters([
      "getTransactions",
      "getLoadingStatus",
      "getSelectedChain",
      "getRewards",
      "getDelegations",
      "getBalances",
      "getTotal",
    ]),
  },
};
</script>

<style scoped></style>
