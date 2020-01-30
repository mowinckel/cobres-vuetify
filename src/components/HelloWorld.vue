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
        Monitoring : {{ remainingTasks }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 black--text">
        Completed: {{ completedTasks }}
      </strong>

      <v-spacer></v-spacer>
      <v-btn class="mx-4" fab dark color="pink" @click="scan()">
        <v-icon dark>mdi-heart</v-icon>
      </v-btn>
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
        <!-- <transition-group type="transition" name="flip"> -->
        <v-list-item
          three-line
          v-for="(task, i) in miners"
          :key="`${i}-${task}`"
        >
          <v-list-item-icon>
            <v-icon color="green">mdi-check-circle</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="title">{{ task }}</v-list-item-title>
            <v-list-item-title>{{ task }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-action-text></v-list-item-action-text>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn icon text color="success" dark v-on="on">
                  <v-icon>mdi-menu</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in menu" :key="index">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </v-list-item>
        <!-- </transition-group> -->
      </draggable>
    </v-card>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { minLength, required } from "vuelidate/lib/validators";
import draggable from "vuedraggable";
import { db } from "../firebase";

export default {
  mixins: [validationMixin],
  validations: {
    ip: { required, minLength: minLength(8) }
  },
  components: {
    draggable
  },
  firestore: {
    miners: db.collection("miners").doc("favorite")
  },
  created() {
    db.collection("miners")
      .doc("favorite")
      .get()
      .then(doc => {
        // eslint-disable-next-line no-console
        console.log(doc.data());
      });
  },
  methods: {
    scan() {
      this.axios.get("/v1/api/miners").then(response => {
        // eslint-disable-next-line no-console
        console.log(response);
      });
    },
    change() {
      db.collection("miners")
        .doc("favorite")
        .set(this.miners);
    },
    create() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        db.collection("miners").add({
          name: this.$v.ip.$model
        });

        this.$v.ip.$model = null;
      }
    }
  },
  data: () => ({
    ip: "",
    rules: [
      value => {
        const pattern = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return pattern.test(value) || "올바른 IP 입력";
      }
    ],
    selected: [],
    miners: [],
    menu: [{ title: "restart" }, { title: "reboot" }, { title: "stop" }]
  }),
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
      return 3;
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
</style>
