import {initializeApp} from 'firebase/app';
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
    apiKey: "AIzaSyAOmHOOtCDMkg0UVcXj4zCX8nksOl4bAIE",
    authDomain: "crwn-clothing-db-e9217.firebaseapp.com",
    projectId: "crwn-clothing-db-e9217",
    storageBucket: "crwn-clothing-db-e9217.appspot.com",
    messagingSenderId: "127285561729",
    appId: "1:127285561729:web:296b6afc6d8b80dd160080"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth)   => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists())
    {
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });

        } catch(error){
            console.log('Error Occured:', error.message);
        }
    }

    return userDocRef;
  }
