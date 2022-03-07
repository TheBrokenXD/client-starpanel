import Link from "next/link"
// firebase
import { collection, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/clientApp";

const ServiceList = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "services");

        const q = query(collectionRef, orderBy("number"));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setServices(QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.number })));
        });
        return unsubscribe;
    }, [])

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
                            <div className="col-3-xs custom-text"><h3>Title</h3></div>
                            <div className="col-2-xs custom-text"><h3>Price</h3></div>
                            <div className="col-2-xs custom-text"><h3>Min</h3></div>
                            <div className="col-2-xs custom-text"><h3>Max</h3></div>
                            <div className="col-2-xs custom-text"><h3>Desc.</h3></div>
                        </div>

                        {services.map(service => {
                            return(
                                service.category === "social" ? (
                                    <>
                                        <div key={service.id} className="row custom-color-bg-hover pt-2">
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.number}</p></div>
                                            <div className="col-3-xs"><p className="custom-sub-text">{service.title}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.price}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.min}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.max}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.description}</p></div>
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
                            <div className="col-3-xs custom-text"><h3>Title</h3></div>
                            <div className="col-2-xs custom-text"><h3>Price</h3></div>
                            <div className="col-2-xs custom-text"><h3>Min</h3></div>
                            <div className="col-2-xs custom-text"><h3>Max</h3></div>
                            <div className="col-2-xs custom-text"><h3>Desc.</h3></div>
                        </div>

                        {services.map(service => {
                            return(
                                service.category === "web" ? (
                                    <>
                                        <div key={service.id} className="row custom-color-bg-hover pt-2">
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.number}</p></div>
                                            <div className="col-3-xs"><p className="custom-sub-text">{service.title}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.price}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.min}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.max}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.description}</p></div>
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
                            <div className="col-3-xs custom-text"><h3>Title</h3></div>
                            <div className="col-2-xs custom-text"><h3>Price</h3></div>
                            <div className="col-2-xs custom-text"><h3>Min</h3></div>
                            <div className="col-2-xs custom-text"><h3>Max</h3></div>
                            <div className="col-2-xs custom-text"><h3>Desc.</h3></div>
                        </div>

                        {services.map(service => {
                            return(
                                service.category === "telegram" ? (
                                    <>
                                        <div key={service.id} className="row custom-color-bg-hover pt-2">
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.number}</p></div>
                                            <div className="col-3-xs"><p className="custom-sub-text">{service.title}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.price}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.min}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.max}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.description}</p></div>
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
                            <div className="col-3-xs custom-text"><h3>Title</h3></div>
                            <div className="col-2-xs custom-text"><h3>Price</h3></div>
                            <div className="col-2-xs custom-text"><h3>Min</h3></div>
                            <div className="col-2-xs custom-text"><h3>Max</h3></div>
                            <div className="col-2-xs custom-text"><h3>Desc.</h3></div>
                        </div>

                        {services.map(service => {
                            return(
                                service.category === "premium" ? (
                                    <>
                                        <div key={service.id} className="row custom-color-bg-hover pt-2">
                                            <div className="col-1-xs"><p className="custom-sub-text">{service.number}</p></div>
                                            <div className="col-3-xs"><p className="custom-sub-text">{service.title}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.price}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.min}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.max}</p></div>
                                            <div className="col-2-xs"><p className="custom-sub-text">{service.description}</p></div>
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
