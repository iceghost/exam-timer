<template>
  <button
    class="flex items-center justify-center h-24 w-64
        bg-white
        mx-auto mt-8
        rounded-lg shadow-lg"
    @click="updateSubject"
  >
    <img class="h-16 w-16" :src="subject.img" />
    <div class="ml-4">
      <transition>
        <div class="flex items-center justify-between">
          <span class="text-4xl text-blue-700">{{
            subject.name
          }}</span>
        </div>
      </transition>
      <p class="text-sm uppercase tracking-wide text-blue-500 -mt-2">
        {{ subject.questions }} câu, {{ subject.minutes }} phút
      </p>
    </div>
  </button>
</template>

<script>
export default {
  name: 'Picker',
  data() {
    return {
      subject: null,
      subjects: [
        {
          name: 'Toán',
          questions: 50,
          minutes: 90,
          img: 'maths.png',
        },
        {
          name: 'Lý',
          questions: 40,
          minutes: 50,
          img: 'physics.png',
        },
        {
          name: 'Hóa',
          questions: 40,
          minutes: 50,
          img: 'chemistry.png',
        },
      ],
      index: 0,
    };
  },
  methods: {
    updateSubject() {
      this.index =
        this.index == this.subjects.length - 1 ? 0 : this.index + 1;
      this.subject = this.subjects[this.index];
    },
  },
  created() {
    this.subject = this.subjects[0];
  },
};
</script>

<style></style>
