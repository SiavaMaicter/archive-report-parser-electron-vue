<template>
  <div v-if="report">
    <div class="table-responsive">
      <table class="table table-primary">
        <thead>
          <tr>
            <th scope="col" v-for="(value, key) in report[0]" :key="key">
              {{ key }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="" v-for="(row, key) in report" :key="key">
            <td scope="row" v-for="(value, key) in row" :key="key">
              {{ value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="container">
    <div class="form">
      <div class="form-group">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          {{ selectedHeatbase ? selectedHeatbase.name : "Выберете котельную" }}
        </button>
        <div class="dropdown-menu dropdown-menu-start" aria-labelledby="triggerId">
          <template v-for="(heatbase, key) in heatbases" :key="key">
            <a class="dropdown-item" href="#" @click="selectedHeatbase = heatbase">{{ heatbase.name }}</a>
          </template>
        </div>
      </div>
      <div class="form-group">
        <label class="btn btn-primary active" v-if="settings">
          <input type="checkbox" class="me-2" autocomplete="off" v-model="settings.request_get_file_location" />
          Запрашивать путь к файлу
        </label>
      </div>
      <div class="form-group">
        <label class="btn btn-primary active" v-if="settings">
          <input type="checkbox" class="me-2" autocomplete="off" v-model="settings.request_save_file_location" />
          Запрашивать путь к сохранению
        </label>
      </div>
      <button type="reset" class="btn" @click="cancelActions()">Отменить действие</button>
      <button class="btn" style="float:right" @click="
        !selectedHeatbase
          ? alert('Выберете котельную')
          : $store.dispatch('createReport', {
            name: selectedHeatbase.name,
            serial_num: selectedHeatbase.serial_num,
          })
        ">Сформировать отчет</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    createReport() {
      if (!this.chouse_file) {
        alert("action without file selection");
      } else {
        alert("action with file selection");
      }
    },
    cancelActions() {
      this.$store.dispatch("getCurrentSettings")
      this.selectedHeatbase = null
    }
  },
  data() {
    return {
      selectedHeatbase: null,
      chouse_file: false,
    };
  },
  mounted() {
    this.$store.dispatch("getHeatbases");
    this.$store.dispatch("getCurrentSettings")
  },
  computed: {
    heatbases() {
      return this.$store.getters.heatbases;
    },
    settings() {
      return this.$store.getters.settings;
    },
    report() {
      return this.$store.getters.report;
    },
  },
};
</script>
<style lang="scss">
.form {
  min-width: 300px;
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
  background: #ffffff59;
  -webkit-box-shadow: 3px 3px 23px -9px rgba(0, 0, 0, 0.86);
  -moz-box-shadow: 3px 3px 23px -9px rgba(0, 0, 0, 0.86);
  box-shadow: 3px 3px 23px -9px rgba(0, 0, 0, 0.86);
}

.form input {
  border: 1px solid #eee;
  border-radius: 0 !important;
  padding: 5px 8px;
  color: #444;
}

.form button {
  color: #555;
  background: #ffffffad;
  border: 1px solid #fff !important;
  margin-top: 20px;
  border-radius: 0px Important;
}

.form button:hover {
  background: #fff !important;
}

.pull-right {
  float: right;
}
</style>