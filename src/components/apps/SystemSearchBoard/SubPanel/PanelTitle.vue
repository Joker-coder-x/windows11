<template>
  <div class="panel-title">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  setup() {

  },
}
</script>

<style lang="scss" scoped>
.panel-title {
  font-weight: bold;
}
</style>

