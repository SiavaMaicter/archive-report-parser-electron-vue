<template>
  <div><button @click="RestoreSettings()">RestoreSettings</button></div>
  <div><button @click="RestoreHeatbases()">RestoreHeatbases</button></div>
  <!-- <div><button @click="RestoreSettings">TEST POEBEN'</button></div>
  <div><button @click="RestoreSettings">TEST POEBEN'</button></div> -->
</template>
<script>
import { app } from "../platform";
export default {
  methods: {
    RestoreSettings() {
      app.store.settings.restoreDefaults();
    },
    RestoreHeatbases() {
      console.log(app.store.heatbases.restoreDefaultsHeatbases());
    },
  },
};
</script>