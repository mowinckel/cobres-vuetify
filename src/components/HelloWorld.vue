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
        <v-chip label class="pa-1">{{ props.item.summary.url }}</v-chip>
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
        <v-chip small class="pa-1" outlined>
          {{ props.item.summary.temp }} C
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="display-1 font-weight-thin"
            >Super Monitor</v-toolbar-title
          >

          <v-dialog v-model="dialog" width="800">
            <template v-slot:activator="{ on }">
              <v-btn color="green" dark v-on="on" outlined rounded>
                Setting
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-textarea hide-details outlined></v-textarea>
              </v-card-text>

              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green" text @click="save(selected[0].ip)"
                  >Save</v-btn
                >
                <v-spacer></v-spacer>
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
      <v-btn text @click="snack = false">Close</v-btn>
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
  beforeMount() {
    // this.$vuetify.theme.dark = fal; // eslint-disable-next-line no-unused-vars
    this.axios.get("/v1/api/miners").then(response => {
      this.miners = response.data;
      this.miners.forEach(element => {
        element.summary.lastacctime = this.timeago(element.summary.lastacctime);
        element.summary.uptime = `${parseInt(element.summary.uptime / 3600)} h`;
        element.summary.freq = `${parseInt(
          element.summary.freq / 1000000
        )} MHz`;
      });
    });
  },
  methods: {
    save(ip) {
      // eslint-disable-next-line no-console
      console.log(ip);
      this.axios.put(`/v1/api/miners/status/${ip}`).then(() => {
        this.snack = true;
        this.snackColor = "success";
        this.snackText = "Data saved";
      });
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    apply(ip, setting) {
      this.axios.put(`/v1/api/miners/status/${ip}`, setting).then(response => {
        // eslint-disable-next-line no-console
        console.log(response.data);
      });
    },
    setting(content) {
      this.dialogContent = content;
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
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    dialog: false,
    snack: false,
    snackColor: "",
    snackText: "",
    max25chars: v => v.length <= 25 || "Input too long!",
    pagination: {},
    headers: [
      { text: "url", value: "url" },
      { text: "user", value: "summary.user" },
      { text: "pass", value: "summary.pass", sortable: false },
      { text: "acc", value: "summary.acc" },
      { text: "acc/min", value: "summary.accmn" },
      { text: "reject", value: "summary.rej" },
      { text: "temp", value: "summary.temp" },
      { text: "lastacc", value: "summary.lastacctime" },
      { text: "uptime", value: "summary.uptime" },
      { text: "hashrate", value: "summary.khs" },
      { text: "algorithm", value: "summary.algo" },
      { text: "netdiff", value: "summary.diff" },
      { text: "pooldiff", value: "summary.stdiff" },
      { text: "freq", value: "summary.freq" }
    ],
    ip: "",
    rules: [
      value => {
        const pattern = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return pattern.test(value) || "올바른 IP 입력";
      }
    ],
    selected: [],
    miners: [
      {
        summary: {
          url: "dummy",
          temp: 43
        }
      }
    ],
    loading: false,
    loader: null
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  }
};
</script>
