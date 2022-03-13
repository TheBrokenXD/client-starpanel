import { useState } from 'react';

const Contact = () => {

    const [ticket, setTicket] = useState({ subject: '', message: '' });
    console.log(ticket);

    return (
        <>

            <h2 className="custom-text">Contact</h2>

            <div className="card custom-variant-1-bg mt-3 p-4">
                <form>
                    <div className="column">
                        <label className='font-lg custom-text'>Subject</label>
                        <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="string" onChange= { (e) => { setTicket({ ...ticket, subject: e.target.value, }) } } />
                    </div>
                    <div className="column mt-2">
                        <label className='font-lg custom-text' htmlFor='message'>Message</label>
                        <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base h-137-px" onChange= { (e) => { setTicket({ ...ticket, message: e.target.value, }) } } />
                    </div>
                    <div className="display-f justify-between align-i-center mt-3">
                        <p className="font-lg custom-sub-text">Admins will reach out to you soon!</p>
                        <button className="custom-btn-rounded custom-text pl-6 pr-6 pt-2 pb-2">Create a ticket</button>
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