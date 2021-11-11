<template>
  <div class="starting-up">
    <img class="logo"
      src="~assets/logo.svg" />
    <img class="loading" src="~assets/gif/loading.gif" />

    <video
      class="video"
      controls
      autoplay
      @ended="handleEnded"
    >
      <source src="~assets/gif/bootAnimation.mp4" type="video/mp4">
      <source src="~assets/gif/bootAnimation.webm" type="video/webm">
      <p>Your browser doesn't support HTML5 video. Here is
        a <a href="myVideo.mp4">link to the video</a> instead.</p>
    </video>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: "StartingUp",
  setup() {
    const router = useRouter();
    const handleEnded = () => router.replace('/home');

    return {
      handleEnded
    };
  },
}
</script>

<style lang="scss" scoped>
.starting-up {
  @include flex-center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #000;

  .logo {
    width: 64px;
    height: 64px;
    margin-bottom: 30vh;
  }

  .loading {
    width: 220px;
    height: 103px;
    transform: scale(.5);
    background-size: cover;
  }

  .video {
    visibility: hidden;
  }
}
</style>