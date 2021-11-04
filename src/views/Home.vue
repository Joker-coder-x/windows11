<template>
  <div class="home">
    <system-mask-layer></system-mask-layer>
    <system-eye-care-layer></system-eye-care-layer>
    <desktop></desktop>
    <taskbar></taskbar>
  </div>
</template>

<script>
import Desktop from "components/Desktop";
import Taskbar from "components/Taskbar";
import SystemMaskLayer from "components/apps/SystemMaskLayer";
import SystemEyeCareLayer from "components/apps/SystemEyeCareLayer";

export default {
  name: 'Home',
  components: {
    Desktop,
    Taskbar,
    SystemMaskLayer,
    SystemEyeCareLayer
  }
}
</script>

<style lang="scss" scoped>
.home {
  overflow: hidden;
  background-image: url("~assets/icons/bg/img20.jpg");
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: cover;
  box-sizing: border-box;
}
</style>
