<template>
  <div class="app-panel">
   <panel-title title="常用"></panel-title>
    <app-list></app-list>

    <panel-title title="近期"></panel-title>
    <lately-list></lately-list>
  </div>
</template>

<script>
import PanelTitle from "../PanelTitle.vue";
import AppList from "../AppList.vue";
import LatelyList from "../LatelyList.vue";

export default {
  name: 'AppPanel',
  components: {
    PanelTitle,
    AppList,
    LatelyList
  },
  setup() {

  },
}
</script>

<style lang="scss" scoped>

</style>