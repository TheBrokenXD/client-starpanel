// firebase
import { useEffect, useState, useRef } from "react";
// store
import { collection, onSnapshot, orderBy, query, QuerySnapshot, doc, updateDoc } from "firebase/firestore";
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

    // modal
    const modalRef = useRef();
    const openRef = () => {
        modalRef.current.className = "modal-profile";
    }
    const closeRef = () => {
        modalRef.current.className = "modal-hidden-profile";
    }
    const modalRefTwo = useRef();
    const openRefTwo = () => {
        modalRefTwo.current.className = "modal-profile";
    }
    const closeRefTwo = () => {
        modalRefTwo.current.className = "modal-hidden-profile";
    }

    // clicked user
    const [clickedUser, setClickedUser] = useState({
        id: "",
        role: "",
        balance: "",
    });

    // update user
    const invertRole = (e) => {
        e.preventDefault();
        const collectionRef = doc(db, "users", clickedUser.id);
        if (clickedUser.role === "admin") {
            updateDoc(collectionRef, {
                role: "user",
            });
            closeRef();
        }
        else {
            updateDoc(collectionRef, {
                role: "admin",
            });
            closeRef();
        }
    }

    const [updateData, setUpdateData] = useState({
        balance: Number("")
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        const collectionRef = doc(db, "users", clickedUser.id);
        updateDoc(collectionRef, { balance: updateData.balance });
        closeRef();
    }

    // clicked order
    const [clickedOrder, setClickedOrder] = useState({
        id: "",
        status: "",
        link: ""
    });

    // update order
    const handleUpdateOrder = (e) => {
        e.preventDefault();
        const collectionRef = doc(db, "orders", clickedOrder.id);
        if (clickedOrder.status === "pending") {
            updateDoc(collectionRef, {
                status: "completed",
            });
            closeRefTwo();
        }
        else {
            updateDoc(collectionRef, {
                status: "pending",
            });
            closeRefTwo();
        }
    }

    return (
        <>

            <div ref={modalRef} className="modal-hidden-profile">
                <div className="modal-content-profile card black-bg custom-card-bg-gradient base-shadow">
                    <div>
                        <div className="display-f align-i-center justify-between">
                            <p className="font-lg fw-lg custom-text">Edit Profile</p>
                            <span className="font-xl pointer custom-text" onClick={closeRef}>&times;</span>
                        </div>
                        <form>
                            <div className="mt-2">
                                <div className="display-f justify-between align-i-center">
                                    <p className="custom-text">ID : {clickedUser.id}</p>
                                    <div className="display-f align-i-center">
                                        <p className="custom-text">Role : {clickedUser.role}</p>
                                        <button className="custom-btn custom-text ml-2" onClick={invertRole}>Invert</button>
                                    </div>
                                    <p className="custom-text">Balance : {clickedUser.balance}</p>
                                </div>
                                <div className="mt-2">
                                    <label className='custom-text fw-md'>Update Balance</label>
                                    <input type="text" required className="input-t custom-card-bg custom-sub-text shadow-base mt-1" placeholder="Update" onChange={e => setUpdateData({ ...updateData, balance: e.target.value })} />
                                </div>
                            </div>
                            <button className="custom-btn custom-text mt-3 shadow-base" onClick={handleUpdate}>Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>

            <div ref={modalRefTwo} className="modal-hidden-profile">
                <div className="modal-content-profile card black-bg custom-card-bg-gradient base-shadow">
                    <div>
                        <div className="display-f align-i-center justify-between">
                            <p className="font-lg fw-lg custom-text">Edit Order</p>
                            <span className="font-xl pointer custom-text" onClick={closeRefTwo}>&times;</span>
                        </div>
                        <form>
                            <div className="mt-2">
                                <div className="display-f justify-around">
                                    <p className="custom-text">Order ID: {clickedOrder.id}</p>
                                    <p className="custom-text">Status: {clickedOrder.status}</p>
                                </div>
                            </div>
                            <p className="custom-text text-center mt-2">Link - {clickedOrder.link}</p>
                            <div className="display-f justify-center mt-2">
                                <button className="custom-btn custom-text shadow-base pl-5 pr-5" onClick={handleUpdateOrder}>Invert</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

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
                                        <div className="col-2-xs"><button className='custom-btn-rounded custom-text' onClick={
                                            () => {
                                                setClickedUser({
                                                    id: data.uid,
                                                    role: data.role,
                                                    balance: data.balance
                                                });
                                                openRef()
                                            }
                                        }>Options</button></div>
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
                                        <div className="col-2-xs"><button className='custom-btn-rounded custom-text' onClick={
                                            () => {
                                                setClickedOrder({
                                                    id: order.orderId,
                                                    status: order.status,
                                                    link: order.link
                                                });
                                                openRefTwo()
                                            }
                                        }>Options</button></div>
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