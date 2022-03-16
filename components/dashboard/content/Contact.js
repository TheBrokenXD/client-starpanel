import { useState } from 'react';
import { useEffect, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
// firebase
import { collection, onSnapshot, orderBy, query, QuerySnapshot, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";

const Contact = () => {

    const [ticket, setTicket] = useState({ subject: '', message: '' });
    
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

    const toastRef = useRef();

    // store ticket in database
    const createTicket = (e) => {

        e.preventDefault();

        if (ticket.subject === '' || ticket.message === '') {
            toastRef.current.className = "toast custom-error-bg";
            toastRef.current.children[0].innerHTML = "Please fill all fields";
            setTimeout(() => {
                toastRef.current.className = "toast-hidden custom-error-bg";
            }, 2000);
        } else {
            const collectionRef = collection(db, "tickets");
            addDoc(collectionRef, {
                subject: ticket.subject,
                message: ticket.message,
                user: currentUser[0].name,
                userId: currentUser[0].uid,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                status: 'open',
            }) 
            .then(() => {
                toastRef.current.className = "toast custom-color-bg";
                toastRef.current.children[0].innerHTML = "Ticket placed successfully";
                setTimeout(() => {
                    toastRef.current.className = "toast-hidden custom-custom-bg";
                    window.location.reload();
                }, 2000);
            })
        }
    }

    return (
        <>

            <div ref={toastRef} className="toast-hidden custom-error-bg">
                <p className='fw-md custom-text'>Error! please check your code</p>
            </div>

            <h2 className="custom-text">Contact</h2>

            <div className="card custom-variant-1-bg mt-3 p-4">
                <form>
                    <div className="column">
                        <label className='font-lg custom-text'>Subject</label>
                        <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="string" onChange= { (e) => { setTicket({ ...ticket, subject: e.target.value, }) } } />
                    </div>
                    <div className="column mt-2">
                        <label className='font-lg custom-text'>Message</label>
                        <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base h-137-px" onChange= { (e) => { setTicket({ ...ticket, message: e.target.value, }) } } />
                    </div>
                    <div className="display-f justify-between align-i-center mt-3">
                        <p className="font-lg custom-sub-text">Admins will reach out to you soon!</p>
                        <button className="custom-btn-rounded custom-text pl-6 pr-6 pt-2 pb-2" onClick={createTicket}>Create a ticket</button>
                    </div>
                </form>
            </div>

            <div className="display-f justify-around mt-3">
                <p className="font-lg fw-md custom-text">You can also contact via:</p>
                <div>
                    <a target="_blank" href="https://t.me/StarPanelsupport" rel="noopener noreferrer"><button className="custom-btn-rounded custom-text mr-2">Telegram</button></a>
                    <a target="_blank" href="https://wa.me/+917807673229" rel="noopener noreferrer"><button className="custom-btn-rounded custom-text">Whatsapp</button></a>
                </div>
            </div>

        </>
    );
}
 
export default Contact;