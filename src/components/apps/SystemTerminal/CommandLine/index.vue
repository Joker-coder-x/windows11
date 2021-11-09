<template>
  <div
    class="command-line"
    :style="{ marginTop: gap ? '15px' : '' }"
  ><slot></slot></div>
</template>

<script>
export default {
  name: "CommandLine",
  props: {
    gap: {
      type: Boolean,
      default: false
    }
  },
  setup() {

  },
}
</script>

<style lang="scss" scoped>
.command-line {
  word-break: keep-all;
  white-space: nowrap;
}
</style>