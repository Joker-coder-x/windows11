<template>
  <div class="time-panel">
    {{ time }}
  </div>
</template>

<script>
import { reactive, computed, onUnmounted } from 'vue';

function getTimeInfo () {
  const date = new Date();

  return {
    hour: date.getHours(),
    minute: date.getMinutes()
  };
}
export default {
  name: 'TimePanel',
  setup() {
    const timeInfo = reactive(getTimeInfo());
    const time = computed(() => {
      const minute = timeInfo.minute;

      return `${timeInfo.hour}:${minute < 10 ? '0' : ''}${minute}`;
    });

    let t = setInterval(() => {
      const _timeInfo = getTimeInfo();
      timeInfo.hour = _timeInfo.hour;
      timeInfo.minute = _timeInfo.minute;
    }, 1000);

    onUnmounted(() => {
      clearInterval(t);
      t = null;
    });

    return {
      time
    };
  },
}
</script>

<style lang="scss" scoped>
.time-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #444;
  font-size: 1.5em;
}
</style>