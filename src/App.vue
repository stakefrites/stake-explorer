<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/validators">Validators</router-link>
    <router-link to="/wallet">Wallet</router-link>

    <select v-model="selected" @change="updateValue">
      <option
        v-for="chain in getChains"
        :key="chain.name"
        :value="chain.name"
        v-text="chain.label"
      />
    </select>
  </div>

  <router-view v-if="getSelectedChain !== null" />
  <p v-else>Choose a chain</p>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  props: {
    value: String,
  },
  components: {},
  data() {
    return {
      selected: "",
    };
  },
  computed: mapGetters(["getSelectedChain", "getChains"]),
  methods: {
    ...mapActions(["setSelectedChain"]),
    updateValue() {
      // Emitting a `change` event with the new
      // value of the `<select>` field, updates
      // all values bound with `v-model`.
      this.$emit("change", this.selected);
      this.setSelectedChain(this.selected);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
