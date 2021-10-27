<template>
  <div class="status-bar">
    <status-bar-item></status-bar-item>
    <status-bar-item></status-bar-item>
    <status-bar-item></status-bar-item>
    <status-bar-item>
      <date-view></date-view>
    </status-bar-item>
  </div>
</template>

<script>
import StatusBarItem from "./StatusBarItem.vue";
import DateView from "../DateView/index.vue";

export default {
  components: {
    StatusBarItem,
    DateView
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