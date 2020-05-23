<template>
  <div
    class="home flex flex-col justify-center h-screen bg-blue-500 text-white font-light"
  >
    <div>
      <p class="text-center text-2xl font-hairline tracking-wide">
        Hôm nay <br />
        bạn định làm đề thi môn gì?
      </p>
      <Picker @update:subject="updateSubject" />
      <div class="self-center flex justify-center">
        <button
          class="mt-8 border border-white w-28 p-2"
          @click="
            createTest(
              subject.name,
              subject.questions,
              subject.minutes,
            )
          "
        >
          <span class="text-2xl font-thin">bắt đầu làm bài</span>
        </button>
      </div>
      <div class="text-center mt-8">
        <router-link :to="{ name: 'List' }" class="text-lg italic"
          >hoặc xem lại đề đã làm</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase';
import Picker from '../components/Picker';

export default {
  name: 'Home',
  data() {
    return {
      subject: {
        name: 'Toán',
        questions: 50,
        minutes: 90,
        img: 'maths.png',
      },
      docId: null,
    };
  },
  methods: {
    updateSubject(subject) {
      this.subject = subject;
    },
    emptyAnswers(questions) {
      return Array(questions)
        .fill(null)
        .map((_, i) => ({
          index: i,
          answer: null,
          time: 0,
          key: null,
        }));
    },
    createTest(subject, questions, minutes) {
      const newTest = {
        name: null,
        subject,
        questions,
        minutes,
        date: new Date(),
        answers: this.emptyAnswers(questions),
      };
      db.collection('documents')
        .add(newTest)
        .then(docRef => {
          this.$router.push({
            name: 'Document',
            params: { docid: docRef.id },
          });
        })
        .catch(e => console.error('Error adding doc: ', e));
    },
  },
  components: {
    Picker,
  },
};
</script>
