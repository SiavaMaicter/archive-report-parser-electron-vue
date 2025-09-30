<template>
  <div>
    <div class="table-responsive">
      <table class="table table-light">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Котельная</th>
            <th scope="col">Серийный номер</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(heatbase, key) in heatbases" :key="key">
            <tr class="table-row" @click="chooseHeatbase(heatbase, key)">
              <td scope="row">{{ key }}</td>
              <td>{{ heatbase.name }}</td>
              <td>
                {{ !heatbase.serial_num ? "Отсутствует" : heatbase.serial_num }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div>
        <div class="mb-3">
          <label for="heatbase_textbox" class="form-label">Название</label>
          <input type="text" id="heatbase_textbox" v-model="heatbase_name" class="form-control" />
          <div id="heatbase_textbox" class="form-text">
            Введите название котельной
          </div>
        </div>
        <div class="mb-3">
          <label for="serial_num_textbox" class="form-label">Серийный номер</label>
          <input type="text" class="form-control" v-model="heatbase_serial_num" id="serial_num_textbox" />
        </div>
        <div class="action-buttons">
          <button class="btn btn-primary" @click="
            !selectedHeatbase
              ? $store.dispatch('addHeatbase', {
                name: heatbase_name,
                serial_num: heatbase_serial_num,
              })
              : cancelSelection()
            ">
            {{ !selectedHeatbase ? "Добавить" : "Отменить" }}
          </button>

          <button class="btn btn-success" :class="!selectedHeatbase ? 'disabled' : ''" @click="editHeatbase()">
            Редактировать
          </button>
          <button class="btn btn-danger" :class="!selectedHeatbase ? 'disabled' : ''" @click="deleteHeatbase()">
            Удалить из списка
          </button>
          <!-- <button class="btn btn-danger" @click="$store.dispatch('RestoreHeatbases')">
            RESTORE DEFAULT
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedHeatbase: null,
      heatbase_name: null,
      heatbase_serial_num: null,
      selectedKey: null,
    };
  },
  methods: {
    cancelSelection() {
      this.selectedHeatbase = null;
      this.heatbase_name = null;
      this.heatbase_serial_num = null;
      this.selectedKey = null;
    },
    chooseHeatbase(heatbase, key) {
      this.selectedHeatbase = heatbase;
      this.selectedKey = key;
      this.heatbase_name = heatbase.name;
      this.heatbase_serial_num = heatbase.serial_num;
    },
    async deleteHeatbase() {
      await this.$store.dispatch("DeleteHeatbase", {
        name: this.heatbase_name,
        serial_num: this.heatbase_serial_num,
      });
      this.cancelSelection();
    },
    async editHeatbase() {
      await this.$store.dispatch("editHeatbase", {
        heatbase: {
          name: this.heatbase_name,
          serial_num: this.heatbase_serial_num,
        },
        key: this.selectedKey
      });
      this.cancelSelection;
    },
  },
  computed: {
    heatbases() {
      return this.$store.getters.heatbases;
    },
  },
};
</script>
<style lang="scss">
.table-responsive {
  min-width: 600px;
  max-width: 800px;
  padding: 20px;
  margin: 0 auto;
  background: #ffffff59;
  -webkit-box-shadow: 3px 3px 23px -9px rgba(0, 0, 0, 0.86);
  -moz-box-shadow: 3px 3px 23px -9px rgba(0, 0, 0, 0.86);
  box-shadow: 3px 3px 23px -9px rgba(0, 0, 0, 0.86);
}

.table-light {
  -webkit-box-shadow: 3px 3px 23px -9px rgba(0, 0, 0, 0.86);
  -moz-box-shadow: 3px 3px 23px -9px rgba(0, 0, 0, 0.86);
  box-shadow: 3px 3px 23px -9px rgba(0, 0, 0, 0.86);
}

.table-row:hover {
  opacity: 0.5;
}

.table-responsive .btn {
  border: 1px solid #fff;
  margin-top: 20px;
  border-radius: 0px Important;
  margin-right: 20px;
  display: inline-flex;
}

.action-buttons {
  display: flex;
  justify-content: center;
}
</style>