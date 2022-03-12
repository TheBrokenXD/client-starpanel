const NewOrder = () => {
    return (
        <>

            <h2 className="custom-text">New Order</h2>

            <div>
                <form className="custom-variant-1-bg mt-3 p-4">
                    <div className="column">
                        <p className='font-lg fw-md custom-text'>Category</p>
                        <select required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" id="category">
                            <option>Please select an option</option>
                            <option value="social">Social</option>
                            <option value="web">Web</option>
                            <option value="telegram">Telegram</option>
                            <option value="premium">Premium</option>
                        </select>
                    </div>
                    <div className="mt-3 column">
                        <p className="font-lg custom-text">Services</p>
                        <select required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" id="services">
                            <option value="blah 1">blah 1</option>
                            <option value="blah 2">blah 2</option>
                            <option value="blah 3">blah 3</option>
                        </select>
                    </div>
                    <div className="mt-3 column">
                        <p className="font-lg custom-text">Description</p>
                        <p className="mt-1 custom-sub-text mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, omnis maiores magni repellendus at enim tempore, ad, natus voluptates est quibusdam aut numquam? Temporibus incidunt est iste veniam corrupti laudantium.</p>
                    </div>
                    <div className="column">
                        <label className='mt-3 font-lg custom-text fw-md'>Link</label>
                        <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="string" />
                    </div>
                    <div className="mt-3 column">
                        <label className='font-lg custom-text fw-md'>Quantity</label>
                        <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="number" />
                    </div>
                    <div className="display-f justify-between align-i-center mt-3">
                        <p className="font-lg fw-md custom-text">$0.00</p>
                        <button className="custom-btn-rounded custom-text pl-6 pr-6 pt-2 pb-2">Order</button>
                    </div>
                </form>
            </div>
        </>
    );
}
 
export default NewOrder;