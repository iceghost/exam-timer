<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <span>{{ toReadableTime(timeLeft) }}</span>
      <v-btn fab small color="secondary" class="ml-2" @click="paused = !paused">
        <v-icon>{{ paused ? "mdi-play" : "mdi-pause" }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-card max-width="400">
        <v-card-title>Câu {{ currentQuestion + 1 }}</v-card-title>
        <v-card-subtitle>{{ toReadableTime(answers[currentQuestion].time) }}</v-card-subtitle>
        <v-card-text>
          <v-radio-group v-model="answers[currentQuestion].answer" :disabled="paused">
            <v-radio label="Đáp án A" value="A" />
            <v-radio label="Đáp án B" value="B" />
            <v-radio label="Đáp án C" value="C" />
            <v-radio label="Đáp án D" value="D" />
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="currentQuestion -= 1" :disabled="currentQuestion === 0">Câu trước</v-btn>
          <v-spacer />
          <v-btn text @click="currentQuestion += 1" :disabled="currentQuestion === 39">Câu sau</v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    secondElapsed: 0,
    secondLimit: 3000,
    paused: true,
    answers: Array(40)
      .fill(null)
      .map(() => ({
        answer: null,
        time: 0
      })),
    currentQuestion: 0,
    timer: null
  }),
  computed: {
    timeLeft() {
      return this.secondLimit - this.secondElapsed;
    }
  },

  methods: {
    tick() {
      if (!this.paused) {
        this.secondElapsed += 1;
        this.answers[this.currentQuestion].time += 1;
      }
    },

    toReadableTime(time) {
      return `${Math.floor(time / 60)} phút ${time % 60} giây`;
    }
  },

  mounted() {
    this.timer = setInterval(this.tick, 1000);
    let _sec = localStorage.getItem("secondElapsed");
    let _ans = localStorage.getItem("answers");
    let _cur = localStorage.getItem("currentQuestion");
    if (_sec !== null) this.secondElapsed = parseInt(_sec);
    if (_ans !== null) this.answers = JSON.parse(_ans);
    if (_cur !== null) this.currentQuestion = parseInt(_cur);
    addEventListener("beforeunload", () => {
      clearInterval(this.timer);
      localStorage.setItem("secondElapsed", this.secondElapsed);
      localStorage.setItem("answers", JSON.stringify(this.answers));
      localStorage.setItem("currentQuestion", this.currentQuestion);
    });
  }
};
</script>
