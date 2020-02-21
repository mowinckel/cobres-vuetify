<template>
  <v-app>
    <v-content>
      <Status />
    </v-content>
  </v-app>
</template>

<script>
import Status from "./components/Status";

export default {
  name: "App",
  components: {
    Status
  },

  data: () => ({})
};
</script>
