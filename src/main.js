import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap";
import '../src/assets/main.css';
import VS2 from 'vue-script2'

const app = createApp(App)
app.use(router)
app.use(VS2)

app.mount('#app')


const firebaseConfig = {
  apiKey: "AIzaSyCuEkdNSMjSFD15M8F9dYji6XKEl-j-pQs",
  authDomain: "terraform-1074a.firebaseapp.com",
  projectId: "terraform-1074a",
  storageBucket: "terraform-1074a.appspot.com",
  messagingSenderId: "593956442964",
  appId: "1:593956442964:web:e3bfb108e9f57669212ec1"
};

const appdb = initializeApp(firebaseConfig);
export const db = getFirestore(appdb);

