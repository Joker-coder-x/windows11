<template>
  <div class="weather-panel">
    <panel-header
      :logo="require('assets/icons/weather.png')"
      title="天气"
    ></panel-header>
    <div class="weather-panel-bd">
      <div class="location">
        <span class="iconfont icon-location"></span>
        <span>广东省 深圳市 福田区</span>
      </div>
      <div class="content-panel">
        <div class="today-info">
          <div class="left">
            <div class="wrap-img">
              <img
                src="~assets/icons/hc.png"
                class="img" />
            </div>
            <div class="tem-info">
              <div class="num">18</div>
              <div class="sign">
                <span class="c">°C</span>
                <span class="f">°F</span>
              </div>
            </div>
          </div>
          <div class="right">
            <span class="desc">阴</span>
            <span class="num"><span class="iconfont icon-water"></span>23%</span>
          </div>
        </div>
        <div class="others-info">
          <div class="other-item">
            <span class="date">今天</span>
            <img src="~assets/icons/hc.png" class="img" />
            <span class="highest">19°</span>
            <span class="minimum">15°</span>
          </div>
          <div class="other-item">
            <span class="date">周二</span>
            <img src="~assets/icons/h.png" class="img" />
            <span class="highest">15°</span>
            <span class="minimum">6°</span>
          </div>
          <div class="other-item">
            <span class="date">周三</span>
            <img src="~assets/icons/s.png" class="img" />
            <span class="highest">19°</span>
            <span class="minimum">6°</span>
          </div>
          <div class="other-item">
            <span class="date">周四</span>
            <img src="~assets/icons/t.png" class="img" />
            <span class="highest">10°</span>
            <span class="minimum">1°</span>
          </div>
          <div class="other-item">
            <span class="date">周五</span>
            <img src="~assets/icons/sn.png" class="img" />
            <span class="highest">3°</span>
            <span class="minimum">-3°</span>
          </div>
        </div>
      </div>
      <div class="weather-panel-ft">
        <a
          href="https://www.msn.cn/zh-cn/weather/today/weather-today/"
          class="lk"
          target="_blank"
        >查看详情</a>
      </div>
    </div>
  </div>
</template>

<script>
import PanelHeader from "../PanelHeader";

export default {
  name: 'WeatherPanel',
  components: {
    PanelHeader
  },
  setup() {

  },
}
</script>


<style lang="scss" scoped>
.weather-panel {
  padding: 10px;
  background-image: linear-gradient(45deg, #EDF1F2, #7ea1aa);
  background-repeat: no-repeat;
  border-radius: 8px;
  box-shadow: $systemRecomInfoBoardItemShadow;

  &-bd {
    .location {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      font-size: 12px;

      .iconfont {
        font-size: 12px;
        margin-right: 6px;
      }
    }

    .content-panel {
      padding: 0 12px;

      .today-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .left {
          display: flex;
          align-items: center;

          .img {
            width: 32px;
            height: 32px;
            margin-right: 8px;
          }

          .tem-info {
            display: flex;
            align-items: center;
            .num {
              margin-right: 5px;
              font-size: 34px;
            }

            .sign {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              font-size: 12px;

              .c {
                padding: 2px;
                font-size: 15px;
                border-bottom: 1px solid #444;
              }

              .f {
                padding: 2px;
                color: #444;
              }
            }
          }
        }

        .right {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          flex-direction: column;
          font-size: 13.5px;

          .desc {
            margin-bottom: 4px;
          }

          .num {
            .iconfont {
              color: #333;
              font-size: 12px;
            }
          }
        }
      }

      .others-info {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .other-item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 10px;
          background-color: rgba(236, 241, 243, 0.9);
          font-size: 12px;
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            background-color: rgba(255, 255, 255, 0.9);
          }

          .date {
            margin-bottom: 10px;
          }

          .img {
            width: 16px;
            height: 16px;
            margin-bottom: 15px;
          }

          .highest {
            margin-bottom: 8px;
            font-weight: 500;
          }

          .minimum {
            color: #666;
          }
        }
      }
    }
  }

  &-ft {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px 0 10px 0;
    font-size: 14px;

    .lk {
      color: #003E92;
      text-decoration: none;
    }

    .lk:hover {
      text-decoration: underline;
    }
  }
}
</style>