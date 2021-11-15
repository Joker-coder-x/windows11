<template>
  <div class="loading-mask">
    <img src="~assets/gif/bootLoader.gif" class="img" />
    <span class="text">资源加载中{{ ellipsis }}</span>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "LoadingMask",
  setup () {
    const { ellipsis } = useEllipsis();

    return {
      ellipsis
    };
  },
};

function useEllipsis () {
  const ellipsis = ref('.');

  setInterval(() => {
    const str = ellipsis.value;

    ellipsis.value = str.length === 3 ? '.' : str + '.';
  }, 500);

  return {
    ellipsis
  };
}
</script>

<style lang="scss" scoped>
.loading-mask {
  @include flex-center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  color: #fff;
  opacity: .9;

  .img {
    width: 32px;
    height: 32px;
    margin-bottom: 10px;
  }

  .text {
    font-size: 14px;
  }
}
</style>