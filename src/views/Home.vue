<template>
  <div class="home">
    <desktop></desktop>
    <taskbar></taskbar>
  </div>
</template>

<script>
import Desktop from "components/Desktop";
import Taskbar from "components/Taskbar";

export default {
  name: 'Home',
  components: {
    Desktop,
    Taskbar
  }
}
</script>
