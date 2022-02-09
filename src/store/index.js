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
  },
  getters: {
    getSelectedChain: (state) => state.selectedChain,
    getChains: (state) => state.chains,
    getValidators: (state) => state.validators,
    getValidator: (state) => state.currentValidator,
    getAvatarById: (state) => (id) => state.avatars[id],
    getLoadingStatus: (state) => state.loading,
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
  },
  actions: {
    async fetchValidators({ commit }) {
      commit("setLoading", true);
      const response = await axios.get(
        "http://127.0.0.1:3000/akash/validators"
      );
      commit("setValidators", response.data.result);

      commit("setLoading", false);
    },
    async fetchSingleValidator({ commit }) {
      const response = await axios.get(
        "http://127.0.0.1:3000/akash/validators"
      );

      commit("setValidator", response.data.result);
    },
    setSelectedChain({ commit }, chain) {
      commit("setSelectedChain", chain);
    },
  },
  modules: {},
});
