<template>
  <div class="home">
    <p>{{ getSelectedChain }}</p>
    <div v-if="getSelectedChain == null">
      <select v-model="selected" @change="updateValue">
        <option
          v-for="chain in getChains"
          :key="chain.name"
          :value="chain.name"
          v-text="chain.label"
        />
      </select>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Chain Select",
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
