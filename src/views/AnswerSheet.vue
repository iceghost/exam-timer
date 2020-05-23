<template>
  <div class="flex flex-col items-center">
    <nav
      class="w-full flex items-center justify-center h-16 bg-blue-500 text-white"
    >
      <span class="flex text-3xl"
        >{{ String(Math.floor(timeLeft / 60)).padStart(2, '0')
        }}<span class="text-sm -mt-1">m</span>
        {{ String(timeLeft % 60).padStart(2, '0') }}
        <span class="text-sm -mt-1">s</span>
      </span>
      <button
        class="p-1 ml-5 uppercase font-semibold hover:shadow-xl"
        @click="paused = !paused"
      >
        {{ !paused ? 'Tạm dừng' : 'Làm tiếp' }}
      </button>
    </nav>
    <div
      class="mt-5 md:mx-auto w-full md:w-2/3 grid grid-cols-2 md:grid-cols-4"
    >
      <AnswerPad
        letter="A"
        color="red"
        :active="answers[currentQuestion].answer == 'A'"
        @selectAnswer="updateAnswer('A')"
      />
      <AnswerPad
        letter="B"
        color="blue"
        :active="answers[currentQuestion].answer == 'B'"
        @selectAnswer="updateAnswer('B')"
      />
      <AnswerPad
        letter="C"
        color="yellow"
        :active="answers[currentQuestion].answer == 'C'"
        @selectAnswer="updateAnswer('C')"
      />
      <AnswerPad
        letter="D"
        color="green"
        :active="answers[currentQuestion].answer == 'D'"
        @selectAnswer="updateAnswer('D')"
      />
    </div>
    <div class="center mt-5 text-4xl text-blue-500">
      <button
        class="px-3"
        @click="updateQuestion(currentQuestion - 1)"
      >
        &#9001;
      </button>
      <span class="border-2 border-blue-500 rounded-full p-3">{{
        currentQuestion + 1
      }}</span>
      <button
        class="px-3"
        @click="updateQuestion(currentQuestion + 1)"
      >
        &#9002;
      </button>
    </div>
    <div
      class="mt-5 w-full md:w-2/3 grid grid-cols-5 md:grid-cols-10"
    >
      <button
        class="focus:outline-none m-1 text-center border rounded"
        :class="
          currentQuestion == i - 1
            ? 'bg-blue-900 text-white font-bold border-none'
            : 'bg-white text-blue-900 font-light border-blue-200'
        "
        v-for="i in totalQuestions"
        :key="i"
        @click="updateQuestion(i - 1)"
      >
        {{ i }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AnswerPad from '../components/AnswerPad';

export default {
  name: 'AnswerSheet',
  data() {
    return {
      paused: true,
      timer: null,
      keys: '',
    };
  },
  computed: {
    timeLeft() {
      return this.totalSeconds - this.elapsedSeconds;
    },
    ...mapState([
      'answers',
      'currentQuestion',
      'totalQuestions',
      'elapsedSeconds',
      'totalSeconds',
    ]),
    selected: {
      set(newAns) {
        this.updateAnswer(newAns);
      },
      get() {
        return this.answers[this.currentQuestion];
      },
    },
  },

  methods: {
    ...mapActions([
      'updateTimer',
      'updateQuestion',
      'updateAnswer',
      'updateKey',
      'saveLocal',
      'getLocal',
      'createNewTest',
    ]),

    tick() {
      if (this.timeLeft <= 0) this.paused = true;
      if (!this.paused) this.updateTimer();
    },

    toReadableTime(time) {
      return `${Math.floor(time / 60)} phút ${time % 60} giây`;
    },

    reset() {
      this.createNewTest({ totalQ: 40, totalT: 50 * 60 });
    },

    compareKeys() {
      this.paused = true;
      this.updateKey(this.keys);
    },
  },

  mounted() {
    this.timer = setInterval(this.tick, 1000);
    this.getLocal();
    addEventListener('beforeunload', () => {
      clearInterval(this.timer);
      this.saveLocal();
    });
  },
  components: { AnswerPad },
};
</script>
