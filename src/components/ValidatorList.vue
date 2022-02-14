<template>
  <div class="container">
    <div v-if="getLoadingStatus">Loading</div>
    <div v-else>
      <div v-for="validator in validators" :key="validator.operator_address">
        <div>
          <b-card
            style="max-width: 30rem"
            :title="validator.description.moniker"
          >
            <b-avatar size="lg"></b-avatar>
            <b-card-text :title="validator.description.moniker">
              {{ validator.operator_address }} <br />

              Commission:
              {{
                Math.round(validator.commission.commission_rates.rate * 100)
              }}%
              <br />
              {{ validator.description.details }}
              <br />
              Voting power: {{ validator.tokens }}
            </b-card-text>

            <b-button variant="primary">Website</b-button>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { mapGetters } from "vuex";

export default {
  name: "ValidatorList",
  props: {
    validators: Array,
  },
  methods: {
    async getAvatar(identity) {
      let res = await axios(
        `https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${identity}&fields=pictures`
      );
      console.log(res.data.them[0]);
      return res.data.data.them[0].pictures.primary.url;
    },
  },
  computed: { ...mapGetters(["getLoadingStatus"]) },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
