import Link from "next/link"
import Image from "next/image"
// react
import { useEffect, useState, useRef } from "react";
// firebase
import { collection, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import { db } from "../../firebase/clientApp";

const ServiceList = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "services");
        
        const q = query(collectionRef, orderBy("number", "asc"));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setServices(QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.number })));
        });
        return unsubscribe;
    }, [])

    const modalRefOne = useRef();
    const modalRefTwo = useRef();
    const modalRefThree = useRef();
    const modalRefFour = useRef();

    return (
        <div>

            <div className="row p-4 gap-1">
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

            <div className="row pl-4 pr-4" id="one">

                <div className="col-12-xs">
                    <div className="card custom-hover-bg p-3">
                        
                        <div className="row">
                            <div className="col-1-xs custom-text"><h3>ID</h3></div>
                            <div className="col-5-xs custom-text"><h3>Title</h3></div>
                            <div className="col-1-xs custom-text"><h3>Price</h3></div>
                            <div className="col-1-xs custom-text"><h3>Min</h3></div>
                            <div className="col-2-xs custom-text"><h3>Max</h3></div>
                            <div className="col-2-xs custom-text"><h3>Desc.</h3></div>
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
                                        <div key={service.id} className="row align-i-center custom-color-bg-hover pt-2">
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.number}</p></div>
                                            <div className="col-5-xs"><p className="custom-sub-text">{service.title}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.price}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.min}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.max}</p></div>
                                            <div className="col-2-xs">
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

            <div className="row pl-4 pr-4 mt-2" id="two">

                <div className="col-12-xs">
                    <div className="card custom-hover-bg p-3">
                        
                        <div className="row">
                            <div className="col-1-xs custom-text"><h3>ID</h3></div>
                            <div className="col-5-xs custom-text"><h3>Title</h3></div>
                            <div className="col-1-xs custom-text"><h3>Price</h3></div>
                            <div className="col-1-xs custom-text"><h3>Min</h3></div>
                            <div className="col-2-xs custom-text"><h3>Max</h3></div>
                            <div className="col-2-xs custom-text"><h3>Desc.</h3></div>
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
                                        <div key={service.id} className="row align-i-center custom-color-bg-hover pt-2">
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.number}</p></div>
                                            <div className="col-5-xs"><p className="custom-sub-text">{service.title}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.price}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.min}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.max}</p></div>
                                            <div className="col-2-xs">
                                                <p className="custom-text pointer" onClick={descHandle}>
                                                    <Image src="/svg/services/description.svg" height={30} width={30} alt="icon" />
                                                </p>
                                                <div ref={modalRefTwo} className="modal-hidden">
                                                    <div className="modal-content card black-bg custom-card-bg-gradient base-shadow">
                                                        <span className="float-right font-xl pointer custom-text" onClick={closeRef}>&times;</span>
                                                        <p className="font-lg fw-lg custom-text">Description</p>
                                                        <p className="custom-text pt-2">{service.description}</p>
                                                    </div>
                                                </div>
                                            </div>
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

            <div className="row pl-4 pr-4 mt-2 mb-2" id="three">

                <div className="col-12-xs">
                    <div className="card custom-hover-bg p-3">
                        
                        <div className="row">
                            <div className="col-1-xs custom-text"><h3>ID</h3></div>
                            <div className="col-5-xs custom-text"><h3>Title</h3></div>
                            <div className="col-1-xs custom-text"><h3>Price</h3></div>
                            <div className="col-1-xs custom-text"><h3>Min</h3></div>
                            <div className="col-2-xs custom-text"><h3>Max</h3></div>
                            <div className="col-2-xs custom-text"><h3>Desc.</h3></div>
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
                                        <div key={service.id} className="row align-i-center custom-color-bg-hover pt-2">
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.number}</p></div>
                                            <div className="col-5-xs"><p className="custom-sub-text">{service.title}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.price}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.min}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.max}</p></div>
                                            <div className="col-2-xs">
                                                <p className="custom-text pointer" onClick={descHandle}>
                                                    <Image src="/svg/services/description.svg" height={30} width={30} alt="icon" />
                                                </p>
                                                <div ref={modalRefThree} className="modal-hidden">
                                                    <div className="modal-content card black-bg custom-card-bg-gradient base-shadow">
                                                        <span className="float-right font-xl pointer custom-text" onClick={closeRef}>&times;</span>
                                                        <p className="font-lg fw-lg custom-text">Description</p>
                                                        <p className="custom-text pt-2">{service.description}</p>
                                                    </div>
                                                </div>
                                            </div>
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

            <div className="row pl-4 pr-4 mt-2 mb-2" id="four">

                <div className="col-12-xs">
                    <div className="card custom-hover-bg p-3">
                        
                        <div className="row">
                            <div className="col-1-xs custom-text"><h3>ID</h3></div>
                            <div className="col-5-xs custom-text"><h3>Title</h3></div>
                            <div className="col-1-xs custom-text"><h3>Price</h3></div>
                            <div className="col-1-xs custom-text"><h3>Min</h3></div>
                            <div className="col-2-xs custom-text"><h3>Max</h3></div>
                            <div className="col-2-xs custom-text"><h3>Desc.</h3></div>
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
                                        <div key={service.id} className="row align-i-center custom-color-bg-hover pt-2">
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.number}</p></div>
                                            <div className="col-5-xs"><p className="custom-sub-text">{service.title}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.price}</p></div>
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.min}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.max}</p></div>
                                            <div className="col-2-xs">
                                                <p className="custom-text pointer" onClick={descHandle}>
                                                    <Image src="/svg/services/description.svg" height={30} width={30} alt="icon" />
                                                </p>
                                                <div ref={modalRefFour} className="modal-hidden">
                                                    <div className="modal-content card black-bg custom-card-bg-gradient base-shadow">
                                                        <span className="float-right font-xl pointer custom-text" onClick={closeRef}>&times;</span>
                                                        <p className="font-lg fw-lg custom-text">Description</p>
                                                        <p className="custom-text pt-2">{service.description}</p>
                                                    </div>
                                                </div>
                                            </div>
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
 
export default ServiceList;
