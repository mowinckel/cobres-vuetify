<template>
  <v-card tile flat>
    <v-data-table :headers="headers" :items="miners" item-key="ip">
      <template v-slot:item.url="props">
        <v-chip
          dark
          v-if="props.item.status === 'normal'"
          color="green"
          @click="setting(props.item)"
        >
          <v-icon left>
            mdi-check
          </v-icon>
          {{ props.item.summary.url }}</v-chip
        >
        <v-tooltip top v-else>
          <template v-slot:activator="{ on }">
            <v-chip dark color="amber darken-3" v-on="on">
              <v-icon left>mdi-alert-circle-outline</v-icon>
              {{ props.item.summary.url }}
            </v-chip>
          </template>
          <span>{{ props.item.setting }}</span>
        </v-tooltip>
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
          <v-icon
            v-if="props.item.summary.temp > cobre_setting.alert.temp"
            color="orange"
            >mdi-fire</v-icon
          >
          {{ props.item.summary.temp }} C
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="display-1 font-weight-thin"
            >Super Monitoring Now :: {{ miners.length }}</v-toolbar-title
          >

          <v-dialog v-model="dialog" width="800">
            <v-card>
              <v-card-title class="px-3">
                <v-icon class="pr-3" color="green accent-4" x-large
                  >mdi-raspberry-pi</v-icon
                >
                <span
                  @click.native="windows.open(minerInfo.ip)"
                  class="headline font-weight-light"
                  >{{ minerInfo.ip }} / {{ minerInfo.mac }}</span
                >
                <v-spacer></v-spacer>
                <v-btn icon @click="advanced = !advanced">
                  <v-icon>mdi-settings</v-icon>
                </v-btn>
              </v-card-title>
              <v-col cols="12">
                <v-text-field
                  label="URL"
                  color="green accent-4"
                  outlined
                  :disabled="loading"
                  dense
                  rounded
                  v-model="minerInfo.setting.pools[0].url"
                ></v-text-field>
                <v-text-field
                  label="User"
                  rounded
                  color="green accent-4"
                  :disabled="loading"
                  outlined
                  v-model="minerInfo.setting.pools[0].user"
                  dense
                ></v-text-field>
                <v-text-field
                  label="Pass"
                  color="green accent-4"
                  rounded
                  outlined
                  dense
                  :disabled="loading"
                  v-model="minerInfo.setting.pools[0].pass"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col class="py-0">
                <v-expand-transition>
                  <v-textarea
                    v-show="advanced"
                    hide-details
                    flat
                    height="300"
                    background-color="red lighten-2"
                    name="input-7-4"
                    :disabled="loading"
                    rounded
                    solo
                    v-model="miner_info"
                  ></v-textarea>
                </v-expand-transition>
              </v-col>

              <v-card-actions class="px-3">
                <v-btn text @click="dialog = false">
                  <v-icon>mdi-close</v-icon>

                  Cancel</v-btn
                >
                <v-btn
                  color="green accent-4"
                  class="white--text"
                  @click="save(minerInfo.ip)"
                  :loading="loading"
                  :disabled="loading"
                  text
                >
                  <v-icon>mdi-content-save</v-icon>

                  Save</v-btn
                >

                <v-btn
                  class="white--text"
                  color="green accent-4"
                  text
                  :disabled="loading"
                  @click="apply(minerInfo.ip)"
                >
                  <v-icon>mdi-restart</v-icon>

                  apply</v-btn
                >

                <v-spacer></v-spacer>

                <v-btn
                  rounded
                  color="red accent-3"
                  outlined
                  :disabled="loading"
                  @click="reboot(minerInfo.ip)"
                >
                  <v-icon>mdi-alert</v-icon>
                  Reboot</v-btn
                >

                <v-btn
                  rounded
                  color="red accent-3"
                  outlined
                  :disabled="loading"
                  @click="shutdown(minerInfo.ip)"
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

          <v-dialog v-model="settingDialog" width="500">
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-settings</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-container>
                <v-card-text>
                  <v-col cols="12">
                    <v-subheader class="pl-0"></v-subheader>
                    <v-slider
                      hint="Tick size"
                      persistent-hint
                      thumb-label="always"
                      min="1"
                      max="30"
                      thumb-size="24"
                      step="1"
                      v-model="cobre_setting.interval.axios"
                      tick-size="10"
                    ></v-slider>
                  </v-col>
                  <v-col cols="12">
                    <v-subheader class="pl-0"></v-subheader>
                    <v-slider
                      hint="Temperature alert"
                      persistent-hint
                      thumb-size="24"
                      thumb-label="always"
                      v-model="cobre_setting.alert.temp"
                      min="20"
                      step="1"
                      tick-size="10"
                    ></v-slider>
                  </v-col>
                </v-card-text>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text width="25%" @click="setSetting()">
                  apply
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-btn
            icon
            @click="addMiner()"
            :loading="scan_loader"
            :disabled="scan_loader"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
    </v-data-table>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
    </v-snackbar>
    <!-- <v-divider></v-divider> -->
    <!-- <v-card-actions> -->
    <!-- <v-spacer></v-spacer> -->
    <!-- <v-dialog v-model="addDialog" width="500">
        <template v-slot:activator="{ on }">
          <v-btn class="text-capitalize" text v-on="on">Add Miner</v-btn>
        </template>
        <v-card>
          <v-card-text>
            <v-container class="pb-0 pt-5">
              <v-text-field
                color="green accent-4"
                outlined
                hide-details
                v-model="ip"
                label="IP Address"
                required
              ></v-text-field>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text width="25%" @click="addMiner(ip)">
              add
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
    <!-- </v-card-actions> -->
    <!-- <v-divider></v-divider> -->
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
    this.getSetting();
    this.getAllMiners();

    this.inerval = setInterval(() => {
      this.getAllMiners();
    }, this.cobre_setting.interval.axios * 1000);
  },
  methods: {
    setSetting() {
      clearInterval(this.inerval);

      this.inerval = setInterval(() => {
        this.getAllMiners();
      }, this.cobre_setting.interval.axios * 1000);

      this.axios
        .put("/v1/api/setting", this.cobre_setting)
        .then(res => {
          this.snackText = res.data;
          this.snackColor = "success";
          this.snack = true;
          this.settingDialog = false;
        })
        .catch(err => {
          this.snackText = err;
          this.snackColor = "error";
          this.snack = true;
        });
    },
    getSetting() {
      this.axios
        .get("/v1/api/setting")
        .then(res => {
          this.cobre_setting = res.data;
        })
        .catch(err => {
          this.snackText = err;
          this.snackColor = "error";
          this.snack = true;
        });
    },
    getAllMiners() {
      this.axios
        .get("/v1/api/miners")
        .then(response => {
          this.miners = response.data;
          this.miners.forEach(element => {
            element.summary.lastacctime = this.timeago(
              element.summary.lastacctime
            );
            element.summary.uptime = `${parseInt(
              element.summary.uptime / 3600
            )} h`;
            element.summary.freq = `${parseInt(
              element.summary.freq / 1000000
            )}`;
            element.summary.khs = this.hashrate(parseInt(element.summary.khs));
          });
        })
        .catch(err => {
          this.snackText = err;
          this.snackColor = "error";
          this.snack = true;
        });
    },

    hashrate(khs) {
      if (1000 > khs / 1000) {
        return `${khs / 1000}M`;
      } else {
        return `${khs / 1000000}G`;
      }
    },
    async save(ip) {
      this.loading = true;
      try {
        const res = await this.axios.put(
          `/v1/api/miners/status/${ip}`,
          JSON.parse(this.miner_info)
        );

        if (res.status === 200) {
          this.snackColor = "success";
          this.snackText = "Data saved!";
        }
      } catch (error) {
        this.snackText = error;
        this.snackColor = "error";
        this.snack = true;
      } finally {
        this.loading = false;
        this.snack = true;
      }
    },

    async addMiner() {
      this.scan_loader = true;

      this.axios
        .post(`/v1/api/miners`)
        .then(res => {
          this.snackText = res;
          this.snackColor = "success";
          this.snack = true;
        })
        .catch(err => {
          this.snackText = err;
          this.snackColor = "error";
          this.snack = true;
        });

      setTimeout(() => {
        this.scan_loader = false;
      }, 10000);
    },

    reboot(ip) {
      const ws = new WebSocket(`ws://${ip}:4048/reboot`, "text");
      ws.onmessage = event => {
        this.snackText = event.data;
        this.snackColor = "success";
        this.snack = true;
        ws.close();
      };

      ws.onerror = err => {
        this.snackText = err;
        this.snackColor = "error";
        this.snack = true;
        ws.close();
      };
    },

    shutdown(ip) {
      const ws = new WebSocket(`ws://${ip}:4048/shutdown`, "text");

      ws.onmessage = event => {
        this.snackText = event.data;
        this.snackColor = "success";
        this.snack = true;
        ws.close();
      };

      ws.onerror = err => {
        this.snackText = err;
        this.snackColor = "error";
        this.snack = true;
        ws.close();
      };
    },
    apply(ip) {
      const ws = new WebSocket(`ws://${ip}:4048/restart`, "text");
      ws.onmessage = event => {
        this.snackText = event.data;
        this.snackColor = "success";
        this.snack = true;
        ws.close();
      };
    },
    setting(content) {
      this.minerInfo = content;
      this.dialog = true;
    },

    timeago(time) {
      const timeAgo = new TimeAgo("ko-KR");
      const result = timeAgo.format(new Date(time));

      if (result === "just now") {
        return `${Math.floor((new Date() - new Date(time)) / 1000)}s ago`;
      } else if (result.includes("minute")) {
        if (result.startsWith("a")) {
          return "1m ago";
        }
        return result.replace(" minute", "m");
      } else if (result.includes("minutes")) {
        return result.replace("hour", "h");
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
    cobre_setting: {
      interval: {
        axios: 5
      },
      alert: {
        temp: 70
      }
    },
    settingDialog: false,
    addDialog: false,
    scan_loader: false,
    minerInfo: {
      setting: {
        pools: [
          {
            user: "",
            url: "",
            pass: ""
          }
        ]
      }
    },
    advanced: false,
    dialog: false,
    snack: false,
    snackColor: "",
    snackText: "",
    pagination: {},
    headers: [
      { text: "URL", value: "url" },
      { text: "User", value: "summary.user" },
      { text: "Pass", value: "summary.pass" },
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
    miners: [],
    loading: false
  }),

  computed: {
    miner_info: {
      get: function() {
        return JSON.stringify(this.minerInfo.setting, null, 2);
      },
      set: function(newValue) {
        this.minerInfo.setting = JSON.parse(newValue);
      }
    }
  }
};
</script>
