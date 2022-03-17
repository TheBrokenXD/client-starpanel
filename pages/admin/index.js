import Link from "next/link";
import Image from "next/image"
import { useState, useEffect, useRef } from "react";
// components
import Home from "../../components/admin/Home";
import Users from "../../components/admin/Users";
import Orders from "../../components/admin/Orders";
import Services from "../../components/admin/Services";
// firebase
import { collection, onSnapshot, query, QuerySnapshot, where } from 'firebase/firestore';
import { db } from '../../firebase/clientApp';
import { useAuth } from '../../context/AuthContext';

const Index = () => {

    const compRef = useRef();

    // access firestore
    const [data, setData] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "users");

        const q = query(collectionRef, where("role", "==", "admin"));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setData(QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });
        return unsubscribe;

    }, [])


    const { user } = useAuth()

    if(data.filter(item => item.uid === user.uid).length > 0) {

        const homeClick = () => {
            compRef.current.children[0].classList.remove("hidden");
            compRef.current.children[1].classList.add("hidden");
            compRef.current.children[2].classList.add("hidden");
            compRef.current.children[3].classList.add("hidden");
        }
        const usersClick = () => {
            compRef.current.children[0].classList.add("hidden");
            compRef.current.children[1].classList.remove("hidden");
            compRef.current.children[2].classList.add("hidden");
            compRef.current.children[3].classList.add("hidden");
        }
        const ordersClick = () => {
            compRef.current.children[0].classList.add("hidden");
            compRef.current.children[1].classList.add("hidden");
            compRef.current.children[2].classList.remove("hidden");
            compRef.current.children[3].classList.add("hidden");
        }
        const servicesClick = () => {
            compRef.current.children[0].classList.add("hidden");
            compRef.current.children[1].classList.add("hidden");
            compRef.current.children[2].classList.add("hidden");
            compRef.current.children[3].classList.remove("hidden");
        }

        const name = data.filter(item => item.uid === user.uid)[0].name;

        return (
            <>
                <div className="container">

                    <div className="row align-i-center h-screen">
                        <div className='col-1-xs column align-i-center'>
                            <ul className="column align-i-center admin-li pt-6 pb-6">
                                <li onClick={homeClick} className="pointer"><Image src="/svg/admin/Home.svg" height={50} width={50} alt="icon" /></li>
                                <li onClick={usersClick} className="pointer"><Image src="/svg/admin/Users.svg" height={50} width={50} alt="icon" /></li>
                                <li onClick={ordersClick} className="pointer"><Image src="/svg/admin/Orders.svg" height={50} width={50} alt="icon" /></li>
                                <li onClick={servicesClick} className="pointer"><Image src="/svg/admin/Services.svg" height={50} width={50} alt="icon" /></li>
                            </ul>
                        </div>
                        <div className='col-11-xs card custom-card-bg row justify-center align-i-center min-h-80p max-h-80p overflow-y-scroll p-3'>
                            <p className="font-lg fw-md custom-text">Welcome Back {name}!</p>
                            <div ref={compRef}>
                                <div>

                                    <div>
                                        <div className="row gap-1">

                                            <div className="col-4-xs">
                                                <div className="card custom-card-bg-gradient p-2 mt-3">
                                                    <p className="font-lg fw-md custom-text">Users</p>
                                                    <div onClick={usersClick}><button className='custom-btn-rounded custom-text mt-2 pl-5 pr-5 pt-2 pb-2'>View Users</button></div>
                                                </div>
                                            </div>

                                            <div className="col-4-xs">
                                                <div className="card custom-card-bg-gradient p-2 mt-3">
                                                    <p className="font-lg fw-md custom-text">Orders</p>
                                                    <div onClick={ordersClick}><button className='custom-btn-rounded custom-text mt-2 pl-5 pr-5 pt-2 pb-2'>View Orders</button></div>
                                                </div>
                                            </div>

                                            <div className="col-4-xs">
                                                <div className="card custom-card-bg-gradient p-2 mt-3">
                                                    <p className="font-lg fw-md custom-text">Services</p>
                                                    <div onClick={servicesClick}><button className='custom-btn-rounded custom-text mt-2 pl-5 pr-5 pt-2 pb-2'>Edit Service</button></div>
                                                </div>
                                            </div>
                                        </div>
                                        <Home />
                                    </div>
                                </div>

                                <div className="hidden"><Users /></div>
                                <div className="hidden"><Orders /></div>
                                <div className="hidden"><Services /></div>

                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    } else {
        return (
            <>
                <h1 className="page-center custom-text">You are not an admin!</h1>
            </>
        )
    }

}
 
export default Index;