<template>
  <div>
    <div>SETTINGS</div>
    <div v-if="settings">
      <label for="dropdown_window_scales">Разрешение экрана</label>
      <div class="dropdown open" name="dropdown_window_scales"></div>
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="triggerId"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {{
          update_settings.screenExt
            ? `${update_settings.screenExt.width}x${update_settings.screenExt.height}`
            : "Выберете разрешение"
        }}
      </button>
      <div class="dropdown-menu" aria-labelledby="triggerId">
        <button
          class="dropdown-item"
          v-for="(screenExt, key) in screenExtPreset"
          :key="key"
          @click="
            update_settings.screenExt = {
              width: screenExt.width,
              height: screenExt.height,
            }
          "
        >
          {{ `${screenExt.width}x${screenExt.height}` }}
        </button>
      </div>
      <div class="form">
        <div class="mb-3">
          <label for="wincor_directory_input" class="form-label"
            >Стандартное место файла с архивом Wincor</label
          >
          <input
            class="form-control"
            v-model="get_file_location"
            type="text"
            readonly
            id="wincor_directory_input"
          />
          <button
            class="btn btn-primary"
            for="wincor_directory_input"
            @click="change_get_file_location()"
          >
            Выбрать
          </button>
        </div>
        <input
          class="form-check-input"
          type="checkbox"
          name="wincor_directory_checkbox"
          value="checkedValue"
          aria-label="Text for screen reader"
        />
        <label for="wincor_directory_checkbox"
          >Спрашивать дирректорию с нахождением файла Wincor</label
        >
        <label for="wincor_directory_input" class="form-label"
          >Стандартный путь к сохранению отчета</label
        >
        <input
          class="form-control"
          v-model="save_file_location"
          type="text"
          readonly
          id="report_directory_input"
        />
        <button
          class="btn btn-primary"
          for="report_directory_input"
          @click="change_save_file_location()"
        >
          Выбрать
        </button>
        <label for="report_directory_checkbox"
          >Спрашивать дирректорию для сохранения файла отчета</label
        >
      </div>
      <div class="btn btn-primary" @click="saveChanges()">
        Сохранить настройки
      </div>
    </div>
    <div
      @click="$store.dispatch('restoreDefaultSettings')"
      class="btn btn-primary"
    >
      RESTORE DEFAULTS
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      update_settings: {
        screenExt: null,
      },
      screenExtPreset: {
        _4x3: { width: 800, height: 600 },
        _16x9: { width: 1024, height: 768 },
        HD: { width: 1280, height: 720 },
        Full_HD: { width: 1920, height: 1080 },
      },
      get_file_location: null,
      save_file_location: null,
    };
  },
  methods: {
    saveChanges() {
      console.log(this.update_settings);
    },
    async change_get_file_location() {
      const location = await this.$store.dispatch(
        "changeCurrentLocation",
        this.get_file_location
      );
      console.log(location);
      if (!location) {
        return;
      }
      this.get_file_location = location;
    },
    async change_save_file_location() {
      const location = await this.$store.dispatch(
        "changeCurrentLocation",
        this.save_file_location
      );
      console.log(location);
      if (!location) {
        return;
      }
      this.save_file_location = location;
    },
  },
  async mounted() {
    await this.$store.dispatch("getCurrentSettings");
    this.get_file_location = this.settings.get_file_location;
    this.save_file_location = this.settings.save_file_location;
  },
  computed: {
    settings() {
      return this.$store.getters.settings;
    },
  },
};
</script>