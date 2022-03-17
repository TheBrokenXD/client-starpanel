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

        const q = query(collectionRef, orderBy("created", "desc"));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setData(QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.number })));
        });
        return unsubscribe;

    }, [])
    // display last 4 users
    const displayUsers = data.slice(0, 4);


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
    // display last 4 orders
    const displayOrders = orders.slice(0, 4);


    return (
        <>

            <div>
                <div className="row">

                    <div className="col-12-xs">

                        <p className="font-lg fw-md custom-text mt-3">Recent Users</p>
                        <div className="card custom-variant-1-bg p-4 mt-3">
                            <div className="row">
                                <div className="col-2-xs custom-text"><h3>Name</h3></div>
                                <div className="col-3-xs custom-text"><h3>Email</h3></div>
                                <div className="col-2-xs custom-text"><h3>Balance</h3></div>
                                <div className="col-1-xs custom-text"><h3>Role</h3></div>
                                <div className="col-2-xs custom-text"><h3>Registered on</h3></div>
                                <div className="col-2-xs custom-text"><h3>Action</h3></div>
                            </div>
                            {displayUsers.map(data => {
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

                        <p className="font-lg fw-md custom-text mt-3">Recent Orders</p>
                        <div className="card custom-variant-1-bg p-4 mt-3">
                            <div className="row">
                                <div className="col-5-xs custom-text"><h3>Title</h3></div>
                                <div className="col-1-xs custom-text"><h3>Quantity</h3></div>
                                <div className="col-1-xs custom-text"><h3>Price</h3></div>
                                <div className="col-1-xs custom-text"><h3>Status</h3></div>
                                <div className="col-2-xs custom-text"><h3>Ordered Date</h3></div>
                                <div className="col-2-xs custom-text"><h3>Action</h3></div>
                            </div>
                            {displayOrders.map(order => {
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
 
export default Home;