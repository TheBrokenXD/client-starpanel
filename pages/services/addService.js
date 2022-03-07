import Head from 'next/head'
import Link from "next/link"
// react
import { useState, useRef, useEffect } from "react";
// components
import NewForm from '../../components/services/NewForm';
// firebase
import { collection, onSnapshot, query, QuerySnapshot, where } from 'firebase/firestore';
import { db } from '../../firebase/clientApp';

const AddService = () => {

    // access firestore
    const [data, setData] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "users");

        const q = query(collectionRef, where("role", "==", "admin"));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setData(QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.number })));
        });
        return unsubscribe;

    }, [])

    return (
        <>

        <Head>
            <title>Affiliate - Starpanel | Admin</title>
        </Head>

        <div className="container">

            <div className="row justify-center align-i-center h-screen">
                <div className="col-11-xs">

                    <div className="card custom-card-bg-gradient justify-between br-md p-3">
                        
                        <div className="row">
                            <div className="col-9-xs column justify-center form-border-right">
                                <NewForm />
                            </div>

                            <div className='col-3-xs column align-i-end justify-center'>
                                <p className='font-xl fw-bold custom-text'>Admin</p>
                                <Link href="/signUp" passHref><p className='custom-sub-text pt-2 display-f align-i-center'>Fill out all the fields and add a service</p></Link>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>

        </div>

        </>
    );
}
 
export default AddService;