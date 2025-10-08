<template>
  <div class="container" :class="{ 'flex-inline-container': (report && settings.show_response) }">
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
      <button type="reset" class="btn" @click="cancelActions()">Отмена</button>
      <modal v-if="heatbases" :mod_label="modal_label" :button_style="{
        content: 'Создать отчет', style: {
          color: '#555',
          background: '#ffffffad', border: '1px solid #fff !important', 'margin-top': '20px', 'border-radius'
            : '0px Important',
        }
      }" @modal-event="createReport()" :modal_desctiption="modal_desctiption" />
    </div>
    <template v-if="report">
      <div class="table-responsive" v-if="report.archive_table && settings.show_response">
        <table class="table table-primary">
          <thead>
            <tr>
              <th scope="col" v-for="(value, key) in report.archive_table[0]" :key="key">
                {{ key }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="" v-for="(row, key) in report.archive_table" :key="key">
              <td scope="row" v-for="(value, key) in row" :key="key">
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>
<script>
import ModalWindow from '../components/ModalWindow.vue';
export default {
  setup() {
    return;
  },
  methods: {
    async createReport() {
      if (!this.selectedHeatbase) {
        this.modal_label = "Ошибка"
        this.modal_desctiption = "Выберете котельную"
        return;
      }
      await this.$store.dispatch('createReport', {
        name: this.selectedHeatbase.name,
        serial_num: this.selectedHeatbase.serial_num,
      })
      this.modal_label = "Отчет сохранен";
      this.modal_desctiption = this.report.status.message;
      console.log(this.report)
    },
    cancelActions() {
      this.$store.commit("unsetReport", null)
      this.$store.dispatch("getCurrentSettings")
      this.selectedHeatbase = null
    }
  },
  data() {
    return {
      modal_desctiption: null,
      modal_label: null,
      mod_button_content: null,
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
  components: {
    modal: ModalWindow
  }
};
</script>
<style lang="scss">
.flex-inline-container {
  display: inline-flex;
  gap: 20px;
}

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
  min-width: 125px;
  color: #555;
  background: #ffffffad;
  border: 1px solid #fff !important;
  margin-top: 20px;
  border-radius: 0px Important;
}

.form button:hover {
  // background: #fff ;
  opacity: 0.8;
}

.pull-right {
  float: right;
}

// .table-response {}

.table-responsive::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.table-responsive::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 8px;
}

.table-responsive::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 8px;
}

.table-responsive::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.table-responsive {
  max-width: 1000px;
  overflow-x: auto;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 4px;

  .table {
    // max-width: 100%;
    border: 1px solid #fff !important;
    border-collapse: collapse;
    width: max-content;
    min-width: 100%;

    th {
      color: #000000;
      background: #ffffffad;
    }

    td {
      color: #000000;
      background: #ffffffad;
    }

    tr td:hover {
      background: #dad8d8ad;
    }
  }
}
</style>