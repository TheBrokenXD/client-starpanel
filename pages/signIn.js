import Head from 'next/head'
import Link from "next/link"
// react
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from "react";
// firebase
import { useAuth } from '../context/AuthContext';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from '../firebase/clientApp';
import { doc, setDoc } from 'firebase/firestore';

const SignIn = () => {

    // getting some classes
    const toastRef = useRef();

    // google auth
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;

            // user info
            const user = result.user;

            // convert date to proper format
            const time = auth.currentUser.metadata.creationTime;
            const convert = new Date(time);
            const dateWithDay = convert.toDateString();
            // split date
            const dateSplit = dateWithDay.split(" ");
            const month = dateSplit[1];
            const dateNum = dateSplit[2];
            const year = dateSplit[3];
            const dateWithMonthAndYear = `${month} ${dateNum} ${year}`;

            // add user to db
            const docRef = setDoc(doc(db, 'users', user.uid), {
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                role: 'user',
                method: 'Google',
                balance: 0,
                created: dateWithMonthAndYear
            }).catch((error) => {
                console.log(error)
            })
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log({ errorCode, errorMessage, email, credential });
        });
    }

    // email pass auth
    const router = useRouter();
    const { user, signIn } = useAuth()
    const [data, setData] = useState({
        email: '',
        password: '',
    })
  
    const handleSignin = async (e) => {
        e.preventDefault()
        console.log(user)

        if(data.email == '' || data.password == '') {
            toastRef.current.className = "toast custom-error-bg";
            toastRef.current.children[0].innerHTML = "Please fill all the fields"
            setTimeout(() => {
                toastRef.current.className = "toast-hidden custom-error-bg"
            }, 2000)
        } else {
            try {
                await signIn(data.email, data.password)
                router.push('/services')
            } catch (err) {
                toastRef.current.className = "toast custom-error-bg";
                toastRef.current.children[0].innerHTML = err.message
                setTimeout(() => {
                    toastRef.current.className = "toast-hidden custom-error-bg"
                }, 2000)
            }
        }

    }

    useEffect(() => {
        if (user) {
          router.push('/')
        }
    }, [router, user])

    return (
        <>

        <Head>
            <title>Affiliate - Starpanel</title>
        </Head>

        <div className="container">

            <div ref={toastRef} className="toast-hidden custom-error-bg">
                <p className='fw-md custom-text'>Error! please check your code</p>
            </div>

            <div className="row justify-center align-i-center h-screen">
                <div className="col-11-xs">

                    <div className="card custom-card-bg-gradient justify-between br-md p-3">
                        
                        <div className="row">
                            <div className="col-9-xs column justify-center form-border-right">
                                <form className=''>
                                    <div className="column">
                                        <label className='custom-sub-text fw-md' htmlFor="email">Email</label>
                                        <input type="email" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="Email" 
                                            id='email'
                                            label='email'
                                            value={data.email}
                                            onChange={e => setData({ ...data, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="column mt-2">
                                        <label className='custom-sub-text fw-md' htmlFor="password">Password</label>
                                        <input type="password" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="Password" 
                                            id='password'
                                            label='password'
                                            value={data.password}
                                            onChange={e => setData({ ...data, password: e.target.value })}
                                        />
                                    </div>
                                    <div className='display-f'>
                                        <button type="submit" onClick={handleSignin} className="custom-btn-rounded custom-text mt-3 pl-5 pr-5 pt-2 pb-2 shadow-base">Sign In</button>
                                        <button onClick={signInWithGoogle} className="custom-btn-outlined br-full custom-text mt-3 ml-2 pl-5 pr-5 pt-2 pb-2 shadow-base">Sign In with Google</button>
                                    </div>
                                </form>
                            </div>

                            <div className='col-3-xs column align-i-end justify-center'>
                                <p className='font-xl fw-bold custom-text'>Sign In</p>
                                <Link href="/signUp" passHref><p className='custom-sub-text pt-2 display-f align-i-center'>Not an user? <button className='custom-btn-rounded ml-2 shadow-base'>Sign Up</button></p></Link>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>

        </div>

        </>
    );
}
 
export default SignIn;