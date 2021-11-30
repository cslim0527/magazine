import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyC0jYBJG_MjDFAIhzppWjdrH4eBQo-V_yo",
  authDomain: "spartagram-89e5b.firebaseapp.com",
  projectId: "spartagram-89e5b",
  storageBucket: "spartagram-89e5b.appspot.com",
  messagingSenderId: "265677493288",
  appId: "1:265677493288:web:4bac16d7a69ee51e73d11d",
  measurementId: "G-4011HYSHGB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey
const auth = firebase.auth()

export { auth, apiKey }