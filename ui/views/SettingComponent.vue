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
          screenExt.width
            ? `${screenExt.width}x${screenExt.height}`
            : "Выберете разрешение"
        }}
      </button>
      <div class="dropdown-menu" aria-labelledby="triggerId">
        <button
          class="dropdown-item"
          v-for="(ext, key) in screenExtPreset"
          :key="key"
          @click="
            screenExt = {
              width: ext.width,
              height: ext.height,
            }
          "
        >
          {{ `${ext.width}x${ext.height}` }}
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
          aria-label="Text for screen reader"
          v-model="request_get_file_location"
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
        <input
          class="form-check-input"
          type="checkbox"
          name="report_directory_checkbox"
          aria-label="Text for screen reader"
          v-model="request_save_file_location"
        />
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
      screenExt: {},
      screenExtPreset: {
        _4x3: { width: 800, height: 600 },
        _16x9: { width: 1024, height: 768 },
        HD: { width: 1280, height: 720 },
        Full_HD: { width: 1920, height: 1080 },
      },
      get_file_location: null,
      request_get_file_location: null,
      save_file_location: null,
      request_save_file_location: null,
    };
  },
  methods: {
    saveChanges() {
      this.$store.dispatch("updateSettings", {
        width: this.screenExt.width,
        height: this.screenExt.height,
        get_file_location: this.get_file_location,
        request_get_file_location: this.request_get_file_location,
        save_file_location: this.save_file_location,
        request_save_file_location: this.request_save_file_location,
      });
    },
    async change_get_file_location() {
      const location = await this.$store.dispatch(
        "changeCurrentLocation",
        this.get_file_location
      );
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
      if (!location) {
        return;
      }
      this.save_file_location = location;
    },
  },
  async mounted() {
    await this.$store.dispatch("getCurrentSettings");
    this.screenExt.width = this.settings.width;
    this.screenExt.height = this.settings.height;
    this.get_file_location = this.settings.get_file_location;
    this.request_get_file_location = this.settings.request_get_file_location;
    this.save_file_location = this.settings.save_file_location;
    this.request_save_file_location = this.settings.request_save_file_location;
  },
  computed: {
    settings() {
      return this.$store.getters.settings;
    },
  },
};
</script>