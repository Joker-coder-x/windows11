<template>
  <table class="calendar-table">
    <thead class="calendar-table-hd">
      <tr class="weekday-labels">
        <th>一</th>
        <th>二</th>
        <th>三</th>
        <th>四</th>
        <th>五</th>
        <th>六</th>
        <th>日</th>
      </tr>
    </thead>
    <tbody class="calendar-table-bd">
      <tr
        v-for="(weekdays, index) of rangeDateList"
        :key="index"
        class="weekday"
      >
        <td
          v-for="(dateInfo, index2) of weekdays"
          :key="index2"
          :class="['day', isCurDate(dateInfo) ? 'cur-day' : '', isCurMonth(dateInfo) ? '' : 'other-month', dateInfo.active ? 'active' : '']"
          @click="setActive(dateInfo)"
        >
          <div class="num">{{ dateInfo.day }}</div>
          <div class="chs">{{ dateInfo.dayCn }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { reactive, toRefs, unref, watch } from 'vue';

import { genRangeDateList } from "../utils";

export default {
  name: "CalendarTable",
  props: {
    year: Number,
    month: Number,
    date: Number,
    curDateInfo: Object
  },
  setup (props) {
    const { year: yearRef, month: monthRef } = toRefs(props);
    const rangeDateList = reactive(getRangeList(yearRef.value, monthRef.value));

    watch([yearRef, monthRef], ([year, month]) => {
      rangeDateList.length = 0;
      rangeDateList.push(...getRangeList(year, month));
    });

    const isCurDate = (dateInfo) => {
      const curDateInfo = props.curDateInfo;

      return curDateInfo.year === dateInfo.year &&
        curDateInfo.month === dateInfo.month &&
        curDateInfo.day === dateInfo.day;
    };
    const isCurMonth = (dateInfo) => monthRef.value === dateInfo.month;
    const setActive = (dateInfo) => {
      const  _rangeDateList = unref(rangeDateList);

      _rangeDateList.map(subList=> {
        subList.map(item => item.active = isSomeDate(item, dateInfo) ? !item.active : false);
      });
    };

    return {
      rangeDateList,
      isCurDate,
      isCurMonth,
      setActive
    };
  },
};

function isSomeDate (a, b) {
  return a.year === b.year &&
    a.month === b.month &&
    a.day === b. day;
}

function getRangeList (year, month) {
    const rangeDateList = genRangeDateList(year, month),
          list = [];

    while (rangeDateList.length > 0) {
      list.push(rangeDateList.splice(0, 7).map(item => Object.assign(item, { active: false })));
    }

    return list;
}
</script>

<style lang="scss" scoped>
.calendar-table {
  width: 100%;
  padding: 5px;
  border-spacing: 5px;

  &-hd {
    .weekday-labels {
      padding: 20px 0;

      th {
        font-weight: 600;
        font-size: 13px;
      }
    }
  }

  &-bd {
    .weekday {
      .day {
        width: 42px;
        height: 42px;
        text-align: center;
        vertical-align: middle;
        font-size: 13px;
        border-radius: 50%;
        margin-right: 10px;

        &:hover {
          background-color: #e5e5e5;
        }

        &:active {
          opacity: .7;
        }

        &.active {
          border: 1px solid #5C96CE;
        }

        &.cur-day {
          background-color:#196EC0;
          color: #fff;
        }

        &.cur-day:hover {
          opacity: .8;
        }

        &.other-month {
          color: #999;
        }

        .num {
          margin-bottom: 1px;
        }

        .chs {
          font-size: 10px;
          transform: scale(.85);
        }
      }
    }
  }
}
</style>