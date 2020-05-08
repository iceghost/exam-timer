<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <span>{{ toReadableTime(timeLeft) }}</span>
      <v-btn
        fab
        small
        color="secondary"
        class="ml-2"
        @click="paused = !paused"
      >
        <v-icon>{{ paused ? 'mdi-play' : 'mdi-pause' }}</v-icon>
      </v-btn>
      <v-btn text @click="reset">Đặt lại</v-btn>
      <v-btn text @click="compareKeys">Chấm điểm</v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title
                >Câu {{ currentQuestion + 1 }}</v-card-title
              >
              <v-card-subtitle>{{
                toReadableTime(answers[currentQuestion].time)
              }}</v-card-subtitle>
              <v-card-text>
                <v-radio-group
                  v-model="answers[currentQuestion].answer"
                  :disabled="paused"
                >
                  <v-radio label="Đáp án A" value="A" />
                  <v-radio label="Đáp án B" value="B" />
                  <v-radio label="Đáp án C" value="C" />
                  <v-radio label="Đáp án D" value="D" />
                </v-radio-group>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  @click="updateQuestion(currentQuestion - 1)"
                  :disabled="currentQuestion === 0"
                  >Câu trước</v-btn
                >
                <v-spacer />
                <v-btn
                  text
                  @click="updateQuestion(currentQuestion + 1)"
                  :disabled="currentQuestion === 39"
                  >Câu sau</v-btn
                >
              </v-card-actions>
            </v-card>
            <v-card class="mt-5">
              <v-card-title>Đáp án</v-card-title>
              <v-card-text>
                <v-textarea
                  outlined
                  placeholder="ABCDCBA..."
                  v-model="keys"
                ></v-textarea>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="mx-auto">
              <v-card-title>Danh sách các câu hỏi</v-card-title>
              <v-card-text>
                <v-row width="auto">
                  <v-col
                    v-for="question in totalQuestions"
                    :key="question"
                    cols="auto"
                  >
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
                      @click="updateQuestion(question - 1)"
                    >
                      {{
                        answers[question - 1].answer === undefined
                          ? ''
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
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',

  components: {},

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
};
</script>
