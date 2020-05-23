import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let emptyAnswer = totalQ =>
  Array(totalQ)
    .fill(null)
    .map((_, i) => ({
      index: i,
      answer: null,
      time: 0,
      key: null,
    }));

export default new Vuex.Store({
  state() {
    return {
      testID: Date.now(),
      answers: emptyAnswer(40),
      currentQuestion: 0,
      totalQuestions: 40,
      elapsedSeconds: 0,
      totalSeconds: 50 * 60,
    };
  },
  mutations: {
    UPDATE_TIMER(state) {
      state.answers[state.currentQuestion].time += 1;
      state.elapsedSeconds += 1;
    },
    UPDATE_QUESTION(state, question) {
      state.currentQuestion = question;
    },
    UPDATE_ANSWER(state, answer) {
      state.answers[state.currentQuestion].answer = answer;
    },
    UPDATE_KEY(state, keys) {
      for (let i = 0; i < keys.length; i++) {
        state.answers[i].key = keys[i];
      }
    },
    SAVE_LOCAL(state) {
      localStorage.setItem('answers', JSON.stringify(state.answers));
      localStorage.setItem('currentQuestion', state.currentQuestion);
    },
    GET_LOCAL(state) {
      let _ans = localStorage.getItem('answers');
      let _cur = localStorage.getItem('currentQuestion');
      if (_ans !== null) {
        state.answers = JSON.parse(_ans);
        state.elapsedSeconds = state.answers.reduce(
          (acc, cur) => acc + cur.time,
          0,
        );
      }
      if (_cur !== null) state.currentQuestion = parseInt(_cur);
    },
    CREATE_NEW_TEST(state, { totalQ, totalT }) {
      state.testID = Date.now();
      state.answers = emptyAnswer(totalQ);
      state.currentQuestion = 0;
      state.totalQuestions = totalQ;
      state.elapsedSeconds = 0;
      state.totalSeconds = totalT;
    },
  },
  actions: {
    updateTimer({ commit }) {
      commit('UPDATE_TIMER');
    },
    updateQuestion({ state, commit }, question) {
      if (question < 0 || question >= state.totalQuestions) return;
      commit('UPDATE_QUESTION', question);
    },
    updateAnswer({ state, commit }, answer) {
      if (state.answers[state.currentQuestion].answer == answer)
        commit('UPDATE_ANSWER', null);
      else commit('UPDATE_ANSWER', answer);
    },
    updateKey({ commit }, keys) {
      commit('UPDATE_KEY', keys);
    },
    saveLocal({ commit }) {
      commit('SAVE_LOCAL');
    },
    getLocal({ commit }) {
      commit('GET_LOCAL');
    },
    createNewTest({ commit }, { totalQ, totalT }) {
      commit('CREATE_NEW_TEST', { totalQ, totalT });
    },
  },
});
