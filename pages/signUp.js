import Head from 'next/head'
import Link from "next/link"
//react
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from "react";
// firebase
import { useAuth, user } from '../context/AuthContext';

const SignUp = () => {

    // getting some classes
    const toastRef = useRef();

    // email pass auth
    const router = useRouter();
    const { user, signUp } = useAuth()
    const [data, setData] = useState({
        email: '',
        password: '',
        displayName: ''
    })
  
    const handleSignup = async (e) => {
        e.preventDefault()

        if (data.email == '' || data.password == '' || data.displayName == '') {
            toastRef.current.className = "toast custom-error-bg";
            toastRef.current.children[0].innerHTML = "Please fill all the fields"
            setTimeout(() => {
                toastRef.current.className = "toast-hidden custom-error-bg"
            }, 2000)
        } else if(data.email.indexOf('@') == -1 || data.email.indexOf('.') == -1){
            toastRef.current.className = "toast custom-error-bg";
            toastRef.current.children[0].innerHTML = "Please enter a valid email"
            setTimeout(() => {
                toastRef.current.className = "toast-hidden custom-error-bg"
            }, 2000)
        } else if(data.password.length < 6) {
            toastRef.current.className = "toast custom-error-bg";
            toastRef.current.children[0].innerHTML = "Password must be at least 6 characters"
            setTimeout(() => {
                toastRef.current.className = "toast-hidden custom-error-bg"
            }, 2000)
        } else {
            try {
                await signUp(data.email, data.password, data.displayName)
            } catch (err) {
                console.log(err.message)
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
                                        <label className='custom-sub-text fw-md' htmlFor="displayName">Display Name</label>
                                        <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="Name" 
                                            id='displayName'
                                            label='displayName'
                                            value={data.displayName}
                                            onChange={e => setData({ ...data, displayName: e.target.value })}
                                        />
                                    </div>
                                    <div className="column mt-2">
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
                                        <input type="password" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="Atleast 6 characters" 
                                            id='password'
                                            label='password'
                                            value={data.password}
                                            onChange={e => setData({ ...data, password: e.target.value })}
                                        />
                                    </div>
                                    <button type="submit" onClick={handleSignup} className="custom-btn-rounded custom-text mt-3 pl-5 pr-5 pt-2 pb-2 shadow-base">Sign Up</button>
                                </form>
                            </div>

                            <div className='col-3-xs column align-i-end justify-center'>
                                <p className='font-xl fw-bold custom-text'>Sign Up</p>
                                <Link href="/signIn" passHref><p className='custom-sub-text pt-2 display-f align-i-center'>Already an user? <button className='custom-btn-rounded ml-2 shadow-base'>Sign In</button></p></Link>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>

        </div>

        </>
    );
}
 
export default SignUp;