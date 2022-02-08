<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div>
      <p>
        {{ JSON.stringify(validator) }}
      </p>
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
      validator: {},
    };
  },
  mounted() {
    axios
      .get(
        "http://127.0.0.1:3000/akash/validator/" + this.$route.params.address
      )
      .then((response) => {
        console.log(response.data.result);
        this.validator = response.data.result;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
