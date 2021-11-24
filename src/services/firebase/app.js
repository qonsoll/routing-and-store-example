import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCrRFGfIuYRn4992_8K6S4rkYE5wYAKl_A',
  authDomain: 'qonsoll-ams.firebaseapp.com',
  databaseURL:
    'https://qonsoll-ams-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'qonsoll-ams',
  storageBucket: 'qonsoll-ams.appspot.com',
  messagingSenderId: '1044286479835',
  appId: '1:1044286479835:web:066362f39f5ae937955bfe'
}

const app = initializeApp(firebaseConfig)

export default app
