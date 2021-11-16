<template>
  <div class="footer-panel">
    <div class="account-wrap">
      <img src="~assets/icons/xifan.jpg" class="img" />
      <span>稀饭</span>
    </div>
    <div class="right">
      <popover spacing="15px">
        <template #reference> <span class="shutdown iconfont icon-shut-down"></span></template>
        <template #default>
          <div class="menu-list">
            <div
              class="menu-item"
              @click="handleSleepClick">
              <span class="iconfont icon-moon" ></span> 睡眠
            </div>
            <div
              class="menu-item"
              @click="handleShutDownClick">
              <span class="iconfont icon-shut-down"></span> 关机
            </div>
          </div>
        </template>
      </popover>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { SHOW_SCREEN_SAVER, SHUTDOWN } from "store/mutation-types";

import {
  viewNamespace,
  systemNamespace
} from "utils";

import Popover from "components/common/Popover";

export default {
  name: 'FooterPanel',
  components: {
    Popover
  },
  setup() {
    const store = useStore(),
          router = useRouter();

    const handleSleepClick = () => {
      store.commit(viewNamespace(SHOW_SCREEN_SAVER));
    };
    const handleShutDownClick = () => {
      store.commit(systemNamespace(SHUTDOWN));
      router.replace('/shutdown');
    };

    return {
      handleSleepClick,
      handleShutDownClick
    }
  },
}
</script>

<style lang="scss" scoped>
$bgColor: #ebe6e6a1;
$hoverColor: rgba(255, 255, 255, 0.733);

.footer-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  margin: 0 -25px;
  padding: 0 8%;
  background-color: $bgColor;
  color: #333;
  border-radius: 8px;
  border-top: 1px solid #bbb;

  .account-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 12px;
    font-size: 12px;
    border-radius: 4px;

    &:hover {
      background-color: $hoverColor;
    }

    .img {
      width: 30px;
      height: 30px;
      margin-right: 12px;
      border-radius: 50%;
    }
  }

  .right {
    .shutdown {
      padding: 10px;
      border-radius: 4px;
      line-height: 18px;
      font-size: 18px;
      cursor: pointer;

      &:hover {
        background-color: $hoverColor;
      }
    }
  }
}

.menu-list {
  width: 110px;
  padding: 5px;
  background-color: #efefef;
  font-size: 14px;
  word-break: keep-all;
  white-space: nowrap;
  border-radius: 4px;
  border: 1px solid #cdcdcd;

  .menu-item {
    padding: 4px 10px;
    margin-bottom: 4px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #ddd;
    }

    &:last-child {
      margin-bottom: 0;
    }

    .iconfont {
      margin-right: 6px;
    }
  }
}
</style>