import { useEffect, useState } from 'react';
import { PayPalButton } from "react-paypal-button-v2";

const AddFunds = () => {

    const [paidFor , setPaidFor] = useState(false);
    const [amount , setAmount] = useState({
        price: 0,
    });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.paypal.com/sdk/js?client-id=ATlyE-3p215o9GT6HM3FsGFRs3zUBybJMtMkKqPutwVgfJXPwmN7HhhJDSYovJEkYUkIooPmSHBDl5j2"
        script.addEventListener("load", () => setLoaded(true))
        document.body.appendChild(script);
    }, [])

    return (
        <>
            <h2 className="custom-text">Add Funds</h2>
            <div className="card custom-variant-1-bg p-4 mt-3">
                <form>
                    <div className="display-f align-i-center mb-3">
                        <label className='font-lg custom-text fw-md'>Price: </label>
                        <input type="text" required className="input-t custom-card-bg custom-sub-text shadow-base ml-2" placeholder='Enter your amount' onChange={e => setAmount({ ...amount, price: e.target.value })} />
                    </div>
                        {paidFor ? (
                            <>
                                <p className='custom-text'>Thank You</p>
                            </>
                        ) : (
                            <>
                                <p className='font-lg custom-text mb-3'>Pay with PayPal</p>
                                    <PayPalButton 
                                        amount={amount.price}
                                        onSuccess={(details, data) => {
                                            alert("Transaction completed by " + details.payer.name.given_name);
                                            setPaidFor(true);
                                        }}
                                    />
                            </>
                        )}
                    </form>
            </div>
        </>
    );
}
 
export default AddFunds;