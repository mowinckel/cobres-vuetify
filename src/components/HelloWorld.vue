<template>
  <v-card tile flat>
    <v-data-table
      :headers="headers"
      :items="miners"
      v-model="selected"
      show-select
      single-select
      item-key="ip"
    >
      <template v-slot:item.url="props">
        <v-chip @click="setting(props.item)" class="pa-1">{{
          props.item.summary.url
        }}</v-chip>
      </template>
      <template v-slot:item.summary.acc="props">
        <v-chip outlined small color="green" class="pa-1">
          {{ props.item.summary.acc }}
        </v-chip>
      </template>
      <template v-slot:item.summary.lastacctime="props">
        <v-chip small outlined color="green" class="pa-1">{{
          props.item.summary.lastacctime
        }}</v-chip>
      </template>
      <template v-slot:item.summary.rej="props">
        <v-chip small outlined color="red accent-2" class="pa-1">
          {{ props.item.summary.rej }}</v-chip
        >
      </template>
      <template v-slot:item.summary.temp="props">
        <v-chip small color="orange" class="pa-1" outlined>
          <v-icon v-if="props.item.summary.temp > 70" color="orange"
            >mdi-fire</v-icon
          >
          {{ props.item.summary.temp }} C
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="display-1 font-weight-thin"
            >Super Monitor</v-toolbar-title
          >

          <v-dialog v-model="dialog" width="800" persistent>
            <v-card>
              <v-card-title>
                <span class="headline">{{ minerInfo.ip }}</span>
              </v-card-title>
              <v-col cols="12">
                <v-text-field
                  label="URL"
                  color="green"
                  outlined
                  :disabled="loading"
                  dense
                  rounded
                  v-model="minerInfo.summary.url"
                ></v-text-field>
                <v-text-field
                  label="User"
                  rounded
                  color="green"
                  :disabled="loading"
                  outlined
                  dense
                  v-model="minerInfo.summary.user"
                ></v-text-field>
                <v-text-field
                  label="Pass"
                  color="green"
                  rounded
                  outlined
                  dense
                  :disabled="loading"
                  v-model="minerInfo.summary.pass"
                ></v-text-field>
              </v-col>

              <v-expand-transition>
                <v-col cols="12" v-show="advanced">
                  <v-textarea
                    dark
                    background-color="red"
                    solo
                    name="input-7-4"
                    label="Solo textarea"
                    v-model="minerJSON"
                  ></v-textarea>
                </v-col>
              </v-expand-transition>

              <v-card-actions class="px-4">
                <v-btn color="grey" dark rounded depressed @click="dialog = false">
                  <v-icon>mdi-close</v-icon>

                  Close</v-btn
                >
                <v-btn
                  color="green"
                  depressed
                  dark
                  @click="save(minerInfo.ip)"
                  :loading="loading"
                  :disabled="loading"
                  rounded
                >
                  <v-icon>mdi-content-save</v-icon>

                  Save</v-btn
                >

                <v-btn color="green" dark depressed rounded :disabled="loading">
                  <v-icon>mdi-restart</v-icon>

                  Restart</v-btn
                >

                <v-btn
                  depressed
                  dark
                  rounded
                  outlined
                  color="grey"
                  @click="advanced = !advanced"
                >
                  <v-icon>mdi-settings</v-icon>
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn
                  dark
                  rounded
                  color="red accent-4"
                  outlined
                  :disabled="loading"
                >
                  <v-icon>mdi-alert</v-icon>
                  Reboot</v-btn
                >

                <v-btn
                  dark
                  rounded
                  color="red accent-4"
                  outlined
                  :disabled="loading"
                >
                  <v-icon>mdi-power</v-icon>
                  Shutdown</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-spacer></v-spacer>
          <v-switch
            prepend-icon="mdi-brightness-6"
            v-model="$vuetify.theme.dark"
            hide-details
            inset
            color="pink accent-2"
          ></v-switch>
        </v-toolbar>
      </template>
    </v-data-table>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
    </v-snackbar>
  </v-card>
</template>

<script>
import { validationMixin } from "vuelidate";
import { minLength, required } from "vuelidate/lib/validators";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addLocale(en);

export default {
  mixins: [validationMixin],
  validations: {
    ip: { required, minLength: minLength(8) }
  },
  beforeCreate() {
    // this.$vuetify.theme.dark = false; // eslint-disable-next-line no-unused-vars
    this.axios.get("/v1/api/miners").then(response => {
      this.miners = response.data;
      this.miners.forEach(element => {
        element.summary.lastacctime = this.timeago(element.summary.lastacctime);
        element.summary.uptime = `${parseInt(element.summary.uptime / 3600)} h`;
        element.summary.freq = `${parseInt(element.summary.freq / 1000000)}`;
      });
    });
  },
  methods: {
    async save(ip) {
      this.loader = "loading";
      try {
        await this.axios.put(
          `/v1/api/miners/status/${ip}`,
          JSON.parse(this.minerJSON)
        );
        this.snackColor = "success";
        this.snackText = "Data saved!";
      } catch (error) {
        this.snackText = error;
        this.snackColor = "error";
        this.snack = true;
      } finally {
        this.snack = true;
      }
    },
    // eslint-disable-next-line no-unused-vars
    setting(content) {
      this.minerInfo = content;
      this.minerJSON = JSON.stringify(this.minerInfo.setting, null, 2);
      this.dialog = true;
    },

    timeago(time) {
      const timeAgo = new TimeAgo("ko-KR");
      const result = timeAgo.format(new Date(time));

      if (result === "just now") {
        // eslint-disable-next-line no-console
        return `${Math.floor((new Date() - new Date(time)) / 1000)}s ago`;
      } else {
        return result;
      }
    },
    create() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.axios.post(`/v1/api/miners/${this.$v.ip.$model}`);
        this.$v.ip.$model = null;
      }
    }
  },
  data: () => ({
    minerJSON: "",
    minerInfo: {
      ip: "",
      summary: {
        url: "",
        user: ""
      }
    },
    advanced: false,
    dialog: false,
    snack: false,
    snackColor: "",
    snackText: "",
    max25chars: v => v.length <= 25 || "Input too long!",
    pagination: {},
    headers: [
      { text: "URL", value: "url" },
      { text: "User", value: "summary.user" },
      { text: "Pass", value: "summary.pass", sortable: false },
      { text: "Accept", value: "summary.acc" },
      { text: "Reject", value: "summary.rej" },
      { text: "Temp", value: "summary.temp" },
      { text: "Acc/min", value: "summary.accmn" },
      { text: "LastAcc", value: "summary.lastacctime" },
      { text: "Uptime", value: "summary.uptime" },
      { text: "Hashrate", value: "summary.khs" },
      { text: "Algo", value: "summary.algo" },
      { text: "NetDiff", value: "summary.diff" },
      { text: "PoolDiff", value: "summary.stdiff" },
      { text: "Chip", value: "summary.ascs" },
      { text: "Valid", value: "summary.ascsvalid" },
      { text: "Freq(MHz)", value: "summary.freq" }
    ],
    ip: "",
    rules: [
      value => {
        const pattern = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return pattern.test(value) || "올바른 IP 입력";
      }
    ],
    selected: [],
    miners: [],
    loading: false,
    loader: null
  }),

  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => {
        this[l] = false;
      }, 3000);

      this.loader = null;
    }
  }
};
</script>
