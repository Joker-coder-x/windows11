<template>
  <div class="nba-panel">
    <panel-header
      :logo="require('assets/icons/NBA.png')"
      title="NBA"
    ></panel-header>
    <div class="nba-panel-bd">
      <div class="team-vs">
        <team-item
          v-for="(item, index) of teams"
          :team-data="item"
          :key="index"
          :lead="item.lead"
        ></team-item>
      </div>
      <div class="race-info">
        <span>决赛</span>
        <span>10月31号</span>
      </div>
    </div>
    <div class="nba-panel-ft">
      <a
        href="https://www.msn.cn/zh-cn/sports/basketball/nba?ocid=winp2octtaskbar"
        class="lk"
        target="_blank"
      >更多 NBA</a>
    </div>
  </div>
</template>

<script>
import PanelHeader from "../PanelHeader";
import TeamItem from "./TeamItem";

const teams = [
  {
    teamLogo: require("assets/icons/team_th.png"),
    teamName: "克里夫兰骑士",
    teamScore: 92,
    lead: false
  },
  {
    teamLogo: require("assets/icons/team_th2.png"),
    teamName: "菲尼克斯太阳",
    teamScore: 101,
    lead: true
  }
];

export default {
  name: 'NbaPanel',
  components: {
    PanelHeader,
    TeamItem
  },
  setup() {
    return {
      teams
    };
  },
}
</script>

<style lang="scss" scoped>
.nba-panel {
  margin-top: 10px;
  padding: 10px;
  background-image: linear-gradient(to bottom, #EEEFF2, #c6cde9);
  border-radius: 8px;
  box-shadow: $systemRecomInfoBoardItemShadow;

  &-bd {
    display: flex;
    padding: 40px 20px;

    .team-vs {
      flex: 7;
    }

    .race-info {
      flex: 3;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.863);
    }
  }

  &-ft {
    display: flex;
    justify-content: center;
    align-items: center;

    .lk {
      height: 25px;
      padding: 0px 20px;
      font-size: 12px;
      background-color: #aeb9da;
      line-height: 25px;
      color: #003E92;
      text-decoration: none;
      border-radius: 12.5px;

      &:hover {
        background-color: transparent;
      }
    }
  }
}
</style>