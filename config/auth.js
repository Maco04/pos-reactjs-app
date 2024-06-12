// lib/auth.js
import { auth } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useAuthStore } from '@/stores/useAuthStore';

export const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    useAuthStore.getState().setUser(userCredential.user);
  } catch (error) {
    console.error('Error during registration:', error);
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    useAuthStore.getState().setUser(userCredential.user);
  } catch (error) {
    console.error('Error during login:', error);
  }
};
