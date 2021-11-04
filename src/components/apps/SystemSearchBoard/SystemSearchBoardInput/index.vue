<template>
  <div class="system-search-board-input">
    <span class="iconfont icon-search"></span>
    <input
      type="text"
      class="input"
      :placeholder="placeholder"
      ref="inputRef"
      :autofocus="autofocus"
    />
  </div>
</template>


<script>
import { ref } from 'vue';

export default {
  name: 'SystemSearchBoardInput',
  props: {
    placeholder: {
      type: String,
      default: '在此键入已搜索'
    },
    autofocus: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    const inputRef = ref(null);
    const focus = () => inputRef.value.focus();

    return {
      inputRef,
      focus
    };
  },
}
</script>


<style lang="scss" scoped>
.system-search-board-input {
  position: relative;
  display: flex;
  align-items: center;
  color: #666;
  font-size: 13px;

  .iconfont {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    padding-right: 10px;
  }

  .input {
    width: 100%;
    height: 35px;
    background-color: rgba(243, 241, 241, 0.932);
    border: 1px solid #ccc;
    text-indent: 2.8em;
    outline: none;
    border-radius: 6px;

    &:focus {
      border: 2px solid rgb(207, 203, 203);
      border-bottom: 2px solid #0f73d1;
      background-color: #fff;
    }
  }
}
</style>