import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCPFnDZkOmAN3a7EBw_LjVTRVjr1Snkzhc",
  authDomain: "chat-with-gpt3.firebaseapp.com",
  projectId: "chat-with-gpt3",
  storageBucket: "chat-with-gpt3.appspot.com",
  messagingSenderId: "916884017160",
  appId: "1:916884017160:web:9a2b87b13eb7d3067781bd",
  measurementId: "G-92L3Z0B6VT"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;