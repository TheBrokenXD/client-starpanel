// firebase
import { useEffect, useState } from "react";
// store
import { collection, onSnapshot, orderBy, query, QuerySnapshot, where } from "firebase/firestore";
import { db } from "../../firebase/clientApp";
import { getAuth } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";

const Users = () => {

    // get users
    const auth = getAuth();
    const time = auth.currentUser.metadata.creationTime;
    const convert = new Date(time);
    const dateWithDay = convert.toDateString();
    // split date
    const dateSplit = dateWithDay.split(" ");
    const month = dateSplit[1];
    const dateNum = dateSplit[2];
    const year = dateSplit[3];
    const dateWithMonthAndYear = `${month} ${dateNum} ${year}`;

    // access firestore
    const [data, setData] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "users");

        const q = query(collectionRef, orderBy("created", "desc"));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setData(QuerySnapshot.docs.map(doc => ({ ...doc.data() })));
        });
        return unsubscribe;

    }, [])

    // display admins
    const displayAdmins = data.filter(user => user.role === "admin");
    const displayUsers = data.filter(user => user.role === "user");

    return (
        <>

            <div className="row">

                <div className="col-12-xs">

                    <p className="font-lg fw-bold custom-text mt-3">User List</p>

                    <div className="card custom-variant-1-bg p-4 mt-3">
                        
                        <div className="row">
                            <div className="col-2-xs custom-text"><h3>Name</h3></div>
                            <div className="col-3-xs custom-text"><h3>Email</h3></div>
                            <div className="col-2-xs custom-text"><h3>Balance</h3></div>
                            <div className="col-1-xs custom-text"><h3>Role</h3></div>
                            <div className="col-2-xs custom-text"><h3>Registered on</h3></div>
                            <div className="col-2-xs custom-text"><h3>Action</h3></div>
                        </div>
                        
                        {displayAdmins.map(data => {
                            return (
                                    <div className="row align-i-center pt-3" key={data.uid}>
                                        <div className="col-2-xs"><p className="custom-sub-text">{data.name}</p></div>
                                        <div className="col-3-xs"><p className="custom-sub-text">{data.email}</p></div>
                                        <div className="col-2-xs"><p className="custom-sub-text">{data.balance}</p></div>
                                        <div className="col-1-xs"><p className="custom-sub-text">{data.role}</p></div>
                                        <div className="col-2-xs overflow-hidden"><p className="custom-sub-text">{data.created}</p></div>
                                        <div className="col-2-xs"><button className='custom-btn-rounded custom-text'>Options</button></div>
                                    </div>
                            )
                        })}

                    </div>

                    <div className="card custom-variant-1-bg p-4 mt-3">
                        
                        <div className="row">
                            <div className="col-2-xs custom-text"><h3>Name</h3></div>
                            <div className="col-3-xs custom-text"><h3>Email</h3></div>
                            <div className="col-2-xs custom-text"><h3>Balance</h3></div>
                            <div className="col-1-xs custom-text"><h3>Role</h3></div>
                            <div className="col-2-xs custom-text"><h3>Registered on</h3></div>
                            <div className="col-2-xs custom-text"><h3>Action</h3></div>
                        </div>
                        
                        {displayUsers.map(data => {
                            return (
                                <div className="row align-i-center pt-3" key={data.uid}>
                                    <div className="col-2-xs"><p className="custom-sub-text">{data.name}</p></div>
                                    <div className="col-3-xs"><p className="custom-sub-text">{data.email}</p></div>
                                    <div className="col-2-xs"><p className="custom-sub-text">{data.balance}</p></div>
                                    <div className="col-1-xs"><p className="custom-sub-text">{data.role}</p></div>
                                    <div className="col-2-xs overflow-hidden"><p className="custom-sub-text">{data.created}</p></div>
                                    <div className="col-2-xs"><button className='custom-btn-rounded custom-text'>Options</button></div>
                                </div>
                            )
                        })}

                    </div>
                
                </div>

            </div>
        </>
    );
}
 
export default Users;