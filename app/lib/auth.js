// lib/auth.js
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut
  } from 'firebase/auth';
  import { doc, setDoc } from 'firebase/firestore';
  import { auth, db } from './firebase';
  
  export async function register(email, password, farmName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email,
        farmName,
        createdAt: new Date()
      });
  
      return { success: true, user };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  }
  
  export async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  }
  
  export async function logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  }