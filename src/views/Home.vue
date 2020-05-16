<template>
  <div
    class="home flex flex-col justify-center h-screen bg-blue-500 text-white font-light"
  >
    <div>
      <p class="text-center text-2xl font-hairline tracking-wide">
        Hôm nay <br />
        bạn định làm đề thi môn gì?
      </p>
      <Picker />
      <div class="self-center flex justify-center">
        <router-link
          :to="{ name: 'AnswerSheet' }"
          class="mt-8 border border-white w-28 p-2"
        >
          <span class="text-2xl font-thin">bắt đầu làm bài</span>
        </router-link>
      </div>
      <div class="text-center mt-8">
        <span class="text-lg italic">hoặc xem lại đề đã làm</span>
      </div>
    </div>
  </div>
</template>

<script>
import Picker from '../components/Picker';

export default {
  name: 'Home',
  components: {
    Picker,
  },
};
</script>
