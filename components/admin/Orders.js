// firebase
import { useEffect, useState } from "react";
// store
import { collection, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import { db } from "../../firebase/clientApp";

const Orders = () => {

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
            <div>

                <div className="row">

                    <div className="col-12-xs">
                        <p className="font-lg fw-md custom-text mt-3">Order List</p>
                        <div className="card custom-variant-1-bg p-4 mt-3">
                            <div className="row">
                                <div className="col-5-xs custom-text"><h3>Title</h3></div>
                                <div className="col-1-xs custom-text"><h3>Quantity</h3></div>
                                <div className="col-1-xs custom-text"><h3>Price</h3></div>
                                <div className="col-1-xs custom-text"><h3>Status</h3></div>
                                <div className="col-2-xs custom-text"><h3>Ordered Date</h3></div>
                                <div className="col-2-xs custom-text"><h3>Action</h3></div>
                            </div>
                            {orders.map(order => {
                            return (
                                    <div className="row align-i-center pt-3" key={order.id}>
                                        <div className="col-5-xs"><p className="custom-sub-text">{order.title}</p></div>
                                        <div className="col-1-xs"><p className="custom-sub-text">{order.quantity}</p></div>
                                        <div className="col-1-xs"><p className="custom-sub-text">{order.price}</p></div>
                                        <div className="col-1-xs"><p className="custom-sub-text">{order.status}</p></div>
                                        <div className="col-2-xs overflow-hidden"><p className="custom-sub-text">{order.date}</p></div>
                                        <div className="col-2-xs"><button className='custom-btn-rounded custom-text'>Options</button></div>
                                    </div>
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