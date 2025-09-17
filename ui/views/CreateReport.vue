<template>
  <div>
    <div class="btn-group">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="triggerId"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {{ selectedHeatbase ? selectedHeatbase.name : "Выберете котельную" }}
      </button>

      <div
        class="dropdown-menu dropdown-menu-start"
        aria-labelledby="triggerId"
      >
        <template v-for="(heatbase, key) in heatbases" :key="key">
          <a
            class="dropdown-item"
            href="#"
            @click="selectedHeatbase = heatbase"
            >{{ heatbase.name }}</a
          >
        </template>
      </div>
      <div class="btn-group" role="group" data-bs-toggle="buttons">
        <label class="btn btn-primary active">
          <input
            type="checkbox"
            class="me-2"
            autocomplete="off"
            v-model="chouse_file"
          />
          Выбрать файл
        </label>
      </div>
      <div>
        <button
          class="btn btn-primary"
          @click="
            !selectedHeatbase
              ? alert('Выберете котельную')
              : $store.dispatch('createReport', {
                  name: selectedHeatbase.name,
                  serial_num: selectedHeatbase.serial_num,
                })
          "
        >
          Сформировать отчет
        </button>
      </div>
    </div>
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
  },
  data() {
    return {
      selectedHeatbase: null,
      chouse_file: false,
    };
  },
  mounted() {
    this.$store.dispatch("getHeatbases");
  },
  computed: {
    heatbases() {
      return this.$store.getters.heatbases;
    },
    report() {
      return this.$store.getters.report;
    },
  },
};
</script>