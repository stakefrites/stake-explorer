<template>
  <div><ValidatorList :validators="getValidators" /></div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
import ValidatorList from "../components/ValidatorList.vue";

export default {
  name: "Validators",
  components: {
    ValidatorList,
  },
  methods: {
    ...mapActions(["fetchValidators"]),
  },
  computed: {
    ...mapGetters(["getValidators"]),
  },
  mounted() {
    this.fetchValidators();
  },
};
</script>
