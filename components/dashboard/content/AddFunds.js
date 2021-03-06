import { useEffect, useState, useRef } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { useAuth } from '../../../context/AuthContext';
// store
import { collection, doc, onSnapshot, orderBy, query, QuerySnapshot, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase/clientApp';

const AddFunds = () => {

    const [paidFor , setPaidFor] = useState(false);
    const [amount , setAmount] = useState({
        price: 0,
    });
    const price = amount.price;
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.paypal.com/sdk/js?client-id=ATlyE-3p215o9GT6HM3FsGFRs3zUBybJMtMkKqPutwVgfJXPwmN7HhhJDSYovJEkYUkIooPmSHBDl5j2"
        script.addEventListener("load", () => setLoaded(true))
        document.body.appendChild(script);

        const scriptTwo = document.createElement('script');
        scriptTwo.src = "https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/.js"
        scriptTwo.addEventListener("load", () => setLoaded(true))
        document.body.appendChild(scriptTwo);
    }, [])

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

    // paypal convert
    const api = "https://api.exchangerate-api.com/v4/latest/USD";
    const [inrToUsd, setInrToUsd] = useState(0);
    useEffect(() => {
        fetch(api)
            .then(res => res.json())
            .then(data => {
                setInrToUsd(data.rates.INR);
            })
    }, [])
    const paypalPriceInt = price / inrToUsd;
    const paypalPrice = Math.floor(paypalPriceInt);

    const toastRef = useRef();
    
    return (
        <>
            <h2 className="custom-text">Add Funds</h2>
            <div className="card custom-variant-1-bg p-4 mt-3">
                <form>
                    <div className="display-f align-i-center mb-3">
                        <label className='font-lg custom-text fw-md'>Price: </label>
                        <input type="text" required className="input-t custom-card-bg custom-sub-text shadow-base ml-2" placeholder='Minimum of 80rs' onChange={e => setAmount({ ...amount, price: Number(e.target.value)})} />
                    </div>
                        {paidFor ? (
                            <>
                                <div ref={toastRef} className="toast-hidden custom-error-bg">
                                    <p className='fw-md custom-text'>Error! please check your code</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <p className='font-lg custom-text mb-3'>Pay with PayPal</p>
                                        <PayPalButton 
                                            amount={paypalPrice}
                                            onSuccess={(details, data) => {
                                                setPaidFor(true);
                                                const collectionRef = doc(db, "users", user.uid);
                                                updateDoc(collectionRef, { balance: currentUser[0].balance + price });
                                                toastRef.current.className = "toast custom-color-bg";
                                                toastRef.current.children[0].innerHTML = "Order placed successfully"
                                                setTimeout(() => {
                                                    toastRef.current.className = "toast-hidden custom-color-bg"
                                                }, 2000)
                                            }}
                                        />
                                    </div>
                            </>
                        )}
                    </form>
            </div>
        </>
    );
}
 
export default AddFunds;