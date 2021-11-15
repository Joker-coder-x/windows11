<template>
  <div class="shutdown" v-if="!isSetup">
    <img class="img" src="~assets/gif/shutting-down.gif" />
  </div>
</template>

<script>
import { computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: "Shutdown",
  props: {
    delay: {
      type: [Number, String],
      default: 3000
    }
  },
  setup (props) {
    const router = useRouter();
    const store = useStore();
    const isSetup = computed(() => store.state.isSetup);

    let t = setTimeout(() => {
      router.replace('/');
    }, parseInt(props.delay));

    onUnmounted(() => {
      clearTimeout(t);
      t = null;
    });

    return {
      isSetup
    };
  },
}
</script>

<style lang="scss" scoped>
.shutdown {
  @include flex-center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #025A9C;
  z-index: 10000;
}
</style>