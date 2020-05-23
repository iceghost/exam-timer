import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyASJuQSuP9VeI4g1f6tWo2FX27UOx3txD8',
  authDomain: 'exam-timer-3917b.firebaseapp.com',
  databaseURL: 'https://exam-timer-3917b.firebaseio.com',
  projectId: 'exam-timer-3917b',
  storageBucket: 'exam-timer-3917b.appspot.com',
  messagingSenderId: '157097613125',
  appId: '1:157097613125:web:2721d335ba322ff00b902c',
  measurementId: 'G-GGBN4B7T91',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
