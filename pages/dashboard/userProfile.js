import { useRef, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
// store
import { collection, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import { db } from '../../firebase/clientApp';

const UserProfile = () => {

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

    console.log(data);

    // access auth
    const { user } = useAuth()

    return (
        <div className="page-center">
            <div className="card custom-card-bg p-4">
                {data.map(data => {
                    return(
                        data.uid == user.uid ? (
                            <>
                                <p className="custom-text">Display Name : {data.name}</p>
                                <p className="custom-text">Email : {data.email}</p>
                                <p className="custom-text">Method : {data.method}</p>
                                <p className="custom-text">Balance : {data.balance}</p>
                                <p className="custom-text">Role : {data.role}</p>
                                <p className="custom-text">UID : {data.uid}</p>
                                <p className="custom-text">Created : {data.created}</p>
                            </>
                        ) : (
                            <>
                            </>
                        )
                    )
                })}
            </div>
        </div>
    );
}
 
export default UserProfile;