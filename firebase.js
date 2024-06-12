import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyB7dEklKfFinP0cQlTZt6emMY9e_PkB2KM',
  authDomain: 'anchor-point-program.firebaseapp.com',
  databaseURL:
    'https://anchor-point-program-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'anchor-point-program',
  storageBucket: 'anchor-point-program.appspot.com',
  messagingSenderId: '186672334674',
  appId: '1:186672334674:web:400b3b9dd361ec2929dc8b',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
