import Head from 'next/head'
import Link from "next/link"
// react
import { useState } from 'react';
// firebase
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/clientApp';

const AddService = () => {

    const [service, setService] = useState({ number: '', title: '', category: '', price: '', description: '', min: '', max: '' })
    const onSubmit = async (event) => {
        event.preventDefault();
        const collectionRef = collection(db, "services")
        const docRef = await addDoc(collectionRef, { ...service })
        setService({ number: '', title: '', category: '', price: '', description: '', min: '', max: '' })
        alert(`Service ${docRef.id} is added successfully`)
    }

    return (
        <>

        <Head>
            <title>Affiliate - Starpanel | Admin</title>
        </Head>

        <div className="container">
            <div className="row justify-center align-i-center h-screen">
                <div className="col-11-xs">

                    <div className="card custom-card-bg-gradient justify-between br-md p-3">
                        
                        <div className="row">
                            <div className="col-9-xs column justify-center form-border-right">
                                <form className=''>

                                    <div className='row gap-2'>
                                        <div className='col-6-xs pt-1 pb-1'>
                                            <div className="column">
                                                <label className='custom-sub-text fw-md'>ID</label>
                                                <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="Number"
                                                    label='number'
                                                    value={service.number}
                                                    onChange={e => setService({ ...service, number: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-6-xs pt-1 pb-1'>
                                            <div className="column">
                                                <label className='custom-sub-text fw-md'>Title</label>
                                                <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="String" 
                                                    label='title'
                                                    value={service.title}
                                                    onChange={e => setService({ ...service, title: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row gap-2'>
                                        <div className='col-6-xs pt-1 pb-1'>
                                            <div className="column">
                                                <label className='custom-sub-text fw-md'>Category</label>
                                                <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="string" 
                                                    label='category'
                                                    value={service.category}
                                                    onChange={e => setService({ ...service, category: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-6-xs pt-1 pb-1'>
                                            <div className="column">
                                                <label className='custom-sub-text fw-md'>Price</label>
                                                <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="number" 
                                                    label='price'
                                                    value={service.price}
                                                    onChange={e => setService({ ...service, price: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row gap-2'>
                                        <div className='col-6-xs pt-1 pb-1'>
                                            <div className="column">
                                                <label className='custom-sub-text fw-md'>Description</label>
                                                <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base h-137-px" 
                                                    label='description'
                                                    value={service.description}
                                                    onChange={e => setService({ ...service, description: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-6-xs pt-1 pb-1'>
                                            <div className="column">
                                                <label className='custom-sub-text fw-md'>Min</label>
                                                <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="number" 
                                                    label='min'
                                                    value={service.min}
                                                    onChange={e => setService({ ...service, min: e.target.value })}
                                                />
                                            </div>
                                            <div className="column pt-1">
                                                <label className='custom-sub-text fw-md'>Max</label>
                                                <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="number" 
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
                            </div>

                            <div className='col-3-xs column align-i-end justify-center'>
                                <p className='font-xl fw-bold custom-text'>Admin</p>
                                <Link href="/signUp" passHref><p className='custom-sub-text pt-2 display-f align-i-center'>Fill out all the fields and add a service</p></Link>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>
        </div>

        </>
    );
}
 
export default AddService;