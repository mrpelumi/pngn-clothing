import  {initializeApp} from 'firebase/app';
import {
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyC_smONAYohARCnfwySLhi1ICSMo5cSJBc",
  authDomain: "pngn-clothing-db-1f0a6.firebaseapp.com",
  projectId: "pngn-clothing-db-1f0a6",
  storageBucket: "pngn-clothing-db-1f0a6.appspot.com",
  messagingSenderId: "96957679259",
  appId: "1:96957679259:web:01e43eb2362c64145b683e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch(error){
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
}