<template>
  <div
    class="desktop"
    ref="desktop"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <app-item
      v-for="(item, index) of apps"
      :key="index"
      :item="item"
      @set-app-id="handleSetAppId"
    ></app-item>
  </div>
</template>

<script>
// 导入Vue API
import {
  ref,
  reactive
} from 'vue';

// 导入子组件
import AppItem from "./AppItem/index.vue";

// 组合API模块
import initLayOut from "@/composables/layout";

export default {
  components: {
    AppItem
  },
  setup () {
    const oDesktop = ref(null);
    const apps = reactive([
      {
        icon: require("assets/images/app/vscode.png"),
        name: 'VsCode',
        x: 0,
        y: 0,
        appid: null
      },
      {
        icon: require("assets/images/app/cloud-music.png"),
        name: '网易云音乐',
        x: 0,
        y: 0,
        appid: null
      }
    ]);

    const {
      handleDragOver,
      handleDrop,
      handleSetAppId
    } = initLayOut(apps, oDesktop);

    return {
      desktop: oDesktop,
      apps,
      handleDragOver,
      handleDrop,
      handleSetAppId
    }
  },
}
</script>


<style lang="scss">
.desktop {
  position: relative;
  height: $desktopHeight;
  background-image: url("~assets/images/bg/img20.jpg");
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: cover;
  box-sizing: border-box;
}
</style>