<template>
  <transition name="slide-horizontal">
    <div
      v-if="isShowSystemCalendarBoard"
      class="system-calendar-board"
      @mousedown.stop
    >
      <div class="hd">
        <div class="today-info">
          <span class="solar-date">{{ todaySolayDateText }}</span>
          <span class="lunar-date">{{ todayLunarDateText }}</span>
        </div>
        <div class="icon-wrap">
          <span
            v-if="isShowCalendar"
            class="iconfont icon-arrow-down"
            @click="handleHiddenCalendar"
          ></span>
          <span
            v-else
            class="iconfont icon-arrow-up"
            @click="handleShowCalendar"
          ></span>
        </div>
      </div>
      <div class="bd">
        <collapse-transition>
          <calendar v-show="isShowCalendar"></calendar>
        </collapse-transition>
      </div>
    </div>
  </transition>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import Calendar from "../../common/Calendar";
import CollapseTransition from "@/transition/CollapseTransition";

import solarLunar from 'solarlunar';

export default {
  name: 'SystemCalendarBoard',
  components: {
    Calendar,
    CollapseTransition
  },
  setup() {
    const store = useStore(),
      isShowCalendar = ref(true),
      isShowSystemCalendarBoard = computed(() => store.state.isShowSystemCalendarBoard),
      date = new Date();

    const todaySolayDateText = computed(() => `${date.getMonth() + 1}月${date.getDate()}日，${getChsWeekday(date.getDay())}`);
    const todayLunarDateText = computed(() => {
      const lunarData = solarLunar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
      return lunarData['monthCn'] + lunarData['dayCn'];
    });

    const handleShowCalendar = () => isShowCalendar.value = true;
    const handleHiddenCalendar = () => isShowCalendar.value = false;
    return {
      isShowCalendar,
      isShowSystemCalendarBoard,
      todaySolayDateText,
      todayLunarDateText,
      handleShowCalendar,
      handleHiddenCalendar
    };
  },
}

function getChsWeekday (weekday) {
  return {
    0: '星期日',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六'
  }[weekday];
}
</script>

<style lang="scss" scoped>
.system-calendar-board {
  @include disabled-selected;
  overflow: hidden;
  position: absolute;
  right: 1%;
  bottom: 2%;
  width: 340px;
  background-color: #eee;
  border-radius: 8px;

  .hd {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #ddd;

    .today-info {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      font-size: 13px;

      .solar-date {
        margin-bottom: 4px;
      }
    }

    .icon-wrap {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      height: 100%;

      .iconfont {
        padding: 5px;
        background-color: #fff;
        border-bottom: 1px solid #ccc;
        font-size: 14px;
        line-height: 14px;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background-color: #f5f5f5;
        }
      }
    }
  }

  .bd {
    background-color: #F2F2F2;
  }
}

.slide-horizontal-enter-active {
  animation: slide-right .25s reverse;
}

.slide-horizontal-leave-active {
  animation: slide-right .25s;
}

@keyframes slide-right {
  from {
    opacity: 1;
    transform: translateX(0%);
  }

  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>