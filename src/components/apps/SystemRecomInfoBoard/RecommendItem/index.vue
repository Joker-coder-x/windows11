<template>
  <div class="recommend-item">
    <div class="subs">
      <div
        class="sub-item"
        v-for="item of recommendData.subs"
        :key="item.id"
        :style="{
          backgroundImage: `url(${item.img})`
        }"
      >
        <a
          class="sub-item-lk"
          :href="item.link"
          target="_blank"
        >
          <div class="info">
            <div class="logo">
              <img
                class="img"
                :src="item.logo"
                :alt="item.title" />
              <span class="author">{{ item.author }}</span>
            </div>
            <div class="title">{{ cut(item.title) }}</div>
          </div>
        </a>
      </div>
    </div>
    <div class="main">
      <div
        class="main-item"
         :style="{
          backgroundImage: `url(${recommendData.main.img})`
        }"
      >
        <a
          class="main-item-lk"
          :href="recommendData.main.link"
          target="_blank"
        >
          <div class="info">
            <div class="logo">
              <img
                class="img"
                :src="recommendData.main.logo"
                :alt="recommendData.main.title" />
              <span class="author">{{ recommendData.main.author }}</span>
            </div>
            <div class="title">{{ cut(recommendData.main.title) }}</div>
            <div class="desc">{{ cut(recommendData.main.desc) }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendItem',
  props: {
    recommendData: Object
  },
  setup() {
    const cut = (str) => {
      return str.length > 50 ?
        str.substr(0, 50) + '...' :
        str;
    }

    return {
      cut
    };
  }
};
</script>

<style lang="scss" scoped>
@mixin _before {
  content: '';
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

@mixin _public-item {
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  box-shadow: $systemRecomInfoBoardItemShadow;
  border-radius: 8px;

  &-lk {
    text-decoration: none;
    color: #333;


    &:hover {
      text-decoration: underline;
    }
  }
}

@mixin _public-img {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.recommend-item {
  .subs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .sub-item {
      @include _public-item;
      width: 49%;
      height: 300px;
      margin-bottom: 12px;

      &::before {
        @include _before;
        background-image: linear-gradient(rgba(233,226,226,0) 30%, rgba(75, 70, 70, 0.836) 70%);
      }

      &-lk {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 15px;

        &:hover {
          color: #fff;
        }

        .info {
          position: relative;
          z-index: 2;
          width: 100%;
          min-height: 30%;
          color: #fff;

          .logo {
            display: flex;
            align-items: center;
            margin-bottom: 15px;

            .img {
              @include _public-img;
            }

            .author {
              font-size: 13px;
            }
          }

          .title {
            line-height: 23px;
            font-weight: bold;
          }
        }
      }
    }
  }

  .main {
    .main-item {
      @include _public-item;
      height: 300px;
      padding: 20px;
      margin-bottom: 20px;

      &::before {
        @include _before;
        background-image: linear-gradient(to right, rgba(238, 230, 230, 0.9) 50%,  rgba(223, 207, 207, 0) 90%);
      }

      &-lk {
        .info {
          position: relative;
          z-index: 2;
          width: 50%;

          .logo {
            display: flex;
            align-items: center;
            margin-top: 40px;
            margin-bottom: 15px;

            .img {
              @include _public-img;
            }

            .author {
              font-size: 13px;
            }
          }

          .title {
            margin-bottom: 10px;
            font-weight: bold;
          }

          .desc {
            color: rgba(70, 67, 67, 0.89);
            font-size: 14px;
            line-height: 20px;
          }
        }
      }
    }
  }
}
</style>