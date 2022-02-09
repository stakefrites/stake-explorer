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
/* Valnodes - Carbon Neutral Staking
akashvaloper1qwpnhmdlfj6gfyh0e29fjudh0ytfe5l7tjttul
{"operator_address":"akashvaloper1qwpnhmdlfj6gfyh0e29fjudh0ytfe5l7tjttul","consensus_pubkey":{"type":"tendermint/PubKeyEd25519","value":"kVP7pCAT+NrTyhqsG0vEwlRoyul1Q9yeTJas+v1U07g="},"status":3,"tokens":"412254000000","delegator_shares":"412254000000.000000000000000000","description":{"moniker":"Valnodes
- Carbon Neutral
Staking","identity":"7ACD3320CCADD897","website":"https://www.valnodes.com","details":"Carbon-Neutral
| Transparent | Smart validator backed by cutting edge innovations in
active-sync, one-sign to ensure high uptime. Reach us at
t.me/ValNodes."},"unbonding_time":"1970-01-01T00:00:00Z","commission":{"commission_rates":{"rate":"0.100000000000000000","max_rate":"0.200000000000000000","max_change_rate":"0.010000000000000000"},"update_time":"2022-01-13T08:58:27.360171457Z"},"min_self_delegation":"1"}
*/
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
