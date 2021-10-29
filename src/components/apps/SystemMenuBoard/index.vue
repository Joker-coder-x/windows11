<template>
  <transition name="slide">
    <div
      v-show="isShowSystemMenuBoard"
      class="system-menu-board"
    >
      <div class="false-input-wrap">
        <false-input></false-input>
      </div>
      <!-- app列表 -->
      <app-list-panel :apps="apps"></app-list-panel>
      <!-- 推荐项目 -->
      <recommend-project-panel></recommend-project-panel>
      <!-- 尾部面板 -->
      <footer-panel></footer-panel>
    </div>
  </transition>
</template>

<script>
import FalseInput from "./FalseInput.vue";
import AppListPanel from "./AppListPanel/index.vue";
import RecommendProjectPanel from "./RecommendProjectPanel/index.vue";
import FooterPanel from "./FooterPanel/index.vue";
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';

const apps = [
  {
    img: require("assets/icons/edge.png"),
    name: 'Edge'
  },
  {
    img: require("assets/icons/winWord.png"),
    name: 'Word'
  },
  {
    img: require("assets/icons/excel.png"),
    name: 'Excel'
  },
  {
    img: require("assets/icons/powerpoint.png"),
    name: 'PowerPoint'
  },
  {
    img: require("assets/icons/mail.png"),
    name: '邮件'
  },
  {
    img: require("assets/icons/calender.png"),
    name: '日历'
  },
  {
    img: require("assets/icons/store.png"),
    name: 'Store'
  },
  {
    img: require("assets/icons/photos.png"),
    name: '照片'
  },
  {
    img: require("assets/icons/settings.png"),
    name: '设置'
  },
  {
    img: require("assets/icons/msoffice.png"),
    name: 'Office'
  },
  {
    img: require("assets/icons/xbox.png"),
    name: 'Xbox'
  },
  {
    img: require("assets/icons/code.png"),
    name: 'VsCode'
  },
  {
    img: require("assets/icons/notepad.png"),
    name: '记事本'
  },
  {
    img: require("assets/icons/calculator.png"),
    name: '计算器'
  },
  {
    img: require("assets/icons/github.png"),
    name: 'github'
  },
  {
    img: require("assets/icons/paint.png"),
    name: '画图'
  },
  {
    img: require("assets/icons/cloud-music.png"),
    name: '网易云音乐'
  },
  {
    img: require("assets/icons/terminal.png"),
    name: '终端'
  },
];

export default {
  name: 'SystemMenuBoard',
  components: {
    FalseInput,
    AppListPanel,
    RecommendProjectPanel,
    FooterPanel
  },
  setup() {
    const store = useStore(),
          isShowSystemMenuBoard = computed(() => store.state.isShowSystemMenuBoard);

    return {
      apps,
      isShowSystemMenuBoard
    };
  },
}
</script>

<style lang="scss" scoped>
.slide-enter-active {
  animation: slide-up;
  animation-duration: .25s;
}

.slide-leave-active {
  animation: slide-down;
  animation-duration: .25s;
}

@keyframes slide-up {
  from {
    bottom: -100%;
    opacity: 0;
  }

  to {
    bottom: 2%;
    opacity: 1;
  }
}

@keyframes slide-down{

  from {
    opacity: 1;
  }

  to {
    bottom: -100%;
    opacity: 0;
  }
}

.system-menu-board {
  @include disabled-selected;
  overflow: hidden;
  position: absolute;
  left: 50%;
  bottom: 2%;
  width: 40%;
  padding: 25px 25px 0 25px;
  transform: translateX(-50%);
  background-color: #f2f2f2e7;
  border-radius: 8px;
}
</style>