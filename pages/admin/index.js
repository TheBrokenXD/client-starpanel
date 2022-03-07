import Link from "next/link";
import Image from "next/image"
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
// components
import Home from "../../components/admin/Home";
// firebase
import { collection, onSnapshot, query, QuerySnapshot, where } from 'firebase/firestore';
import { db } from '../../firebase/clientApp';
import { useAuth } from '../../context/AuthContext';

const index = () => {

    // access firestore
    const [data, setData] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "users");

        const q = query(collectionRef, where("role", "==", "admin"));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setData(QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });
        return unsubscribe;

    }, [])

    const { user } = useAuth()

    if(data.filter(item => item.uid === user.uid).length > 0) {
        return (
            <>

                <div className="container">

                    <div className="row align-i-center h-screen">
                        <div className='col-1-xs column align-i-center'>
                            <ul className="column align-i-center admin-li pt-6 pb-6">
                                <li><Link href="#"><Image src="/svg/admin/Home.svg" height={50} width={50} alt="icon" /></Link></li>
                                <li><Link href="#"><Image src="/svg/admin/Users.svg" height={50} width={50} alt="icon" /></Link></li>
                                <li><Link href="#"><Image src="/svg/admin/Orders.svg" height={50} width={50} alt="icon" /></Link></li>
                                <li><Link href="#"><Image src="/svg/admin/Services.svg" height={50} width={50} alt="icon" /></Link></li>
                            </ul>
                        </div>
                        <div className='col-11-xs card custom-card-bg row justify-center align-i-center max-h-third p-3'>
                            <Home />
                        </div>
                    </div>

                </div>

            </>
        )
    } else {
        return (
            <>
                <h1 className="page-center custom-text">You are not an admin!</h1>
            </>
        )
    }

}
 
export default index;