<template>
  <button
    class="focus:outline-none h-48 flex justify-center items-center text-6xl border-8"
    :class="
      !active
        ? `text-white bg-${color}-500 border-white`
        : `z-10 text-${color}-500 bg-white border-${color}-500 shadow-xl`
    "
    @click="$emit('selectAnswer')"
  >
    <span>{{ letter }}</span>
  </button>
</template>

<script>
export default {
  name: 'AnswerPad',
  props: ['letter', 'color', 'active'],
  data() {
    return {};
  },
};
</script>

<style></style>
