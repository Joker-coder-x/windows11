<template>
  <div class="date-panel-container">
    <div class="date-panel">
      <div class="date-info">
        <div class="label-time">{{ time }}</div>
        <div class="lebel-date">{{ date }}</div>
      </div>
      <div class="date-logo">
        <i class="iconfont icon-moon"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onUnmounted, reactive } from 'vue';

function getDateInfo () {
  const date = new Date();

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes()
  };
};

export default {
  setup() {
    const dateInfo = reactive(getDateInfo());
    const time = computed(() => {
      const minute = dateInfo.minute;

      return `${dateInfo.hour}:${minute < 10 ? '0' : ''}${minute}`;
    });
    const date = computed(() => {
      return `${dateInfo.year}/${dateInfo.month}/${dateInfo.day}`;
    });

    let t = setInterval(() => {
      const _dateInfo = getDateInfo();
      dateInfo.year = _dateInfo.year;
      dateInfo.month = _dateInfo.month;
      dateInfo.day = _dateInfo.day;
      dateInfo.hour = _dateInfo.hour;
      dateInfo.minute = _dateInfo.minute;
    }, 1000);

    onUnmounted(() => {
      clearInterval(t);
      t = null;
    });

    return {
      time,
      date
    };
  },
}
</script>

<style lang="scss" scoped>
.date-panel-container {
  padding: 3px 0;
  .date-panel {
    @include disabled-selected;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    margin-right: 8px;
    padding: 2px 5px 2px 0;

    &:hover {
      background-color: #fff;
      border-radius: 4px;
    }

    &:active {
      color: #666;

      .date-logo {
        .iconfont {
          color: #777;
        }
      }
    }

    .date-info {
      margin-right: 5px;
      font-size: 9px;
      transform: scale(.85);

      .label-time {
        text-align: right;
        margin-bottom: 3px;
      }
    }

    .date-logo {
      .iconfont {
        display: inline-block;
        color: #424242;
        font-weight: 200;
        transform: rotate(10deg);
      }
    }
  }
}
</style>