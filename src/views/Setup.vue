<template>
  <template v-if="resourcesPreload">
    <div class="setup" >
      <span class="iconfont icon-shut-down" @click="handleSetUp"></span>
      <span class="text">点击启动计算机</span>
    </div>
  </template>
  <template v-else>
    <loading-mask></loading-mask>
  </template>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import {
  setFullScreen,
  systemNamespace,
  systemNamespaceSymbol
} from "utils";

import {
  SETUP,
  RESOURCES_LOADED
} from "store/mutation-types";

import LoadingMask from "components/Setup/LoadingMask";

export default {
  name: "SetUp",
  components: {
    LoadingMask
  },
  setup() {
    const router = useRouter(),
          store = useStore();

    const { handleSetUp } = useSetup(store, router);
    const { resourcesPreload } = useResourcesPreload(store);

    return {
      resourcesPreload,
      handleSetUp
    };
  },
}

function useSetup (store, router) {
  const handleSetUp = () => {
    router.replace("/startingup");
    store.commit(systemNamespace(SETUP));

    setTimeout(() => setFullScreen());
  };

  return {
    handleSetUp
  };
}

function useResourcesPreload (store) {
  const systemNamespaceState = store.state[systemNamespaceSymbol],
        resourcesPreload = computed(() => systemNamespaceState.resourcesPreload);

  if (!resourcesPreload.value) {
    preloadResource()
      .then(() => {
        store.commit(systemNamespace(RESOURCES_LOADED));
      })
      .catch(res => {
        alert('资源加载失败');
        console.error('预资源加载失败:', res);
      });
  }

  return {
    resourcesPreload
  };
}

// 加载图片
function loadImage (url, resolve, reject) {
  const oImg = new Image(); //创建一个Image对象，实现图片的预下载

  oImg.onload = function (e) {
    oImg.onload = null;
    resolve(e);
  };
  oImg.onerror = function (e) {
    oImg.onerror = null;
    reject(e);
  };
  oImg.src = url;

  if (oImg.complete) {
    resolve(img);
  }
}

/**
 * 预加载资源
 */
function preloadResource () {
  const imgs = [
    require('assets/icons/bg/img106.jpg'),
    require('assets/icons/bg/img20.jpg')
  ];

  const arr = [];
  imgs.forEach(img => {
    const p = new Promise((resolve, reject) => loadImage(img, resolve, reject));
    arr.push(p);
  });

  return Promise.all(arr);
}
</script>

<style lang="scss" scoped>
.setup {
  @include flex-center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #1B1A23;
  color: #C4C4D7;

  .iconfont {
    margin-bottom: 30px;
    font-size: 6em;
    color: #49484F;
    cursor: pointer;
    background-color: transparent;

    &:hover {
      color: #ccc;
      text-shadow: 0 0 200px #eee;
      background-color: transparent;
      transition: all .25s;

      & + .text {
        letter-spacing: 20px;
        transform: rotateY(360deg) scale(1.1);
        transition: all .5s;
      }
    }

    &:active {
      color: rgb(252, 235, 190);
      text-shadow: 0 0 25px rgb(255, 187, 0);
      transform: rotateY(180deg);
      transition: all .4s;

      & + .text {
        letter-spacing: 20px;
        color: rgb(252, 235, 190);
        transform: scale(.8);
        transition: all .5s;
      }
    }
  }

  .text {
    letter-spacing: 3px;
    font-size: 18px;
    transition: all .5s;
  }
}
</style>