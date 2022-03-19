import Link from "next/link"
import Image from "next/image"
// react
import { useEffect, useState, useRef } from "react";
// firebase
import { collection, onSnapshot, orderBy, query, QuerySnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/clientApp";

const Services = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "services");
        const q = query(collectionRef, orderBy("number", "asc"));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setServices(QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.number })));
        });
        return unsubscribe;
    }, [])

    const toastRef = useRef();

    const modalRefOne = useRef();
    const modalRefTwo = useRef();
    const modalRefThree = useRef();
    const modalRefFour = useRef();

    // modal
    const modalRef = useRef();
    const openRef = () => {
        modalRef.current.className = "modal-service";
    }
    const closeRef = () => {
        modalRef.current.className = "modal-hidden-service";
    }

    // clicked service
    const [clickedService, setClickedService] = useState();
    console.log(clickedService);

    // update data
    const [updateService, setUpdateService] = useState({ number: 0, title: '', price: '', description: '', min: '', max: '', limited: 'nope' });
    
    const handleUpdate = (e) => {
        e.preventDefault();

        if(updateService.title === '' || updateService.price === '' || updateService.number === '' || updateService.description === '' || updateService.min === '' || updateService.max === '') {
            toastRef.current.className = "toast custom-error-bg";
            toastRef.current.children[0].innerHTML = "Please fill all the fields"
            setTimeout(() => {
                toastRef.current.className = "toast-hidden custom-error-bg"
            }, 2000)
        } else if (updateService.number === 0) {
            toastRef.current.className = "toast custom-error-bg";
            toastRef.current.children[0].innerHTML = "Please fill all the fields"
            setTimeout(() => {
                toastRef.current.className = "toast-hidden custom-error-bg"
            }, 2000)
        } else {
            const collectionRef = doc(db, "services", clickedService.uid);
            updateDoc(collectionRef, { ...updateService })
            closeRef()
            setTimeout(() => {
                window.location.reload();
            }, 100)
        }
    }

    return (
        <div>

            <div ref={toastRef} className="toast-hidden custom-error-bg">
                <p className='fw-md custom-text'>Error! please check your code</p>
            </div>

            <div ref={modalRef} className="modal-hidden-service">
                <div className="modal-content-service card black-bg custom-card-bg-gradient base-shadow">
                    <div>
                        <div className="display-f align-i-center justify-between">
                            <p className="font-lg fw-lg custom-text">Edit Service</p>
                            <span className="font-xl pointer custom-text" onClick={closeRef}>&times;</span>
                        </div>
                        <form>
                            <div>
                                <div className='row gap-2'>
                                    <div className='col-6-xs pt-1 pb-1'>
                                        <div className="column">
                                            <label className='custom-sub-text fw-md' htmlFor='title'>Title</label>
                                            <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="string" 
                                                id='title'
                                                label='title'
                                                value={updateService.title}
                                                onChange={(e) => {
                                                    setUpdateService({ ...updateService, title: e.target.value })
                                                }}
                                                />
                                        </div>
                                    </div>
                                    <div className='col-3-xs pt-1 pb-1'>
                                        <div className="column">
                                            <label className='custom-sub-text fw-md' htmlFor='price'>Price</label>
                                            <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="number" 
                                                id='price'
                                                label='price'
                                                value={updateService.price}
                                                onChange={(e) => {
                                                    setUpdateService({ ...updateService, price: e.target.value })
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-3-xs pt-1 pb-1'>
                                        <div className="column">
                                            <label className='custom-sub-text fw-md' htmlFor='number'>ID</label>
                                            <input type="number" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="number" 
                                                id='number'
                                                label='number'
                                                value={updateService.number}
                                                onChange={(e) => {
                                                    setUpdateService({ ...updateService, number: Number(e.target.value) })
                                                }}
                                            />
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
                                                value={updateService.description}
                                                onChange={(e) => {
                                                    setUpdateService({ ...updateService, description: e.target.value })
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-6-xs pt-1 pb-1'>
                                        <div className="column">
                                            <label className='custom-sub-text fw-md' htmlFor='min'>Min</label>
                                            <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="number" 
                                                id='min'
                                                label='min'
                                                value={updateService.min}
                                                onChange={(e) => {
                                                    setUpdateService({ ...updateService, min: e.target.value })
                                                }}
                                            />
                                        </div>
                                        <div className="column pt-1">
                                            <label className='custom-sub-text fw-md' htmlFor='max'>Max</label>
                                            <input type="text" required className="mt-1 input-t custom-card-bg custom-sub-text shadow-base" placeholder="number" 
                                                id='max'
                                                label='max'
                                                value={updateService.max}
                                                onChange={(e) => {
                                                    setUpdateService({ ...updateService, max: e.target.value })
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="custom-btn custom-text mt-2 shadow-base" onClick={handleUpdate}>Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="display-f justify-between mt-3">
                <p className="font-lg fw-bold custom-text">Service List</p>
                <Link href="/admin/addService" passHref><button className="btn custom-btn-rounded custom-text">Add a new Service</button></Link>
            </div>
            

            <div className="row gap-1 mt-3">
                <div className="col-3-xs">
                    <Link href="#one" passHref><div className="card custom-card-bg-gradient p-2 pointer">
                        <h1 className="custom-text fw-md">Social</h1>
                    </div></Link>
                </div>
                <div className="col-3-xs">
                    <Link href="#two" passHref><div className="card custom-card-bg-gradient p-2 pointer">
                        <h1 className="custom-text fw-md">Web</h1>
                    </div></Link>
                </div>
                <div className="col-3-xs">
                    <Link href="#three" passHref><div className="card custom-card-bg-gradient p-2 pointer">
                        <h1 className="custom-text fw-md">Telegram</h1>
                    </div></Link>
                </div>
                <div className="col-3-xs">
                    <Link href="#four" passHref><div className="card custom-card-bg-gradient p-2 pointer">
                        <h1 className="custom-text fw-md">Premium</h1>
                    </div></Link>
                </div>
            </div>

            <div className="row" id="one">

                <div className="col-12-xs mt-3">
                    <div className="card custom-variant-1-bg p-4">
                        
                        <div className="row">
                            <div className="col-1-xs custom-text"><h3>ID</h3></div>
                            <div className="col-5-xs custom-text"><h3>Title</h3></div>
                            <div className="col-1-xs custom-text"><h3>Price</h3></div>
                            <div className="col-1-xs custom-text"><h3>Min</h3></div>
                            <div className="col-1-xs custom-text"><h3>Max</h3></div>
                            <div className="col-1-xs custom-text"><h3>Desc.</h3></div>
                            <div className="col-1-xs custom-text"><h3>Action</h3></div>
                        </div>

                        {services.map(service => {

                            const descHandle = () => {
                                modalRefOne.current.className = "modal";
                            }
                            const closeRef = () => {
                                modalRefOne.current.className = "modal-hidden";
                            }

                            return(
                                service.category === "social" ? (
                                    <>
                                        <div key={service.id} className="row align-i-center pt-3">
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.number}</p></div>
                                            <div className="col-5-xs"><p className="custom-sub-text">{service.title}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.price}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.min}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.max}</p></div>
                                            <div className="col-1-xs">
                                                <p className="custom-text pointer" onClick={descHandle}>
                                                    <Image src="/svg/services/description.svg" height={30} width={30} alt="icon" />
                                                </p>
                                                <div ref={modalRefOne} className="modal-hidden">
                                                    <div className="modal-content card black-bg custom-card-bg-gradient base-shadow">
                                                        <span className="float-right font-xl pointer custom-text" onClick={closeRef}>&times;</span>
                                                        <p className="font-lg fw-lg custom-text">Description</p>
                                                        <p className="custom-sub-text pt-2">{service.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-2-xs"><button className='custom-btn-rounded custom-text' onClick={
                                                () => {
                                                    setClickedService({
                                                        ...service
                                                    });
                                                    openRef()
                                                }
                                            }>Options</button></div>
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

            <div className="row mt-2" id="two">

                <div className="col-12-xs">
                    <div className="card custom-variant-1-bg p-4">
                        
                        <div className="row">
                            <div className="col-1-xs custom-text"><h3>ID</h3></div>
                            <div className="col-5-xs custom-text"><h3>Title</h3></div>
                            <div className="col-1-xs custom-text"><h3>Price</h3></div>
                            <div className="col-1-xs custom-text"><h3>Min</h3></div>
                            <div className="col-1-xs custom-text"><h3>Max</h3></div>
                            <div className="col-1-xs custom-text"><h3>Desc.</h3></div>
                            <div className="col-1-xs custom-text"><h3>Action</h3></div>
                        </div>

                        {services.map(service => {

                            const descHandle = () => {
                                modalRefTwo.current.className = "modal";
                            }
                            const closeRef = () => {
                                modalRefTwo.current.className = "modal-hidden";
                            }

                            return(
                                service.category === "web" ? (
                                    <>
                                        <div key={service.id} className="row align-i-center pt-3">
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.number}</p></div>
                                            <div className="col-5-xs"><p className="custom-sub-text">{service.title}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.price}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.min}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.max}</p></div>
                                            <div className="col-1-xs">
                                                <p className="custom-text pointer" onClick={descHandle}>
                                                    <Image src="/svg/services/description.svg" height={30} width={30} alt="icon" />
                                                </p>
                                                <div ref={modalRefTwo} className="modal-hidden">
                                                    <div className="modal-content card black-bg custom-card-bg-gradient base-shadow">
                                                        <span className="float-right font-xl pointer custom-text" onClick={closeRef}>&times;</span>
                                                        <p className="font-lg fw-lg custom-text">Description</p>
                                                        <p className="custom-sub-text pt-2">{service.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-2-xs"><button className='custom-btn-rounded custom-text' onClick={
                                                () => {
                                                    setClickedService({
                                                        ...service
                                                    });
                                                    openRef()
                                                }
                                            }>Options</button></div>
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

            <div className="row mt-2 mb-2" id="three">

                <div className="col-12-xs">
                    <div className="card custom-variant-1-bg p-4">
                        
                        <div className="row">
                            <div className="col-1-xs custom-text"><h3>ID</h3></div>
                            <div className="col-5-xs custom-text"><h3>Title</h3></div>
                            <div className="col-1-xs custom-text"><h3>Price</h3></div>
                            <div className="col-1-xs custom-text"><h3>Min</h3></div>
                            <div className="col-1-xs custom-text"><h3>Max</h3></div>
                            <div className="col-1-xs custom-text"><h3>Desc.</h3></div>
                            <div className="col-1-xs custom-text"><h3>Action</h3></div>
                        </div>

                        {services.map(service => {

                            const descHandle = () => {
                                modalRefThree.current.className = "modal";
                            }
                            const closeRef = () => {
                                modalRefThree.current.className = "modal-hidden";
                            }

                            return(
                                service.category === "telegram" ? (
                                    <>
                                        <div key={service.id} className="row align-i-center pt-3">
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.number}</p></div>
                                            <div className="col-5-xs"><p className="custom-sub-text">{service.title}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.price}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.min}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.max}</p></div>
                                            <div className="col-1-xs">
                                                <p className="custom-text pointer" onClick={descHandle}>
                                                    <Image src="/svg/services/description.svg" height={30} width={30} alt="icon" />
                                                </p>
                                                <div ref={modalRefThree} className="modal-hidden">
                                                    <div className="modal-content card black-bg custom-card-bg-gradient base-shadow">
                                                        <span className="float-right font-xl pointer custom-text" onClick={closeRef}>&times;</span>
                                                        <p className="font-lg fw-lg custom-text">Description</p>
                                                        <p className="custom-sub-text pt-2">{service.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-2-xs"><button className='custom-btn-rounded custom-text' onClick={
                                                () => {
                                                    setClickedService({
                                                        ...service
                                                    });
                                                    openRef()
                                                }
                                            }>Options</button></div>
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

            <div className="row mt-2 mb-2" id="four">

                <div className="col-12-xs">
                    <div className="card custom-variant-1-bg p-4">
                        
                        <div className="row">
                            <div className="col-1-xs custom-text"><h3>ID</h3></div>
                            <div className="col-5-xs custom-text"><h3>Title</h3></div>
                            <div className="col-1-xs custom-text"><h3>Price</h3></div>
                            <div className="col-1-xs custom-text"><h3>Min</h3></div>
                            <div className="col-1-xs custom-text"><h3>Max</h3></div>
                            <div className="col-1-xs custom-text"><h3>Desc.</h3></div>
                            <div className="col-1-xs custom-text"><h3>Action</h3></div>
                        </div>

                        {services.map(service => {

                            const descHandle = () => {
                                modalRefFour.current.className = "modal";
                            }
                            const closeRef = () => {
                                modalRefFour.current.className = "modal-hidden";
                            }

                            return(
                                service.category === "premium" ? (
                                    <>
                                        <div key={service.id} className="row align-i-center pt-3">
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.number}</p></div>
                                            <div className="col-5-xs"><p className="custom-sub-text">{service.title}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.price}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.min}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.max}</p></div>
                                            <div className="col-1-xs">
                                                <p className="custom-text pointer" onClick={descHandle}>
                                                    <Image src="/svg/services/description.svg" height={30} width={30} alt="icon" />
                                                </p>
                                                <div ref={modalRefFour} className="modal-hidden">
                                                    <div className="modal-content card black-bg custom-card-bg-gradient base-shadow">
                                                        <span className="float-right font-xl pointer custom-text" onClick={closeRef}>&times;</span>
                                                        <p className="font-lg fw-lg custom-text">Description</p>
                                                        <p className="custom-sub-text pt-2">{service.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-2-xs"><button className='custom-btn-rounded custom-text' onClick={
                                                () => {
                                                    setClickedService({
                                                        ...service
                                                    });
                                                    openRef()
                                                }
                                            }>Options</button></div>
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

        </div>
    );
}
 
export default Services;
