<template>
  <div class="notepad-status-bar">
    <div class="notepad-status-bar-item line">行 1，列 1</div>
    <div class="notepad-status-bar-item os">Windows(CRLF)</div>
    <div class="notepad-status-bar-item precent">100%</div>
    <div class="notepad-status-bar-item encoding">UTF-8</div>
  </div>
</template>

<script>
export default {
  name: "NotepadStatusBar",
  setup() {

  },
}
</script>

<style lang="scss" scoped>
.notepad-status-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #F0F0F0;

  &-item {
    padding: 3px 8px;
    border-left: 1px solid #ccc;
    font-size: 10px;
    color: #424242;
    transform: scale(.9);

    &.precent {
      width: 5%;
    }

    &.line {
      width: 13%;
    }

    &.os {
      width: 13%;
    }

    &.encoding {
      width: 13%;
    }
  }
}
</style>