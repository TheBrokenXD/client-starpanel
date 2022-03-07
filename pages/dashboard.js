import Head from 'next/head'
// firebase
import { useAuth } from '../context/AuthContext';
// store
import { collection, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from '../firebase/clientApp';

const Dashboard = () => {

    // access firestore

    const [data, setData] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "users");

        const q = query(collectionRef, orderBy("uid"));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setData(QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.number })));
        });
        return unsubscribe;

    }, [])

    // access auth

    const { user } = useAuth()

    console.log(user.uid)

    return (
        <>

            <Head>
                <title>Affiliate - Starpanel</title>
            </Head>

            <div className="container">
                <div className="row justify-center align-i-center h-screen">
                    <div className="col-6-xs">

                        <div className="card custom-card-bg p-3">

                            {data.map(data => {
                                return(
                                    data.uid == user.uid ? (
                                        <>
                                            <div><p className="custom-sub-text">Username : {data.name}</p></div>
                                            <div><p className="custom-sub-text">Email : {data.email}</p></div>
                                        </>
                                    ) : (
                                        <>
                                            
                                        </>
                                    )
                                )
                            })}

                        </div>

                    </div>
                </div>    
            </div>

        </>
    );
}
 
export default Dashboard;