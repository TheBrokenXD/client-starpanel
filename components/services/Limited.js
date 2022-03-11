import { useEffect, useState } from "react";
// firebase
import { collection, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import { db } from "../../firebase/clientApp";

const Limited = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "services");
        
        const q = query(collectionRef, orderBy("number", "asc"));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setServices(QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.number })));
        });
        return unsubscribe;
    }, [])

    return (
        <div className="p-3">
            <h1 className="fw-lg custom-text">Limited Offers</h1>
            <div>
                {services.map(service => (
                    service.limited == "yup" ? (
                        <div key={service.id} className="display-f justify-between card custom-card-bg-gradient mt-3 p-2">
                            <div>
                                <h2 className="fw-md custom-text">{service.title}</h2>
                                <h3 className="custom-text pt-2">Description:</h3>
                                <p className="custom-sub-text">{service.description}</p>
                            </div>
                            <div>
                                <p className="custom-sub-text">Price: {service.price}</p>
                                <p className="custom-sub-text">ID: {service.number}</p>
                                <button className="custom-btn custom-text pl-4 pr-4 mt-2">Buy</button>
                            </div>
                        </div>
                    ) : null
                ))}
            </div>
        </div>
    );
}
 
export default Limited