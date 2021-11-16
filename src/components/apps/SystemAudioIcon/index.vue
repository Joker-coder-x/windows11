<template>
  <img :src="filename" />
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import { systemNamespaceSymbol } from "utils";

const audioPaths = {
  high: require('assets/icons/audio/audio_high.png'),
  mid: require('assets/icons/audio/audio_mid.png'),
  low: require('assets/icons/audio/audio_low.png'),
  close: require('assets/icons/audio/audio_close.png'),
};

export default {
  name: 'SystemAudioIcon',
  setup() {
    const store = useStore(),
          systemNamespaceState = store.state[systemNamespaceSymbol];

    const filename = computed(() => {
      const audioValue = systemNamespaceState.audioValue;

      let filename = '';
      if (audioValue >= 80) {
        filename = audioPaths.high;
      } else if (audioValue >= 50 && audioValue < 80) {
        filename = audioPaths.mid;
      } else if (audioValue > 0 && audioValue < 50) {
        filename = audioPaths.low;
      } else {
        filename = audioPaths.close;
      }

      return filename;
    });

    return {
      filename
    };
  },
}
</script>

<style lang="scss" scoped>

</style>