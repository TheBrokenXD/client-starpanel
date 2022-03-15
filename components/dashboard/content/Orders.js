import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
// firebase
import { collection, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";

const Orders = () => {

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
    const currentUser = data.filter(data => user.uid === data.uid);

    // access orders
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "orders");

        const q = query(collectionRef, orderBy("date"));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setOrders(QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.number })));
        });
        return unsubscribe;

    }, [])

    return (
        <>

            <h2 className="custom-text">Orders</h2>

            <div className="mt-3">
                <div className="row">
                    <div className="col-12-xs">
                        <div className="card custom-variant-1-bg p-4">

                            <div className="row">
                                <div className="col-4-xs">
                                    <p className="font-lg fw-md custom-text">Title</p>
                                </div>
                                <div className="col-2-xs">
                                    <p className="font-lg fw-md custom-text">Quantity</p>
                                </div>
                                <div className="col-2-xs">
                                    <p className="font-lg fw-md custom-text">Price</p>
                                </div>
                                <div className="col-2-xs">
                                    <p className="font-lg fw-md custom-text">Status</p>
                                </div>
                                <div className="col-2-xs">
                                    <p className="font-lg fw-md custom-text">Ordered Date</p>
                                </div>
                            </div>
                            
                            {orders.map(order => {
                                return(
                                    order.uid == user.uid ? (
                                        <>
                                            <div className="row mt-3">
                                                <div className="col-4-xs">
                                                    <p className="custom-sub-text">{order.title}</p>
                                                </div>
                                                <div className="col-2-xs">
                                                    <p className="custom-sub-text">{order.quantity}</p>
                                                </div>
                                                <div className="col-2-xs">
                                                    <p className="custom-sub-text">₹ {order.price}</p>
                                                </div>
                                                <div className="col-2-xs">
                                                    <p className="custom-sub-text">{order.status}</p>
                                                </div>
                                                <div className="col-2-xs">
                                                    <p className="custom-sub-text">{order.date}</p>
                                                </div>
                                            </div>
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
 
export default Orders;