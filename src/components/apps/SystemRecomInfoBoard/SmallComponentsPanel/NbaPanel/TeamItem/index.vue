<template>
  <div :class="['team-item', lead ? 'lead' : '']">
    <div class="team-info">
      <img
        :src="teamData.teamLogo"
        class="team-logo" />
      <span class="team-name">{{ teamData.teamName }}</span>
    </div>
    <div class="score">{{ teamData.teamScore }}</div>
  </div>
</template>

<script>
export default {
  name: 'TeamItem',
  props: {
    teamData: Object,
    lead: Boolean
  },
  setup() {

  }
}
</script>


<style lang="scss" scoped>
.team-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;

  &.lead {
    font-weight: bold;
  }

  .team-info {
    display: flex;
    align-items: center;

    .team-logo {
      width: 28px;
      height: 28px;
      margin-right: 10px;
    }
  }
}
</style>