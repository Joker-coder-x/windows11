<template>
  <div class="notepad-toolbar-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "NotepadToolbarItem",
  setup() {

  },
}
</script>

<style lang="scss" scoped>
.notepad-toolbar-item {
  @include disabled-selected;
  padding: 3px 7px;
  font-size: 12px;
  border-radius: 2px;

  &:hover {
    background-color: #eee;
  }
}
</style>