import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
// firebase
import { addDoc, collection, doc, onSnapshot, orderBy, query, QuerySnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";
import { async } from "@firebase/util";

const NewOrder = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "services");
        
        const q = query(collectionRef, orderBy("number"));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setServices(QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.number })));
        });
        return unsubscribe;
    }, [])

    const social = services.filter(service => service.category === "social");
    const web = services.filter(service => service.category === "web");
    const telegram = services.filter(service => service.category === "telegram");
    const premium = services.filter(service => service.category === "premium");

    const [active, setActive] = useState('1');

    const activeSelect = (e) => {
        setActive(e.target.value);
    }

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

    // sending to db

    const [details, setDetails] = useState({
        title: '',
        link: '',
        quantity: '',
        price: ''
    })

    const [title, setTitle] = useState('Instagram Likes (Real, HQ, Indian, Non Drop)');

    const activeTitle = (e) => {
        setTitle(e.target.value);
        setDetails({
            ...details,
            title: e.target.value,
        })
    }

    const quanChange = (e) => { 
        setDetails({ 
            ...details, 
            quantity: e.target.value,
            
        })
    }

    const toastRef = useRef();

    const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

    const orderClick = (e) => {
        e.preventDefault();

        if (details.title === '' || details.link === '' || details.quantity === '') {
            toastRef.current.className = "toast custom-error-bg";
            toastRef.current.children[0].innerHTML = "Please fill all the fields"
            setTimeout(() => {
                toastRef.current.className = "toast-hidden custom-error-bg"
            }, 2000)
        } else if (regex.test(details.link) === false) {
            toastRef.current.className = "toast custom-error-bg";
            toastRef.current.children[0].innerHTML = "Please enter a valid link"
            setTimeout(() => {
                toastRef.current.className = "toast-hidden custom-error-bg"
            }, 2000)
        } else if (details.quantity < Number(services.filter(service => service.title === title)[0].min)) {
            toastRef.current.className = "toast custom-error-bg";
            toastRef.current.children[0].innerHTML = `Please enter a valid quantity. Minimum quantity is ${services.filter(service => service.title === title)[0].min}`
            setTimeout(() => {
                toastRef.current.className = "toast-hidden custom-error-bg"
            }, 2000)
        } else if (details.quantity > Number(services.filter(service => service.title === title)[0].max)) {
            toastRef.current.className = "toast custom-error-bg";
            toastRef.current.children[0].innerHTML = `Please enter a valid quantity. Maximum quantity is ${services.filter(service => service.title === title)[0].max}`
            setTimeout(() => {
                toastRef.current.className = "toast-hidden custom-error-bg"
            }, 2000)
        } else if (currentUser[0].balance < details.price) {
            toastRef.current.className = "toast custom-error-bg";
            toastRef.current.children[0].innerHTML = "Insufficient funds"
            setTimeout(() => {
                toastRef.current.className = "toast-hidden custom-error-bg"
            }, 2000)
        } else {
            const collectionRef = collection(db, "orders");
            addDoc(collectionRef, {
                title: details.title,
                link: details.link,
                quantity: details.quantity,
                price: details.quantity * (services.filter(service => service.title === title)[0].price / services.filter(service => service.title === title)[0].min),
                uid: user.uid,
                status: 'pending',
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                orderId: `${new Date().getTime()}${user.uid}`
            })
            .then(() => {
                const collectionRef = collection(db, "users");
                const docRef = doc(collectionRef, user.uid);
                updateDoc(docRef, {
                    balance: currentUser[0].balance - (details.quantity * (services.filter(service => service.title === title)[0].price / services.filter(service => service.title === title)[0].min).toFixed(6))
                })
            }) .then(() => {
                toastRef.current.className = "toast custom-color-bg";
                toastRef.current.children[0].innerHTML = "Order placed successfully"
                setTimeout(() => {
                    toastRef.current.className = "toast-hidden custom-color-bg"
                }, 2000)
            })
        }
    }

    return (
        <>

            <div ref={toastRef} className="toast-hidden custom-error-bg">
                <p className='fw-md custom-text'>Error! please check your code</p>
            </div>

            <h2 className="custom-text">New Order</h2>

            <div>
                <form className="custom-variant-1-bg mt-3 p-4">
                    <div className="column">
                        <p className='font-lg fw-md custom-text'>Category</p>
                        <select required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" id="category" onChange={activeSelect}>
                            <option value="1">Social</option>
                            <option value="2">Web</option>
                            <option value="3">Telegram</option>
                            <option value="4">Premium</option>
                        </select>
                    </div>
                    <div className="mt-3 column">
                        <p className="font-lg custom-text">Services</p>
                        <select required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" id="services" onChange={activeTitle}>

                            {
                                active == '1' ? (
                                    social.map(service => (
                                        <option key={service.id} value={service.title}>{service.title}</option>
                                    ))
                                ) : active == '2' ? (
                                    web.map(service => (
                                        <option key={service.id} value={service.title}>{service.title}</option>
                                    ))
                                ) : active == '3' ? (
                                    telegram.map(service => (
                                        <option key={service.id} value={service.title}>{service.title}</option>
                                    ))
                                ) : active == '4' ? (
                                    premium.map(service => (
                                        <option key={service.id} value={service.title}>{service.title}</option>
                                    ))
                                ) : (
                                    <option>Please select an option</option>
                                )
                            }
                            
                        </select>
                    </div>
                    <div className="mt-3 column">
                        <p className="font-lg custom-text">Description</p>
                        {
                            services.map(service => {
                                return (
                                    title == service.title ? (
                                        <p className="mt-1 custom-sub-text">{service.description}</p>
                                    ) : null
                                )
                            })
                        }
                    </div>
                    <div className="column">
                        <label className='mt-3 font-lg custom-text fw-md'>Link</label>
                        <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="string" onChange={ (e) => { setDetails({ ...details, link: e.target.value, }) } } />
                    </div>
                    <div className="mt-3 column">
                        <label className='font-lg custom-text fw-md'>Quantity</label>
                        {
                            services.map(service => {
                                return (
                                    title == service.title ? (
                                        <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder={service.min} onChange={quanChange} />
                                    ) : null
                                )
                            })
                        }
                    </div>
                    <div className="display-f justify-between align-i-center mt-3">
                        {
                            services.map(service => {
                                return (
                                    title == service.title ? (
                                        <div className="display-f">
                                            <span className="font-lg custom-text">₹</span>
                                            <p className="font-lg custom-text pl-1" id="priceID">
                                            {
                                                ((details.quantity / service.min) * (service.price)).toFixed(2)
                                            }
                                            </p>
                                        </div>
                                    ) : null
                                )
                            })
                        }
                        
                        <button className="custom-btn-rounded custom-text pl-6 pr-6 pt-2 pb-2" onClick={orderClick}>Order</button>
                    </div>
                </form>
            </div>
        </>
    );
}
 
export default NewOrder;