
import firebaseAppConfig from "../firebaseAppConfig";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebaseAppConfig);

export default async function signIn(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
