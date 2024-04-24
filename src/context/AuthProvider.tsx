import React, { ReactNode, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, User, signOut } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import firebase_app from '../firebase/firebaseAppConfig';

interface AuthContextProviderProps {
    children: ReactNode;
}

const auth = getAuth(firebase_app);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
    children,
}) => {
    const [userAuth, setUserAuth] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUserCredentials: User | null) => {
            // Cookies.set('sendflow.token', authUserCredentials?.refreshToken ?? '');
            setUserAuth(authUserCredentials);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    async function logout() {
        let result = null,
            error = null;
        try {
            result = await signOut(auth);
        } catch (e) {
            error = e;
        }

        return { result, error };
    }

    return (
        <AuthContext.Provider value={{ userAuth, logout }}>
            {
                children
            }
        </AuthContext.Provider>
    );
};