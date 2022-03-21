import { createContext, useContext, useEffect, useState } from 'react'
// firebase
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
import { auth, db } from "../firebase/clientApp"
import { doc, setDoc } from 'firebase/firestore';

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email
                })
            } else {
                setUser(null)
            }
            setLoading(false)
        })
    
        return () => unsubscribe()
    }, [])

    const signUp = async (email, password, name) => {
        return createUserWithEmailAndPassword(auth, email, password)
        .then( () => {
            // convert date to proper format
            const time = auth.currentUser.metadata.creationTime;
            const convert = new Date(time);
            const dateWithDay = convert.toDateString();
            const dateSplit = dateWithDay.split(" ");
            const month = dateSplit[1];
            const dateNum = dateSplit[2];
            const year = dateSplit[3];
            const dateWithMonthAndYear = `${month} ${dateNum} ${year}`;

            const docRef = setDoc(doc(db, 'users', auth.currentUser.uid), {
                name: name,
                email: email,
                uid: auth.currentUser.uid,
                method: 'Email',
                role: 'user',
                balance: 0,
                created: dateWithMonthAndYear
            }).catch((error) => {
                console.log(error)
            })

            const text = `Welcome to Starpanel, ${name}! Email: ${email}, UID: ${auth.currentUser.uid}, Method: Email, Role: user, Balance: 0, Created at ${dateWithMonthAndYear}`

            const url = "https://api.telegram.org/bot5255515716:AAHhYyT6t4wybQ-TWVLBEUQg67T6u-2dEeI/sendMessage?chat_id=@starpanel_db&text=" + text;
            fetch(url).then(res => res.json())

        })
    }

    const signIn = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        setUser(null)
        await signOut(auth)
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signUp, logout }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
