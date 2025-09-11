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
            <tr class="" @click="chooseHeatbase(heatbase)">
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
          <input
            type="text"
            id="heatbase_textbox"
            v-model="heatbase_name"
            class="form-control"
          />
          <div id="heatbase_textbox" class="form-text">
            Введите название котельной
          </div>
        </div>
        <div class="mb-3">
          <label for="serial_num_textbox" class="form-label"
            >Серийный номер</label
          >
          <input
            type="text"
            class="form-control"
            v-model="heatbase_serial_num"
            id="serial_num_textbox"
          />
        </div>
        <button
          class="btn btn-primary"
          @click="
            !selectedHeatbase
              ? $store.dispatch('addHeatbase', {
                  name: heatbase_name,
                  serial_num: heatbase_serial_num,
                })
              : cancelSelection()
          "
        >
          {{ !selectedHeatbase ? "Добавить" : "Отменить" }}
        </button>
        <button
          class="btn btn-primary"
          :class="!selectedHeatbase ? 'disabled' : ''"
          @click="editHeatbase()"
        >
          Редактировать
        </button>
        <button
          class="btn btn-primary"
          :class="!selectedHeatbase ? 'disabled' : ''"
          @click="deleteHeatbase()"
        >
          Удалить из списка
        </button>
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
    };
  },
  methods: {
    cancelSelection() {
      this.selectedHeatbase = null;
      this.heatbase_name = null;
      this.heatbase_serial_num = null;
    },
    chooseHeatbase(heatbase) {
      this.selectedHeatbase = heatbase;
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
      await this.$store.dispatch("editHeatbase", {});
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