<template>
  <div class="date-view">
    <div class="date-info">
      <div class="label-time">{{ time }}</div>
      <div class="lebel-date">{{ date }}</div>
    </div>
    <div class="date-logo">
      <i class="iconfont icon-moon"></i>
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
.date-view {
  @include disabled-selected;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2px 5px 2px 5px;
  padding: 0 5px;

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
    transform: scale(.9);

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
</style>