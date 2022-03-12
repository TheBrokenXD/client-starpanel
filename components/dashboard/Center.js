import { useRef, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
// store
import { collection, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import { db } from '../../firebase/clientApp';
// recoil
import { useRecoilValue } from "recoil";
// atoms
import { activeState } from "../../atoms/dashboardAtom";
// components
import NewOrder from "./content/NewOrder";
import Orders from "./content/Orders";
import AddFunds from "./content/AddFunds";
import Contact from "./content/Contact";
import Terms from "./content/Terms";

const Center = () => {

    // access firestore
    const [data, setData] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "users");

        const q = query(collectionRef, orderBy("uid"));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setData(QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.number })));
        });
        return unsubscribe;

    }, [])

    // access auth
    const { user } = useAuth()

    // recoil changes 
    const compRef = useRef();
    const active = useRecoilValue(activeState);
    
    useEffect (() => {
        if (active === 0) {
            compRef.current.children[0].className = "";
            compRef.current.children[1].className = "hidden";
            compRef.current.children[2].className = "hidden";
            compRef.current.children[3].className = "hidden";
            compRef.current.children[4].className = "hidden";
        } else if (active === 1) {
            compRef.current.children[0].className = "hidden";
            compRef.current.children[1].className = "";
            compRef.current.children[2].className = "hidden";
            compRef.current.children[3].className = "hidden";
            compRef.current.children[4].className = "hidden";
        } else if (active === 2) {
            compRef.current.children[0].className = "hidden";
            compRef.current.children[1].className = "hidden";
            compRef.current.children[2].className = "";
            compRef.current.children[3].className = "hidden";
            compRef.current.children[4].className = "hidden";
        } else if (active === 3) {
            compRef.current.children[0].className = "hidden";
            compRef.current.children[1].className = "hidden";
            compRef.current.children[2].className = "hidden";
            compRef.current.children[3].className = "";
            compRef.current.children[4].className = "hidden";
        } else if (active === 4) {
            compRef.current.children[0].className = "hidden";
            compRef.current.children[1].className = "hidden";
            compRef.current.children[2].className = "hidden";
            compRef.current.children[3].className = "hidden";
            compRef.current.children[4].className = "";
        } else {
            console.log("error");
        }
    }, [active]);

    return (
        <>
            <div className="p-2">
                <div>
                    {data.map(data => {
                        return(
                            data.uid == user.uid ? (
                                <>
                                    <div className="display-f justify-between align-i-center mt-2">
                                        <p className="font-lg fw-md custom-text">Welcome Back {data.name}!</p>
                                        <div className="display-f align-i-center">
                                            <p className="font-lg fw-md custom-text pr-2">${data.balance}</p>
                                            <button className="custom-btn custom-text">Your Profile</button>
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
                <div ref={compRef} className="mt-3">
                    <div className="">
                        <NewOrder />
                    </div>
                    <div className="hidden">
                        <Orders />
                    </div>
                    <div className="hidden">
                        <AddFunds />
                    </div>
                    <div className="hidden">
                        <Contact />
                    </div>
                    <div className="hidden">
                        <Terms />
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Center;