import Link from "next/link";
// firebase
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
// store
import { collection, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import { db } from "../../firebase/clientApp";

const Home = () => {

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

    return (
        <>

            {data.map(data => {
                return(
                    data.uid == user.uid ? (
                        <>
                            <p className="font-lg fw-md custom-text">Welcome Back {data.name}!</p>
                            
                            <div className="row gap-1">

                                <div className="col-4-xs">
                                    <div className="card custom-card-bg-gradient p-2 mt-3">
                                        <p className="font-lg fw-md custom-text">Users</p>
                                        <Link href="#" passHref><button className='custom-btn-rounded custom-text mt-2 pl-5 pr-5 pt-2 pb-2'>View Users</button></Link>
                                    </div>
                                </div>

                                <div className="col-4-xs">
                                    <div className="card custom-card-bg-gradient p-2 mt-3">
                                        <p className="font-lg fw-md custom-text">Orders</p>
                                        <Link href="#" passHref><button className='custom-btn-rounded custom-text mt-2 pl-5 pr-5 pt-2 pb-2'>View Orders</button></Link>
                                    </div>
                                </div>

                                <div className="col-4-xs">
                                    <div className="card custom-card-bg-gradient p-2 mt-3">
                                        <p className="font-lg fw-md custom-text">Services</p>
                                        <Link href="/admin/addService" passHref><button className='custom-btn-rounded custom-text mt-2 pl-5 pr-5 pt-2 pb-2'>Edit Service</button></Link>
                                    </div>
                                </div>

                            </div>
                        </>
                    ) : (
                        <>
                        </>
                    )
                )
            })}

        </>
    );
}
 
export default Home;