<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div v-for="validator in validators" :key="validator.operator_address">
      <div>
        <router-link :to="{ name: "Validator", params: { address: validator.operator_address},}">
          <p>
            {{ JSON.stringify(validator) }}
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Validators",
  components: {
    HelloWorld,
  },
  data() {
    return {
      validators: [],
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:3000/akash/validators")
      .then((response) => {
        console.log(response.data.result);
        this.validators = response.data.result;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
