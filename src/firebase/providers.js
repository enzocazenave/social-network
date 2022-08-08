import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

export const loginWithEmailPassword = async({ email, password }) => {
    
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { photoURL, uid} = result.user;

        return {
            ok: true,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async({ email, password, username, name, surname }) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        
        return {
            ok: true,
            uid,
            photoURL,
        }
    } catch (error) {
        const errorMessage = error.message;

        return { 
            ok: false, 
            errorMessage
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}