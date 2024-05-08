import { auth } from "./firebase"

import { signInWithEmailAndPassword } from "firebase/auth"

export const doSignInWithEmailAndPassword = async (email, password) =>{
    return signInWithEmailAndPassword(auth, email, password)
}

export const doSignOut = () =>{
    return auth.signOut()
}