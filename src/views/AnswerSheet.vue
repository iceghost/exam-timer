<template>
  <div class="flex flex-col items-center">
    <nav
      class="w-full flex items-center justify-around h-16 bg-blue-500 text-white"
    >
      <router-link
        :to="{ name: 'List' }"
        class="uppercase font-semibold"
      >
        Danh sách đề
      </router-link>
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
    <template v-if="answers.length > 0">
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
      <div v-if="answers" class="center mt-5 text-4xl text-blue-500">
        <button class="px-3" @click="currentQuestion -= 1">
          &#9001;
        </button>
        <span class="border-2 border-blue-500 rounded-full p-3">{{
          currentQuestion + 1
        }}</span>
        <button class="px-3" @click="currentQuestion += 1">
          &#9002;
        </button>
      </div>
      <div
        class="mt-5 w-full md:w-2/3 grid grid-cols-5 md:grid-cols-10"
      >
        <button
          v-for="i in totalQuestions"
          class="focus:outline-none m-1 text-center border rounded"
          :class="
            currentQuestion == i - 1
              ? 'bg-blue-900 text-white font-bold border-none'
              : answers[i - 1].answer == null
              ? 'bg-white text-blue-900 font-light border-blue-200'
              : 'bg-blue-500 text-white font-light border-none'
          "
          :key="i"
          @click="currentQuestion = i - 1"
        >
          {{ i }}
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import { db } from '../firebase';
import AnswerPad from '../components/AnswerPad';

export default {
  name: 'AnswerSheet',
  data() {
    return {
      answers: [],
      currentQuestion: 0,
      totalSeconds: 0,
      elapsedSeconds: 0,
      paused: true,
      timer: null,
      keys: '',
    };
  },
  computed: {
    timeLeft() {
      return this.totalSeconds - this.elapsedSeconds;
    },

    selected: {
      set(newAns) {
        this.answers[this.currentQuestion].answer = newAns;
      },
      get() {
        return this.answers[this.currentQuestion].answer;
      },
    },

    totalQuestions() {
      return this.answers.length;
    },
  },
  methods: {
    tick() {
      if (this.timeLeft <= 0) this.paused = true;
      if (!this.paused) {
        this.answers[this.currentQuestion].time += 1;
        this.elapsedSeconds += 1;
      }
    },

    toReadableTime(time) {
      return `${Math.floor(time / 60)} phút ${time % 60} giây`;
    },

    compareKeys() {
      this.paused = true;
    },

    saveData() {
      console.log('Saving...');
      db.collection('documents')
        .doc(this.$route.params.docid)
        .set({ answers: this.answers }, { merge: true })
        .catch(e => {
          console.log('Error setting data: ', e);
        });
    },
  },

  created() {
    this.timer = setInterval(this.tick, 1000);
    db.collection('documents')
      .doc(this.$route.params.docid)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log('Data: ', doc.data());
          this.answers = doc.data().answers;
          this.totalSeconds = doc.data().minutes * 60;
          this.elapsedSeconds = this.answers.reduce(
            (acc, cur) => acc + cur.time,
            0,
          );
        } else console.log('No found document');
      })
      .catch(e => console.error('Error getting doc: ', e));

    window.addEventListener('beforeunload', () => {
      this.saveData();
      clearInterval(this.timer);
    });
  },
  beforeRouteLeave(from, to, next) {
    this.saveData();
    clearInterval(this.timer);
    next();
  },
  components: { AnswerPad },
};
</script>
