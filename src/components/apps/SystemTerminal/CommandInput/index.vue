<template>
  <div class="command-input">
    <div class="placeholder">C:\User\xifan></div>
    <div
      class="input"
      ref="inputRef"
      contenteditable="true"
      @keydown.enter="handleKeyEnterDown"
    ></div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "command-input",
  emits: {
    onSubmitCommand: null,
  },
  setup (props, { emit }) {
    const inputRef = ref('');
    const handleKeyEnterDown = () => {
      const el = inputRef.value;

      blur();
      emit('onSubmitCommand', el.innerHTML.trim());
      setTimeout(() => el.innerHTML = '');
    };
    const focus = () => inputRef.value.focus();
    const blur = () => inputRef.value.blur();

    return {
      inputRef,
      focus,
      blur,
      handleKeyEnterDown
    };
  },
}
</script>

<style lang="scss" scoped>
.command-input {
  position: relative;
  margin-top: 15px;
  word-break: keep-all;
  white-space: pre;

  .placeholder {
    position: absolute;
    left: 0;
    top: 0;
  }

  .input {
    flex: auto;
    text-indent: 8.6em;

    &:focus {
      outline: none;
    }
  }
}
</style>