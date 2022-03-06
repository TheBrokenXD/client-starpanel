import Head from 'next/head'
// firebase
import { useAuth } from '../context/AuthContext';
// store
import { collection, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from '../firebase/clientApp';

const dashboard = () => {

    const collectionRef = collection(db, "users");

    const { user } = useAuth()

    return (
        <>

            <Head>
                <title>Affiliate - Starpanel</title>
            </Head>

            <div className="container">
                <div className="row justify-center align-i-center h-screen">
                    <div className="col-6-xs">

                        <div className="card custom-card-bg p-3">
                            <p className='white'>Username : {user.name}</p>
                            <p className='white'>Email : {user.email}</p>
                        </div>

                    </div>
                </div>    
            </div>

        </>
    );
}
 
export default dashboard;