<template>
  <div class="all-panel">
    <panel-title title="热门应用"></panel-title>
    <app-list></app-list>

    <panel-title title="最近"></panel-title>
    <lately-list></lately-list>
  </div>
</template>

<script>
import PanelTitle from "../PanelTitle.vue";
import AppList from "../AppList.vue";
import LatelyList from "../LatelyList.vue";

export default {
  name: 'AllPanel',
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
.all-panel {

}
</style>