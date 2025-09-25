<template>
  <div>
    <div class="wrapper">
      <aside class="sidebar" :class="sidebar_state == true ? 'expand' : ''">
        <div class="d-flex">
          <ul class="sidebar-nav">
            <li class="sidebar-toggle sidebar-item" type="button" @click="toggleSidebar()">
              <img src="../public/gasIcon.svg" class="sidebar-icon" />
            </li>
            <li class="sidebar-item">
              <router-link :to="{ name: 'report' }" class="sidebar-text">
                <img src="../public/listIcon.svg" class="sidebar-icon" />
                <span> Формирование отчета </span>
              </router-link>
            </li>
            <li class="sidebar-item">
              <router-link :to="{ name: 'list' }" class="sidebar-text">
                <img src="../public/reportIcon.svg" class="sidebar-icon" />
                <span> Список котельных </span>
              </router-link>
            </li>
            <li class="sidebar-item">
              <router-link :to="{ name: 'settings' }" class="sidebar-text">
                <img src="../public/settingIcon.svg" class="sidebar-icon" />
                <span> Настройки </span>
              </router-link>
            </li>
          </ul>
        </div>
      </aside>
      <div class="main p-3">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sidebar_state: null,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebar_state = !this.sidebar_state;
    },
  },
  mounted() {
    this.$store.dispatch("RestoreHeatbases");
    // this.$store.dispatch("restoreDefaultSettings");
  },
};
</script>
<style lang="scss">
::after,
::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

h1 {
  font-weight: 600;
  font-size: 1.5rem;
}

body {
  font-family: "Poppins", sans-serif;
}

.wrapper {
  display: flex;
}

.sidebar-icon {
  max-height: 40px;
  max-width: 40px;
}

.main {
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  transition: all 0.35ms ease-in-out;
}

.sidebar {
  width: 70px;
  min-width: 70px;
  z-index: 1000;
  transition: all 0.25s ease-in-out;
  display: flex;
  flex-direction: column;
  background-color: #faebd7;
}

.sidebar.expand {
  width: 260px;
  min-width: 260px;
}

.sidebar-text {
  text-decoration: none;
  color: currentColor;
  cursor: default;

  :hover {
    cursor: pointer;
    background-color: rgb(204, 174, 134);
  }

  // pointer-events: none;
}

.sidebar-toggle {
  max-width: 40px;
  max-height: 40px;
  cursor: pointer;
  border-radius: 10%;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}

.sidebar-toggle:hover {
  background-color: rgb(204, 174, 134);
}

.sidebar-logo {
  margin: auto 0;
}

.sidebar-logo a {
  color: #fff;
  font-size: 1.15rem;
  font-weight: 600;
}

.sidebar:not(.expand) .sidebar-item {
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

// .sidebar:not(.expand) .sidebar-toggle {
//   margin-left: auto;
//   margin-right: auto;
// }
.sidebar:not(.expand) .sidebar-logo,
.sidebar:not(.expand) .sidebar-item span {
  display: none;
}

.sidebar-nav {
  padding: 2rem 0;
  flex: 1 1 auto;
}

a.sidebar-link {
  padding: 0.625rem 1.625rem;
  color: #fff;
  display: block;
  font-size: 0.9rem;
  white-space: nowrap;
  border-left: 3px solid transparent;
}

.sidebar-item {
  display: flex;
  flex-direction: row;
}
</style>
