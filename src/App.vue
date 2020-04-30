<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <span>{{ toReadableTime(timeLeft) }}</span>
      <v-btn fab small color="secondary" class="ml-2" @click="paused = !paused">
        <v-icon>{{ paused ? "mdi-play" : "mdi-pause" }}</v-icon>
      </v-btn>
      <v-btn text @click="reset">Đặt lại</v-btn>
      <v-btn text @click="compareKeys">Chấm điểm</v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-card>
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
                <v-btn
                  text
                  @click="currentQuestion -= 1"
                  :disabled="currentQuestion === 0"
                >Câu trước</v-btn>
                <v-spacer />
                <v-btn text @click="currentQuestion += 1" :disabled="currentQuestion === 39">Câu sau</v-btn>
              </v-card-actions>
            </v-card>
            <v-card class="mt-2">
              <v-card-title>Đáp án</v-card-title>
              <v-card-text>
                <v-textarea outlined placeholder="ABCDCBA..." v-model="keys"></v-textarea>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="mx-auto">
              <v-card-title>Danh sách</v-card-title>
              <v-card-text>
                <v-row width="auto">
                  <v-col v-for="question in totalQuestions" :key="question" cols="auto">
                    <v-btn
                      :color="
                        answers[question - 1].key === null
                          ? question - 1 === currentQuestion
                            ? 'secondary'
                            : answers[question - 1].answer === null
                            ? 'default'
                            : 'primary'
                          : answers[question - 1].key !==
                            answers[question - 1].answer
                          ? 'error'
                          : 'success'
                      "
                      @click="currentQuestion = question - 1"
                    >
                      {{
                      answers[question - 1].answer === undefined
                      ? ""
                      : question
                      }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-card class="mx-auto mt-2">
          <v-card-title>Biểu đồ</v-card-title>
          <v-card-text style="overflow-x: scroll">
            <div style="min-width: 1200px">
            <v-sparkline
              :labels="answers.map(e => `${e.index + 1}`)"
              :value="answers.map(e => e.time)"
              line-width="1"
              label-size="4"
              width="300"
            ></v-sparkline>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data() {
    return {
      secondElapsed: 0,
      secondLimit: 60 * 50,
      totalQuestions: 40,
      paused: true,
      answers: this.emptyAnswers(40),
      currentQuestion: 0,
      timer: null,
      keys: ""
    };
  },
  computed: {
    timeLeft() {
      return this.secondLimit - this.secondElapsed;
    }
  },

  methods: {
    emptyAnswers(numOfQuestions) {
      return Array(numOfQuestions)
        .fill(null)
        .map((_, i) => ({
          index: i,
          answer: null,
          time: 0,
          key: null
        }));
    },

    tick() {
      if (this.timeLeft <= 0) this.paused = true;
      if (!this.paused) {
        this.secondElapsed += 1;
        this.answers[this.currentQuestion].time += 1;
      }
    },

    toReadableTime(time) {
      return `${Math.floor(time / 60)} phút ${time % 60} giây`;
    },

    reset() {
      this.secondElapsed = 0;
      this.answers = this.emptyAnswers(this.totalQuestions);
      this.currentQuestion = 0;
    },

    compareKeys() {
      this.paused = true;
      [...this.keys.padEnd(this.totalQuestions)].forEach((key, index) => {
        this.answers[index].key = key;
      });
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
