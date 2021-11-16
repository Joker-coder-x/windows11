<template>
  <div class="home">
    <system-mask-layer></system-mask-layer>
    <system-eye-care-layer></system-eye-care-layer>
    <desktop></desktop>
    <taskbar></taskbar>

    <!-- 屏保组件 -->
    <screen-saver></screen-saver>
  </div>
</template>

<script>
import Desktop from "components/Home/Desktop";
import Taskbar from "components/Home/Taskbar";
import SystemMaskLayer from "components/apps/SystemMaskLayer";
import SystemEyeCareLayer from "components/apps/SystemEyeCareLayer";
import ScreenSaver from "components/apps/ScreenSaver";

export default {
  name: 'Home',
  components: {
    Desktop,
    Taskbar,
    SystemMaskLayer,
    SystemEyeCareLayer,
    ScreenSaver
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
