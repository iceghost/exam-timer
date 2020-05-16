<template>
  <div class="flex flex-col items-center">
    <nav
      class="w-full flex items-center justify-center h-16 bg-blue-500 text-white"
    >
      <span class="flex text-3xl">
        30
        <span class="text-sm -mt-1">m</span>
        20
        <span class="text-sm -mt-1">s</span>
      </span>
      <button
        class="p-1 ml-5 uppercase font-semibold hover:shadow-xl"
        @click="pause = !pause"
      >
        {{ !pause ? 'Tạm dừng' : 'Làm tiếp' }}
      </button>
    </nav>
    <div
      class="mt-5 md:mx-auto w-full md:w-2/3 grid grid-cols-2 md:grid-cols-4"
    >
      <AnswerPad
        letter="A"
        color="red"
        :active="selected == 'A'"
        @selectAnswer="selected = selected == 'A' ? null : 'A'"
      />
      <AnswerPad
        letter="B"
        color="blue"
        :active="selected == 'B'"
        @selectAnswer="selected = selected == 'B' ? null : 'B'"
      />
      <AnswerPad
        letter="C"
        color="yellow"
        :active="selected == 'C'"
        @selectAnswer="selected = selected == 'C' ? null : 'C'"
      />
      <AnswerPad
        letter="D"
        color="green"
        :active="selected == 'D'"
        @selectAnswer="selected = selected == 'D' ? null : 'D'"
      />
    </div>
    <div class="center mt-5 text-4xl text-blue-500">
      &lt;
      <span class="border-2 border-blue-500 rounded-full p-3">
        30</span
      >
      &gt;
    </div>
    <div
      class="mt-5 w-full md:w-2/3 grid grid-cols-5 md:grid-cols-10"
    >
      <button
        class="focus:outline-none m-1 text-center border rounded"
        :class="
          currentQuestion == i
            ? 'bg-blue-900 text-white font-bold border-none'
            : 'bg-white text-blue-900 font-light border-blue-200'
        "
        v-for="i in 50"
        :key="i"
        @click="currentQuestion = i"
      >
        {{ i }}
      </button>
    </div>
  </div>
</template>

<script>
import AnswerPad from '../components/AnswerPad';
export default {
  name: 'AnswerSheet',
  data() {
    return {
      pause: false,
      selected: null,
      currentQuestion: 30,
    };
  },
  components: { AnswerPad },
};
</script>
