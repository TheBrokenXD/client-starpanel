import Head from 'next/head'
import Link from "next/link"
//react
import { useState } from 'react';
// firebase
import { useAuth } from '../context/AuthContext';

const SignUp = () => {

    // email pass auth

    const { user, signup } = useAuth()
    console.log(user)
    const [data, setData] = useState({
        email: '',
        password: '',
    })
  
    const handleSignup = async (e) => {
        e.preventDefault()
    
        try {
            await signup(data.email, data.password)
        } catch (err) {
            console.log(err)
        }
    
        console.log(data)
    }

    return (
        <>

        <Head>
            <title>Affiliate - Starpanel</title>
        </Head>

        <div className="container">
            <div className="row justify-center align-i-center h-screen">
                <div className="col-11-xs">

                    <div className="card custom-card-bg-gradient justify-between br-md p-3">
                        
                        <div className="row">
                            <div className="col-9-xs column justify-center form-border-right">
                                <form className=''>
                                    <div className="column">
                                        <label className='custom-sub-text fw-md'>Email</label>
                                        <input type="email" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="Email" 
                                            label='email'
                                            value={data.email}
                                            onChange={e => setData({ ...data, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="column mt-2">
                                        <label className='custom-sub-text fw-md'>Password</label>
                                        <input type="password" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="Password" 
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