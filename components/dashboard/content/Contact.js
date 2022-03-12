const Contact = () => {
    return (
        <>

            <h2 className="custom-text">Contact</h2>

            <div className="card custom-variant-1-bg mt-2">
                <form className="p-2">
                    <div className="column">
                        <label className='font-lg custom-text'>Subject</label>
                        <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="string" />
                    </div>
                    <div className="column mt-2">
                        <label className='font-lg custom-text' htmlFor='message'>Message</label>
                        <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base h-137-px" />
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
                    <button className="custom-btn-rounded custom-text mr-2">Telegram</button>
                    <button className="custom-btn-rounded custom-text">Whatsapp</button>
                </div>
            </div>

        </>
    );
}
 
export default Contact;