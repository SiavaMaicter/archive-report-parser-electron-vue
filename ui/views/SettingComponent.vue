<template>
  <div>SETTINGS</div>
  <div
    @click="
      $store.dispatch('changeWindowSize', {
        width: 1440,
        height: 1024,
      })
    "
    class="btn btn-danger"
  >
    CHANGE SIZE
  </div>
</template>
<script>
export default {};
</script>