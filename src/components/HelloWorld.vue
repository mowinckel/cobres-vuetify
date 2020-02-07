<template>
  <v-container>
    <v-fab-transition>
      <v-speed-dial
        v-model="fab"
        fixed
        fab
        large
        dark
        bottom
        right
        v-show="!hidden"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="green" dark fab>
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-btn fab dark small color="green" @click="dialog = true">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-fab-transition>
    <form @submit.prevent="create">
      <v-text-field
        v-model="$v.ip.$model"
        solo
        error-messages="error"
        label="127.0.0.1"
        @input="$v.ip.$touch()"
        required
        @blur="$v.ip.$touch()"
      >
      </v-text-field>
    </form>

    <h2 class="display-1 success--text pl-4">
      Miners:
      <v-fade-transition leave-absolute>
        <span :key="`tasks-${miners.length}`">
          {{ miners.length }}
        </span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-4"></v-divider>

    <v-row class="my-1" align="center">
      <strong class="mx-4 info--text text--darken-3">
        Monitoring : {{ miners.length }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 black--text"> Down: {{ completedTasks }} </strong>

      <v-spacer></v-spacer>
    </v-row>

    <v-divider class="mb-4"></v-divider>

    <v-card v-if="miners.length > 0">
      <!-- <v-list-item-group
        v-model="selected"
        multiple
        active-class="green--text"
        dense
      > -->
      <draggable v-model="miners" v-bind="dragOptions" @change="change">
        <!-- <v-slide-y-transition class="py-0" group> -->
        <transition-group type="transition" name="flip">
          <v-list-item
            three-line
            v-for="(task, i) in miners"
            :key="`${i}-${task}`"
          >
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox v-model="active" color="green"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-btn
                  class="headline"
                  :href="`http://${task.ip}`"
                  depressed
                  outlined
                  rounded
                  color="green"
                  >{{ task.ip }}</v-btn
                >
                <v-text-field
                  v-model="task.summary.url"
                  hide-details
                  dense
                  rounded
                  filled
                ></v-text-field>
                <v-text-field
                  v-model="task.summary.user"
                  hide-details
                  dense
                  rounded
                  filled
                ></v-text-field>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text class="body-2"
                  >temp : {{ task.summary.temp }}C</v-list-item-action-text
                >
                <v-list-item-action-text class="body-2"
                  >uptime :
                  {{ uptime(task.summary.uptime) }}</v-list-item-action-text
                >
                <v-list-item-action-text class="body-2"
                  >last accept :
                  {{
                    timeago(task.summary.lastacctime)
                  }}</v-list-item-action-text
                >
                <v-list-item-action-text class="body-2"
                  >reject :{{ task.summary.rej }}</v-list-item-action-text
                >
                <v-list-item-action-text class="body-2"
                  >algorithm :{{ task.summary.algo }}</v-list-item-action-text
                >
                <v-list-item-action-text class="body-2"
                  >{{ task.summary.khs }}kH/s</v-list-item-action-text
                >
              </v-list-item-action>
            </template>
          </v-list-item>
        </transition-group>
        <!-- </v-slide-y-transition> -->
      </draggable>
      <!-- </v-list-item-group> -->

      <v-dialog v-model="dialog" max-width="500" scrollable>
        <v-card>
          <v-alert prominent type="error" title tile>
            <v-row align="center">
              <v-col class="grow">Caution!! This is advanced setting</v-col>
            </v-row>
          </v-alert>

          <v-card-text style="height: 300px">
            <v-col cols="12">
              <v-text-field
                v-for="[key, value] in Object.entries(dialogContent)"
                :label="key"
                :placeholder="value"
                outlined
                :key="key"
              ></v-text-field>
            </v-col>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text large @click="dialog = false">
              Cancel
            </v-btn>

            <v-btn color="green darken-1" text large @click="dialog = false">
              Apply
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { minLength, required } from "vuelidate/lib/validators";
import draggable from "vuedraggable";
import TimeAgo from "javascript-time-ago";
import ko from "javascript-time-ago/locale/ko";
TimeAgo.addLocale(ko);

export default {
  mixins: [validationMixin],
  validations: {
    ip: { required, minLength: minLength(8) }
  },
  components: {
    draggable
  },
  beforeMount() {
    // eslint-disable-next-line no-unused-vars
    this.axios.get("/v1/api/miners").then(response => {
      this.miners = response.data;
    });
  },
  methods: {
    apply(ip, setting) {
      this.axios
        .put(`/v1/api/miners/status/${ip}`, { setting: setting })
        .then(response => {
          // eslint-disable-next-line no-console
          console.log(response);
        });
    },
    setting(content) {
      this.dialogContent = content;
      this.dialog = true;
    },
    change() {
      // this.axios.post("/v1/api/miner");
      // this.miners.forEach((element, index) => {
      // });
    },
    uptime(seconds) {
      return `${parseInt(seconds / 3600)} 시간`;
    },
    timeago(time) {
      const timeAgo = new TimeAgo("ko-KR");
      const result = timeAgo.format(new Date(time));

      if (result === "지금") {
        // eslint-disable-next-line no-console
        return `${Math.floor((new Date() - new Date(time)) / 1000)}초 전`;
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
    test: false,
    fab: false,
    hidden: false,
    dialogContent: [],
    dialog: false,
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
      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    completedTasks() {
      return 0;
      // return this.miners.filter(task => task.done).length;
    },
    progress() {
      return (this.completedTasks / this.miners.length) * 100;
    },
    remainingTasks() {
      return this.miners.length - this.completedTasks;
    }
  }
};
</script>

<style scoped>
.ghost {
  opacity: 0.4;
  background: #38c3a4;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
</style>
