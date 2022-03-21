import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "../../context/AuthContext";
// store
import { collection, doc, onSnapshot, orderBy, query, QuerySnapshot, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/clientApp';

const Profile = () => {

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

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "tickets");

        const q = query(collectionRef, orderBy("date"));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setTickets(QuerySnapshot.docs.map(doc => ({ ...doc.data() })));
        });
        return unsubscribe;

    }, [])

    const toastRef = useRef();
    const modalRef = useRef();

    // update details
    const [update, setUpdate] = useState({
        name: ""
    });

    const handleChange = (e) => {
        e.preventDefault();
        if (update.name === "") {
            toastRef.current.className = "toast custom-error-bg";
            toastRef.current.children[0].innerHTML = "Please enter your new display name";
            setTimeout(() => {
                toastRef.current.className = "toast-hidden custom-error-bg"
            }, 2000)
        } else {
            const collectionRef = doc(db, "users", user.uid);
            updateDoc(collectionRef, { name: update.name });
            modalRef.current.className = "modal-hidden-profile";
            toastRef.current.className = "toast custom-color-bg";
            toastRef.current.children[0].innerHTML = "Successfully updated your display name";
            setTimeout(() => {
                toastRef.current.className = "toast-hidden custom-color-bg"
            }, 2000)
        }
    }

    return (
        <>
            {data.map(data => {

                const profileHandle = () => {
                    modalRef.current.className = "modal-profile";
                }

                const closeRef = () => {
                    modalRef.current.className = "modal-hidden-profile";
                }

                return(
                    data.uid == user.uid ? (
                        <>

                            <div ref={toastRef} className="toast-hidden custom-error-bg">
                                <p className='fw-md custom-text'>Error! please check your code</p>
                            </div>

                            <div ref={modalRef} className="modal-hidden-profile">
                                <div className="modal-content-profile card black-bg custom-card-bg-gradient base-shadow">
                                    <div>
                                        <div className="display-f align-i-center justify-between">
                                            <p className="font-lg fw-lg custom-text">Edit Profile</p>
                                            <span className="font-xl pointer custom-text" onClick={closeRef}>&times;</span>
                                        </div>
                                        <form>
                                            <div className="pt-2">
                                                <div className="row align-i-center">
                                                    <div className="col-12-xs display-f align-i-center">
                                                        <label className='custom-text fw-md'>Name</label>
                                                        <input type="text" required className="input-t custom-card-bg custom-sub-text shadow-base ml-2" placeholder={data.name} value={update.name} onChange={e => setUpdate({ ...update, name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="display-f justify-between align-i-center mt-3">
                                                    <p className="custom-text fw-md">Email : <span className="custom-sub-text fw-reg">{data.email}</span></p>
                                                    <p className="custom-text fw-md">UID : <span className="custom-sub-text fw-reg">{data.uid}</span></p>
                                                    <p className="custom-text fw-md">Created : <span className="custom-sub-text fw-reg">{data.created}</span></p>
                                                </div>
                                            </div>
                                            <button className="custom-btn custom-text mt-3 shadow-base" onClick={handleChange} >Save Changes</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="display-f mt-4">
                                <div className="row">
                                    <div onClick={profileHandle} className="col-12-xs pointer">
                                        <Image src="/img/profile.png" height={250} width={250} alt="img" />
                                    </div>
                                </div>
                                <div className="column pt-2 pl-3 justify-end">
                                    <h3 className="custom-text text-uppercase">profile</h3>
                                    <h1 className="font-xl-7 custom-text">{data.name}</h1>
                                    <p className="fw-md custom-text"><span>₹ </span>{data.balance}, Created on: {data.created}</p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h1 className="font-xl custom-text">Your Orders</h1>
                                <div className="custom-variant-1-bg p-3 mt-3 ml-3 mr-3">
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
                                    <div className="mt-3">
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

                            <div className="pb-4">
                                <h1 className="font-xl custom-text mt-3">Your Tickets</h1>
                                <div className="custom-variant-1-bg p-3 mt-3 ml-3 mr-3">
                                    <div className="row">
                                        <div className="col-3-xs">
                                            <p className="font-lg fw-md custom-text">Subject</p>
                                        </div>
                                        <div className="col-5-xs">
                                            <p className="font-lg fw-md custom-text">Message</p>
                                        </div>
                                        <div className="col-2-xs">
                                            <p className="font-lg fw-md custom-text">Status</p>
                                        </div>
                                        <div className="col-2-xs">
                                            <p className="font-lg fw-md custom-text">Date</p>
                                        </div>
                                    </div>
                                    {tickets.map(ticket => {
                                        return(
                                            ticket.uid == user.uid ? (
                                                <>
                                                    <div className="row mt-3">
                                                        <div className="col-3-xs">
                                                            <p className="custom-sub-text">{ticket.subject}</p>
                                                        </div>
                                                        <div className="col-5-xs">
                                                            <p className="custom-sub-text">{ticket.message}</p>
                                                        </div>
                                                        <div className="col-2-xs">
                                                            <p className="custom-sub-text">{ticket.status}</p>
                                                        </div>
                                                        <div className="col-2-xs">
                                                            <p className="custom-sub-text">{ticket.date}</p>
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
 
export default Profile;