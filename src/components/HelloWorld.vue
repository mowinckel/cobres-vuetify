<template>
  <v-container>
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
        <!-- <v-fade-transition v-slot:append>
          <v-icon v-if="task" @click="create">
            add_circle
          </v-icon>
        </v-fade-transition> -->
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
      <v-btn
        class="mx-4 elevation-1"
        fab
        small
        color="green"
        @click="scan()"
        :loading="loading"
        :disabled="loading"
      >
        <v-icon color="white">mdi-refresh</v-icon>
      </v-btn>
    </v-row>

    <v-divider class="mb-4"></v-divider>

    <v-card v-if="miners.length > 0">
      <v-list-item-group
        v-model="selected"
        multiple
        active-class="green--text"
        dense
      >
        <draggable v-model="miners" v-bind="dragOptions" @change="change">
          <!-- <v-slide-y-transition class="py-0" group> -->
          <transition-group type="transition" name="flip">
            <v-list-item
              three-line
              v-for="(task, i) in miners"
              :key="`${i}-${task}`"
            >
              <v-list-item-icon>
                <v-icon color="green">mdi-check-circle</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <!-- <div
                class="text-no-wrap"
                v-for="field in Object.keys(task.summary)"
                :key="field"
              >
                <b>{{ field }}</b> {{ task.summary[field] }}
              </div> -->
                <v-list-item-title class="title"
                  >{{ task.ip }} :: {{ task.summary.algo }}</v-list-item-title
                >
                <v-list-item-title>{{ task.summary.url }}</v-list-item-title>
                <v-list-item-title>{{ task.summary.user }}</v-list-item-title>
                <!-- <v-list-item-title>{{ task.summary.pass }}</v-list-item-title>
              <v-list-item-title>{{ task.summary.hs }}</v-list-item-title>
              <v-list-item-title>{{ task.summary.acc }}</v-list-item-title>
              <v-list-item-title
                ><b>reject : </b>{{ task.summary.rej }}</v-list-item-title
              >
              <v-list-item-title
                ><b>acc/min : </b>{{ task.summary.accmn }}</v-list-item-title
              >
              <v-list-item-title
                ><b>last accept time: </b
                >{{ task.summary.lastacctime }}</v-list-item-title
              >
              <v-list-item-title
                ><b>temp: </b>{{ task.summary.temp }}</v-list-item-title
              > -->
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text></v-list-item-action-text>
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      text
                      color="success"
                      dark
                      v-on="on"
                      @click="setting(task.summary)"
                    >
                      <v-icon>mdi-settings</v-icon>
                    </v-btn>
                  </template>
                </v-menu>
              </v-list-item-action>
            </v-list-item>
          </transition-group>
          <!-- </v-slide-y-transition> -->
        </draggable>
      </v-list-item-group>

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

export default {
  mixins: [validationMixin],
  validations: {
    ip: { required, minLength: minLength(8) }
  },
  components: {
    draggable
  },
  beforeMount() {
    this.loader = "loading";
    // eslint-disable-next-line no-unused-vars
    this.axios.get("/v1/api/miners").then(response => {
      this.miners = response.data;
    });
  },
  methods: {
    setting(content) {
      this.dialogContent = content;
      this.dialog = true;
    },
    change() {
      // this.miners.forEach((element, index) => {});
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
