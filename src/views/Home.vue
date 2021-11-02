<template>
  <div class="home">
    <system-mask-layer></system-mask-layer>
    <desktop></desktop>
    <taskbar></taskbar>
  </div>
</template>

<script>
import Desktop from "components/Desktop";
import Taskbar from "components/Taskbar";
import SystemMaskLayer from "components/apps/SystemMaskLayer";

export default {
  name: 'Home',
  components: {
    Desktop,
    Taskbar,
    SystemMaskLayer
  }
}
</script>

<style lang="scss" scoped>
.home {
  background-image: url("~assets/images/bg/img20.jpg");
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: cover;
  box-sizing: border-box;
}
</style>
