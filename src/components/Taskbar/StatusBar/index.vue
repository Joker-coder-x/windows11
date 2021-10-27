<template>
  <div class="status-bar" draggable="false">
    <status-pick-up></status-pick-up>
    <status-info-panel></status-info-panel>
    <status-date-panel></status-date-panel>
  </div>
</template>

<script>
import StatusPickUp from "./StatusPickUp.vue";
import StatusDatePanel from "./StatusDatePanel.vue";
import StatusInfoPanel from "./StatusInfoPanel.vue";

export default {
  components: {
    StatusPickUp,
    StatusDatePanel,
    StatusInfoPanel
  },
  setup() {

  },
}
</script>

<style lang="scss" scoped>
.status-bar {
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
}
</style>