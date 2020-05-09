<template>
  <div
    class="home flex flex-col justify-center h-screen bg-blue-500 text-white font-light"
  >
    <div>
      <p class="text-center text-2xl font-hairline tracking-wide">
        Hôm nay <br />
        bạn định làm đề thi môn gì?
      </p>
      <div
        class="flex items-center justify-center h-24 w-64
        bg-white
        mx-auto mt-8
        rounded-lg shadow-lg"
      >
        <img class="h-16 w-16" src="math.png" />
        <div class="ml-4">
          <p class="text-4xl text-blue-700">Toán</p>
          <p
            class="text-sm uppercase tracking-wide text-blue-500 -mt-2"
          >
            50 câu, 90 phút
          </p>
        </div>
      </div>
      <div class="self-center flex justify-center">
        <button class="mt-8 border border-white w-28 p-2">
          <span class="text-2xl font-thin">bắt đầu làm bài</span>
        </button>
      </div>
      <div class="text-center mt-8">
        <span class="text-lg italic">hoặc xem lại đề đã làm</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
};
</script>
