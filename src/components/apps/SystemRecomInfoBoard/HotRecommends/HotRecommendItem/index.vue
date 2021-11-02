<template>
  <div class="hot-recommend-item">
    <a
      class="hot-recommend-item-lk"
      :href="recommendData.link"
      target="_blank"
    >
      <div class="logo">
        <img
          class="img"
          :src="recommendData.logo"
          :alt="recommendData.title" />
      </div>
      <div class="info">
        <span class="title">{{ titleText }}</span>
        <span class="author">{{ recommendData.author }}</span>
      </div>
      <div class="pic">
        <img
          class="img"
          :src="recommendData.img"
          :alt="recommendData.title" />
      </div>
    </a>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
export default {
  name: "HotRecommendItem",
  props: {
    recommendData: Object
  },
  setup (props) {
    const titleText = computed(() => {
      const title = props.recommendData.title;
      return title.length >= 24 ?
        title.substr(0, 24) + '...' :
        title;
    });

    return {
      titleText
    };
  },
}
</script>

<style lang="scss" scoped>
.hot-recommend-item {
  width: 49%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d1cce0;
  }

  &-lk {
    display: flex;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: #424242;
    }


    .logo {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      width: 10%;
      .img {
        width: 16px;
        height: 16px;
      }
    }

    .info {
      width: 68%;
      display: flex;
      flex-direction: column;
      margin-right: 8px;

      .title {
        color: #333;
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 6px;
      }

      .author {
        color: #666;
        font-size: 12px;
      }
    }

    .pic {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 21%;
      .img {
        width: 60px;
        height: 60px;
        border-radius: 4px;
      }
    }
  }
}
</style>