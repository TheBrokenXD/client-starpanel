import Head from 'next/head'
import Link from "next/link"
// react
import { useState, useRef } from "react";
// firebase
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/clientApp';

const NewForm = () => {

    // getting some classes
    const toastRef = useRef();

    // adding new service
    const [service, setService] = useState({ number: '', title: '', category: '', price: '', description: '', min: '', max: '' });

    const onSubmit = async (event) => {
        event.preventDefault();

        if(service.title === '' || service.price === '' || service.number === '' || service.category === '' || service.description === '' || service.min === '' || service.max === '') {
            toastRef.current.className = "toast custom-error-bg";
            toastRef.current.children[0].innerHTML = "Please fill all the fields"
            setTimeout(() => {
                toastRef.current.className = "toast-hidden custom-error-bg"
            }, 2000)
        } else if (service.category === 'Please select an option') {
            toastRef.current.className = "toast custom-error-bg";
            toastRef.current.children[0].innerHTML = "Please fill all the fields"
            setTimeout(() => {
                toastRef.current.className = "toast-hidden custom-error-bg"
            }, 2000)
        } else {
            const collectionRef = collection(db, "services")
            const docRef = await addDoc(collectionRef, { ...service })
            setService({ number: '', title: '', category: '', price: '', description: '', min: '', max: '' })
            toastRef.current.className = "toast custom-color-bg";
            toastRef.current.children[0].innerHTML = `Service ${service.title} is added successfully`
            setTimeout(() => {
                toastRef.current.className = "toast-hidden custom-color-bg"
            }, 4000)
        }
    }

    return (
        <>

        <div ref={toastRef} className="toast-hidden custom-error-bg">
            <p className='fw-md custom-text'>Error! please check your code</p>
        </div>

        <form className=''>

            <div className='row gap-2'>
                <div className='col-6-xs pt-1 pb-1'>
                    <div className="column">
                        <label className='custom-sub-text fw-md' htmlFor='title'>Title</label>
                        <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="String" 
                            id='title'
                            label='title'
                            value={service.title}
                            onChange={e => setService({ ...service, title: e.target.value })}
                        />
                    </div>
                </div>
                <div className='col-3-xs pt-1 pb-1'>
                    <div className="column">
                        <label className='custom-sub-text fw-md' htmlFor='price'>Price</label>
                        <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="number" 
                            id='price'
                            label='price'
                            value={service.price}
                            onChange={e => setService({ ...service, price: e.target.value })}
                        />
                    </div>
                </div>
                <div className='col-3-xs pt-1 pb-1'>
                    <div className="column">
                        <label className='custom-sub-text fw-md' htmlFor='number'>ID</label>
                        <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="number" 
                            id='number'
                            label='number'
                            value={service.number}
                            onChange={e => setService({ ...service, number: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className='row gap-2'>
                <div className='col-12-xs pt-1 pb-1'>
                    <div className="column">
                        <label className='custom-sub-text fw-md' htmlFor='category'>Category</label>
                        <select required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="string" id="category" value={service.category} onChange={e => setService({ ...service, category: e.target.value })}>
                            <option>Please select an option</option>
                            <option value="social">Social</option>
                            <option value="web">Web</option>
                            <option value="telegram">Telegram</option>
                            <option value="premium">Premium</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='row gap-2'>
                <div className='col-6-xs pt-1 pb-1'>
                    <div className="column">
                        <label className='custom-sub-text fw-md' htmlFor='description'>Description</label>
                        <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base h-137-px" 
                            id='description'
                            label='description'
                            value={service.description}
                            onChange={e => setService({ ...service, description: e.target.value })}
                        />
                    </div>
                </div>
                <div className='col-6-xs pt-1 pb-1'>
                    <div className="column">
                        <label className='custom-sub-text fw-md' htmlFor='min'>Min</label>
                        <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="number" 
                            id='min'
                            label='min'
                            value={service.min}
                            onChange={e => setService({ ...service, min: e.target.value })}
                        />
                    </div>
                    <div className="column pt-1">
                        <label className='custom-sub-text fw-md' htmlFor='max'>Max</label>
                        <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="number" 
                            id='max'
                            label='max'
                            value={service.max}
                            onChange={e => setService({ ...service, max: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className='display-f'>
                <button type="submit" onClick={onSubmit} className="custom-btn-rounded custom-text pl-5 pr-5 pt-2 pb-2 shadow-base">Add Service</button>
            </div>

            </form>

        </>
    );
}
 
export default NewForm;