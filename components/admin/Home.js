import Link from "next/link";
// firebase
import { useEffect, useState } from "react";
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

    // display last 4 users
    const displayUsers = data.slice(0, 4);
    console.log(displayUsers)

    return (
        <>

            <div>
                <div className="row">

                    <div className="col-12-xs">
                        <p className="font-lg fw-md custom-text mt-2">Recent Users</p>
                        <div className="card custom-hover-bg p-3 mt-2">
                            <div className="row">
                                <div className="col-2-xs custom-text"><h3>Name</h3></div>
                                <div className="col-3-xs custom-text"><h3>Email</h3></div>
                                <div className="col-2-xs custom-text"><h3>Balance</h3></div>
                                <div className="col-1-xs custom-text"><h3>Role</h3></div>
                                <div className="col-2-xs custom-text"><h3>Registered on</h3></div>
                                <div className="col-2-xs custom-text"><h3>Action</h3></div>
                            </div>
                            {data.map(data => {
                            return (
                                    <div className="row align-i-center pt-3" key={data.uid}>
                                        <div className="col-2-xs"><p className="custom-sub-text">{data.name}</p></div>
                                        <div className="col-3-xs"><p className="custom-sub-text">{data.email}</p></div>
                                        <div className="col-2-xs"><p className="custom-sub-text">{data.balance}</p></div>
                                        <div className="col-1-xs"><p className="custom-sub-text">{data.role}</p></div>
                                        <div className="col-2-xs overflow-hidden"><p className="custom-sub-text">{data.created}</p></div>
                                        {data.role == "admin" ? (
                                            <div className="col-2-xs"><button className='custom-btn-rounded custom-text'>Options</button></div>
                                        ) : (
                                            <div className="col-2-xs"><button className='custom-btn-rounded custom-text'>Options</button></div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                        <p className="font-lg fw-md custom-text mt-2">Pending Orders</p>
                    </div>
                    
                </div>
            </div>

        </>
    );
}
 
export default Home;