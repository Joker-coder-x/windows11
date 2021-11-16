<template>
  <div class="notepad-toolbar">
    <notepad-toolbar-item>文件(F)</notepad-toolbar-item>
    <notepad-toolbar-item>保存(E)</notepad-toolbar-item>
    <notepad-toolbar-item>格式(O)</notepad-toolbar-item>
    <notepad-toolbar-item>视图(V)</notepad-toolbar-item>
    <notepad-toolbar-item>帮助(H)</notepad-toolbar-item>
  </div>
</template>

<script>
import NotepadToolbarItem from "./NotepadToolbarItem.vue";

export default {
  name: "NotepadToolbar",
  components: {
    NotepadToolbarItem
  },
  setup() {

  },
}
</script>

<style lang="scss" scoped>
.notepad-toolbar {
  display: flex;
  border-bottom: 1px solid #ddd;
}
</style>