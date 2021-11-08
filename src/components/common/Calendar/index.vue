<template>
  <div class="calendar">
    <div class="calendar-hd">
      <div class="date-info"><span>{{ chsYearMonthText }}</span></div>
      <div
        class="icon-item"
        @click="handlePrevMonth"
      >
        <span class="iconfont icon-arrow-up-fill"></span>
      </div>
      <div
        class="icon-item"
        @click="handleNextMonth"
      >
        <span class="iconfont icon-arrow-down-fill"></span>
      </div>
    </div>
    <div class="calendar-bd">
      <calendar-table
        :year="localYear"
        :month="localMonth"
        :date="localDate"
        :cur-date-info="curDateInfo"
      ></calendar-table>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, unref } from 'vue';
import CalendarTable from "./CalendarTable";

export default {
  name: "Calendar",
  props: {
    year: {
      type: [Number, String],
      default: new Date().getFullYear()
    },
    month: {
      type: [Number, String],
      default: new Date().getMonth()
    },
    date: {
      type: [Number, String],
      default: new Date().getDate()
    }
  },
  components: {
    CalendarTable
  },
  setup (props, { emit }) {
    const localYear = ref(Number(props.year)),
          localMonth = ref(Number(props.month)),
          localDate = ref(Number(props.date)),
          date = new Date();

    const curDateInfo = reactive({
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate()
    });

    const chsYearMonthText = computed(() => `${localYear.value}年${localMonth.value + 1}月`);
    const handlePrevMonth = () => {
      const month = unref(localMonth);
      if (month === 0) {
        -- localYear.value;
        localMonth.value = 11;
      } else {
        localMonth.value = month - 1;
      }
    };
    const handleNextMonth = () => {
      const month = unref(localMonth);
      if (month === 11) {
        ++ localYear.value;
        localMonth.value = 0;
      } else {
        localMonth.value = month + 1;
      }
    };

    return {
      localYear,
      localMonth,
      localDate,
      curDateInfo,
      chsYearMonthText,
      handlePrevMonth,
      handleNextMonth
    }
  },
};
</script>

<style lang="scss" scoped>
$tableheaderHoverColor: #e9e9e9;

.calendar {
  .calendar-hd {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 8px;

    .date-info {
      width: 75%;
      padding: 8px;
      font-size: 13px;
      font-weight: bold;
      color: #424242;
      border-radius: 4px;

      &:hover {
        background-color: $tableheaderHoverColor;
        cursor: pointer;
      }
    }

    .icon-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 10%;
      padding: 8px 0;
      border-radius: 4px;

      &:hover {
        background-color: $tableheaderHoverColor;
        cursor: pointer;
      }

      .iconfont {
        color: #777;
        font-size: 14px;
      }
    }
  }

  .calendar-bd {

  }
}
</style>