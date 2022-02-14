import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    selectedChain: null,
    currentValidator: null,
    chains: [
      { label: "Akash", name: "akash" },
      { label: "Chihuahua", name: "chihuahua" },
      { label: "Lum Network", name: "lum" },
    ],
    avatars: {},
    loading: false,
    validators: [],
    transactions: [],
    delegations: { delegation_responses: [] },
    rewards: {},
    balances: { result: [] },
    total: 0,
  },
  getters: {
    getSelectedChain: (state) => state.selectedChain,
    getChains: (state) => state.chains,
    getValidators: (state) => state.validators,
    getValidator: (state) => state.currentValidator,
    getAvatarById: (state) => (id) => state.avatars[id],
    getLoadingStatus: (state) => state.loading,
    getTransactions: (state) => state.transactions,
    getRewards: (state) => state.rewards,
    getDelegations: (state) => state.delegations,
    getBalances: (state) => state.balances,
    getTotal: (state) => state.total,
    getSingleValidator: (state) => (address) => {
      return state.validators.find(
        (validator) => validator.operator_address === address
      );
    },
  },
  mutations: {
    setValidators: (state, validators) => (state.validators = validators),
    cacheAvatar(state, args) {
      state.avatars[args.identity] = args.url;
    },
    setCurrentValidator: (state, validator) =>
      (state.currentValidator = validator),
    setSelectedChain: (state, chain) => (state.selectedChain = chain),
    setLoading: (state, status) => (state.loading = status),
    setTransactions: (state, transactions) =>
      (state.transactions = transactions),
    setRewards: (state, rewards) => (state.rewards = rewards),
    setDelegations: (state, delegations) => (state.delegations = delegations),
    setBalances: (state, balances) => (state.balances = balances),
    setTotal: (state, total) => (state.total = total),
  },
  actions: {
    async fetchValidators({ commit, state }) {
      commit("setLoading", true);
      const response = await axios.get(
        "http://127.0.0.1:3000/" + state.selectedChain + "/validators"
      );
      commit("setValidators", response.data.result);

      commit("setLoading", false);
    },
    async fetchSingleValidator({ commit, state }) {
      const response = await axios.get(
        "http://127.0.0.1:3000/" + state.selectedChain + "/validators"
      );

      commit("setValidator", response.data.result);
    },
    setSelectedChain({ commit }, chain) {
      commit("setSelectedChain", chain);
    },
    async fetchTransactions({ commit, state }, address) {
      commit("setLoading", true);
      const response = await axios.get(
        "http://127.0.0.1:3000/" +
          state.selectedChain +
          "/transactions/" +
          address
      );
      commit("setTransactions", response.data.txs.reverse());
      commit("setLoading", false);
    },
    async fetchRewards({ commit, state }, address) {
      commit("setLoading", true);
      const response = await axios.get(
        "http://127.0.0.1:3000/" + state.selectedChain + "/rewards/" + address
      );
      commit("setRewards", response.data);
      commit("setLoading", false);
    },
    async fetchDelegations({ commit, state }, address) {
      commit("setLoading", true);
      const response = await axios.get(
        "http://127.0.0.1:3000/" +
          state.selectedChain +
          "/delegations/" +
          address
      );
      let total = response.data.delegation_responses
        .map((el) => parseFloat(el.balance.amount))
        .reduce((prev, curr) => prev + curr);
      commit("setDelegations", {
        ...response.data,
        total: {
          amount: total,
          denom: response.data.delegation_responses[0].balance.denom,
        },
      });
      commit("setLoading", false);
    },
    async fetchBalances({ commit, state }, address) {
      commit("setLoading", true);
      const response = await axios.get(
        "http://127.0.0.1:3000/" + state.selectedChain + "/balances/" + address
      );
      commit("setBalances", response.data);
      commit("setLoading", false);
    },
    async fetchTotalWallet({ commit, state }, address) {
      commit("setLoading", true);

      // -------------------------------
      // Fetch balances
      // -------------------------------
      const balances = await axios.get(
        "http://127.0.0.1:3000/" + state.selectedChain + "/balances/" + address
      );
      commit("setBalances", balances.data);

      // -------------------------------
      // Fetch delegations
      // -------------------------------
      const delegations = await axios.get(
        "http://127.0.0.1:3000/" +
          state.selectedChain +
          "/delegations/" +
          address
      );
      let total = delegations.data.delegation_responses
        .map((el) => parseFloat(el.balance.amount))
        .reduce((prev, curr) => prev + curr);
      commit("setDelegations", {
        ...delegations.data,
        total: {
          amount: total,
          denom: delegations.data.delegation_responses[0].balance.denom,
        },
      });

      // -------------------------------
      // Fetch rewards
      // -------------------------------
      const rewards = await axios.get(
        "http://127.0.0.1:3000/" + state.selectedChain + "/rewards/" + address
      );
      commit("setRewards", rewards.data);

      // -------------------------------
      // Fetch all transactions
      // -------------------------------
      const transactions = await axios.get(
        "http://127.0.0.1:3000/" +
          state.selectedChain +
          "/transactions/" +
          address
      );
      commit("setTransactions", transactions.data.txs.reverse());
      // -------------------------------
      // Calculate total
      // -------------------------------
      let all =
        total +
        parseFloat(rewards.data.total[0].amount) +
        parseFloat(balances.data.result[0].amount);
      console.log(rewards.data.total[0].amount);
      commit("setTotal", all);

      commit("setLoading", false);
    },
  },
  modules: {},
});
