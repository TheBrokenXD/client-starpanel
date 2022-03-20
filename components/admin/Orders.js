// firebase
import { useEffect, useState, useRef } from "react";
// store
import { collection, onSnapshot, orderBy, query, QuerySnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
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

    // display orders
    const displayPending = orders.filter(order => order.status === "pending");
    const displayCompleted = orders.filter(order => order.status === "completed");

    // modal
    const modalRef = useRef();
    const openRef = () => {
        modalRef.current.className = "modal-profile";
    }
    const closeRef = () => {
        modalRef.current.className = "modal-hidden-profile";
    }

    // clicked order
    const [clickedOrder, setClickedOrder] = useState({
        id: "",
        status: "",
        link: ""
    });

    // update order
    const handleUpdate = (e) => {
        e.preventDefault();
        const collectionRef = doc(db, "orders", clickedOrder.id);
        if (clickedOrder.status === "pending") {
            updateDoc(collectionRef, {
                status: "completed",
            });
            closeRef();
        }
        else {
            updateDoc(collectionRef, {
                status: "pending",
            });
            closeRef();
        }
    }

    // delete order
    const handleDelete = (e) => {
        e.preventDefault();
        const collectionRef = doc(db, "orders", clickedOrder.id);
        deleteDoc(collectionRef);
        closeRef();
    }

    return (
        <>

            <div ref={modalRef} className="modal-hidden-profile">
                <div className="modal-content-profile card black-bg custom-card-bg-gradient base-shadow">
                    <div>
                        <div className="display-f align-i-center justify-between">
                            <p className="font-lg fw-lg custom-text">Edit Order</p>
                            <span className="font-xl pointer custom-text" onClick={closeRef}>&times;</span>
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
                                <button className="custom-btn custom-text shadow-base pl-5 pr-5" onClick={handleUpdate}>Invert</button>
                                <button className="custom-btn custom-text ml-2" onClick={handleDelete}>Delete Order</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div>

                <div className="row">

                    <div className="col-12-xs">
                        <p className="font-lg fw-bold custom-text mt-3">Order List</p>
                        
                        <div className="card custom-variant-1-bg p-4 mt-3">
                            <div className="row">
                                <div className="col-5-xs custom-text"><h3>Title</h3></div>
                                <div className="col-1-xs custom-text"><h3>Quantity</h3></div>
                                <div className="col-1-xs custom-text"><h3>Price</h3></div>
                                <div className="col-1-xs custom-text"><h3>Status</h3></div>
                                <div className="col-2-xs custom-text"><h3>Ordered Date</h3></div>
                                <div className="col-2-xs custom-text"><h3>Action</h3></div>
                            </div>
                            {displayPending.map(order => {
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
                                                openRef()
                                            }
                                        }>Options</button></div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="card custom-variant-1-bg p-4 mt-3">
                            <div className="row">
                                <div className="col-5-xs custom-text"><h3>Title</h3></div>
                                <div className="col-1-xs custom-text"><h3>Quantity</h3></div>
                                <div className="col-1-xs custom-text"><h3>Price</h3></div>
                                <div className="col-1-xs custom-text"><h3>Status</h3></div>
                                <div className="col-2-xs custom-text"><h3>Ordered Date</h3></div>
                                <div className="col-2-xs custom-text"><h3>Action</h3></div>
                            </div>
                            {displayCompleted.map(order => {
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
                                                openRef()
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
 
export default Orders;