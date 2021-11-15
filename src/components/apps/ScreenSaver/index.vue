<template>
  <transition name="slide">
    <div
      v-if="isShow"
      class="screen-saver"
      :style="{ top: `${y}px` }"
      ref="saverRef"
      @mousedown.stop="handlePageMouseDown"
    >
      <div class="date-info">
        <div class="time">{{ timeText }}</div>
        <div class="date">{{ dateText }}</div>
      </div>

      <div class="tip tip1" @mousedown.stop>
        <a target="_blank" href="https://cn.bing.com/images/search?q=lake+district+england+scenery&filters=IsConversation:%22True%22+BTWLKey:%22KentmereEngland%22+BTWLType:%22Trivia%22&trivia=1&qft=+filterui:photo-photo&ensearch=0&form=EMSDS0&first=1&tsc=ImageBasicHover" class="lk">
          <span class="iconfont icon-search"></span>
          <p>如果这片风景让你想起一幅美丽的画卷，可能因为此处一直是艺术家的灵感源泉。</p>
          <div class="hidden">这些艺术家中也包括摄影师</div>
        </a>
      </div>
      <div class="tip tip2" @mousedown.stop>
        <a target="_blank" href="https://cn.bing.com/search?q=lake+district+national+park&filters=IsConversation:%22True%22+BTWLKey:%22KentmereEngland%22+BTWLType:%22Trivia%22&ensearch=0&FORM=EMSDS0" class="lk">
          <span class="iconfont icon-search"></span>
          <p>这个国家公园群山环绕，然后它并不叫山区。</p>
          <div class="hidden">它因山中小湖而得名，未作"丘陵"</div>
        </a>
      </div>
      <div class="tip tip3" @mousedown.stop>
        <a target="_blank" href="https://cn.bing.com/search?q=lake+district+national+park&filters=IsConversation:%22True%22+BTWLKey:%22KentmereEngland%22+BTWLType:%22Trivia%22&ensearch=0&FORM=EMSDS0" class="lk">
          <span class="iconfont icon-camera"></span>
          <p>喜欢这张照片吗？</p>
          <div class="hidden">
            <div class="label">
              英国湖区国家公园
              <div class="small">© Cavan Images / Offset</div>
            </div>
            <div class="comment">感谢你的反馈，我们将使用你的反馈，在不久后改进此项功能。</div>
          </div>
        </a>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch
} from 'vue';
import { useStore } from 'vuex';

import {
  WEEK_DAY_MAP,
  $on,
  $off,
  leadingZeroFill
} from "utils";

import { HIDDEN_SCREEN_SAVER } from "store/mutation-types";

export default {
  name: "ScreenSaver",
  setup () {
    const store = useStore(),
          saverRef = ref(null);

    const { timeText, dateText } = getTimeModuleState();
    const isShow = computed(() => store.state.isShowScreenSaver);
    const { y, handlePageMouseDown } = getSlideModule(store, isShow, saverRef);

    return {
      isShow,
      timeText,
      dateText,
      y,
      saverRef,
      handlePageMouseDown,
    };
  },
}

function getTimeModuleState () {
  const d = new Date(),
        month = ref(d.getMonth()),
        date = ref(d.getDate()),
        day = ref(d.getDay()),
        hour = ref(d.getHours()),
        minute = ref(d.getMinutes());

  const timeText = computed(() => `${hour.value}:${leadingZeroFill(minute.value)}`);
  const dateText = computed(() => `${month.value + 1}月${date.value}日，${WEEK_DAY_MAP[day.value]}`);

  const setDateInfo = () => {
    const _d = new Date();
    month.value = _d.getMonth();
    date.value = _d.getDate();
    day.value = _d.getDay();
    hour.value = _d.getHours();
    minute.value = _d.getMinutes();
  };

  let t = setInterval(() => setDateInfo, 1000);

  onUnmounted(() => {
    clearInterval(t);
    t = null;
  });

  return {
    timeText,
    dateText
  };
}

function getSlideModule (store, isShow, saverRef) {
  let isMouseDown = false,
      timer = null,
      y =  ref(0),
      offsetY = 0,
      saverOffsetHeight = 0;

  const resetSlide = () => {
    y.value = 0;
  };
  const hiddenSlide = () => {
    store.commit(HIDDEN_SCREEN_SAVER);
  }

  watch(isShow, newVal => {
    if (newVal) {
      resetSlide();
    }
  });

  const handlePageMouseDown = (e) => {
    isMouseDown = true;
    timer = setTimeout(() => {
      isMouseDown = false;
      hiddenSlide();
    }, 100);
    offsetY = e.offsetY;
  };
  const handlePageMouseMove = (e) => {
    clearTimeout(timer);

    if (isMouseDown) {
      const top = (offsetY - e.pageY) * -1;
      y.value  = (top > 0 ? 0 : top);
    }
  };
  const handlePageMouseUp = () => {
    if (isMouseDown && saverRef) {
      isMouseDown = false;

      if (Math.abs(y.value) >= ((saverOffsetHeight || saverRef.value.offsetHeight) / 2)) {
        hiddenSlide();
      } else {
        resetSlide();
      }
    }
  };
  const handleKeyDown = () => hiddenSlide();

  onMounted(() => {
    saverOffsetHeight = (saverRef.value && saverRef.value.offsetHeight) || 0;
    $on(document, 'mousemove', handlePageMouseMove, false);
    $on(document, 'mouseup', handlePageMouseUp, false);
    $on(document, 'keydown', handleKeyDown, false);
  });

  onUnmounted(() => {
    $off(document, 'mousemove', handlePageMouseMove, false);
    $off(document, 'mouseup', handlePageMouseUp, false);
    $off(document, 'keydown', handleKeyDown, false);
  });

  return {
    y,
    handlePageMouseDown
  };
}
</script>

<style lang="scss" scoped>
.slide-leave-active {
  animation: slide-top .5s ease-in-out;
}

@keyframes slide-top {
  from  {
    top: 0%;
  }

  to {
    top: -100%;
  }
}

.screen-saver {
  @include disabled-selected;
  position: fixed;
  left: 0;
  top: 0;
  z-index: $lockPageZIndex;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-image: url(~assets/icons/bg/img106.jpg);
  background-size: cover;
  background-repeat: no-repeat;

  .date-info {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 15vh;
    color: #fff;
    text-shadow: 0 0 200px rgba(153, 153, 153, 0.938);

    .time {
      margin-bottom: 15px;
      font-size: 5em;
      font-weight: bold;
    }

    .date {
      font-size: 18px;
      text-shadow: 0 0 20px #666;
    }
  }

  .tip {
    position: absolute;

    .lk {
      display: block;
      width: 100%;
      height: 100%;
      padding: 10px;
      color: #fff;
      text-decoration: none;
      text-align: center;
      font-size: 14px;
      line-height: 18px;
      text-shadow: 0 0 10px rgba(102, 102, 102, 0.897);
      border-radius: 8px;
      transition: all .5s;

      &:hover {
        background-color: rgba(34, 34, 34, 0.856);
        transition: all .5s;

        .iconfont {
          background-color: transparent;
        }

        .hidden {
          display: block;
          color: #ccc;
        }
      }

      .iconfont {
        padding: 5px;
        background-color: #373737;
        font-size: 20px;
        line-height: 20px;
        border-radius: 4px;
        color: #eee;
      }

      .hidden {
        display: none;
        font-size: 12px;
      }
    }
  }

  .tip1 {
    top: 2%;
    left: 2%;
    width: 16em;
  }

  .tip2 {
    left: 50%;
    top: 60%;
    width: 16em;
    transform: translate(-50%, -50%);
  }

  .tip3 {
    top: 2%;
    right: 5%;

    .lk {
      .hidden {
        .label {
          width: 100%;
          padding: 10px 10px 5px 10px;
          margin-bottom: 10px;
          color: #fff;
          font-size: 20px;
          font-weight:  bold;
          border-radius: 4px;

          .small {
            margin-top: 16px;
            color: #bbb;
            font-size: 9px;
            transform: scale(.8);
          }

          &:hover {
            background-color: rgba(83, 81, 81, 0.877);
          }
        }

        .comment {
          width: 22em;
          margin-top: 16px;
          color: #aaa;
          font-size: 14px;
          text-align: left;
          line-height: 20px;
        }
      }
    }
  }
}
</style>