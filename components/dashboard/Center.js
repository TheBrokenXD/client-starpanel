import { useEffect, useState } from "react";
// firebase
import { useAuth } from '../../context/AuthContext';
import { collection, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import { db } from '../../firebase/clientApp';

const Center = () => {

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
            <h1 className="custom-text pl-5 pt-5">WIP</h1>
        </>
    );
}
 
export default Center;