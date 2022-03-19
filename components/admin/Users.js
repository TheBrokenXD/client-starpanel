// firebase
import { useEffect, useState, useRef } from "react";
// store
import { collection, onSnapshot, orderBy, query, QuerySnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/clientApp";
import { getAuth } from "firebase/auth";

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

    // modal
    const modalRef = useRef();
    const openRef = () => {
        modalRef.current.className = "modal-profile";
    }
    const closeRef = () => {
        modalRef.current.className = "modal-hidden-profile";
    }

    // clicked user
    const [clickedUser, setClickedUser] = useState({
        id: "",
        role: "",
        balance: "",
    });

    // update user

    const invertRole = (e) => {
        e.preventDefault();
        const collectionRef = doc(db, "users", clickedUser.id);
        if (clickedUser.role === "admin") {
            updateDoc(collectionRef, {
                role: "user",
            });
            closeRef();
        }
        else {
            updateDoc(collectionRef, {
                role: "admin",
            });
            closeRef();
        }
    }

    const [updateData, setUpdateData] = useState({
        balance: Number("")
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        const collectionRef = doc(db, "users", clickedUser.id);
        updateDoc(collectionRef, { balance: updateData.balance });
        closeRef();
    }

    return (
        <>

            <div ref={modalRef} className="modal-hidden-profile">
                <div className="modal-content-profile card black-bg custom-card-bg-gradient base-shadow">
                    <div>
                        <div className="display-f align-i-center justify-between">
                            <p className="font-lg fw-lg custom-text">Edit Profile</p>
                            <span className="font-xl pointer custom-text" onClick={closeRef}>&times;</span>
                        </div>
                        <form>
                            <div className="mt-2">
                                <div className="display-f justify-between align-i-center">
                                    <p className="custom-text">ID : {clickedUser.id}</p>
                                    <div className="display-f align-i-center">
                                        <p className="custom-text">Role : {clickedUser.role}</p>
                                        <button className="custom-btn custom-text ml-2" onClick={invertRole}>Invert</button>
                                    </div>
                                    <p className="custom-text">Balance : {clickedUser.balance}</p>
                                </div>
                                <div className="mt-2">
                                    <label className='custom-text fw-md'>Update Balance</label>
                                    <input type="text" required className="input-t custom-card-bg custom-sub-text shadow-base mt-1" placeholder="Update" onChange={e => setUpdateData({ ...updateData, balance: e.target.value })} />
                                </div>
                            </div>
                            <button className="custom-btn custom-text mt-3 shadow-base" onClick={handleUpdate}>Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        
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
                                <>
                                    <div className="row align-i-center pt-3" key={data.uid}>
                                        <div className="col-2-xs"><p className="custom-sub-text">{data.name}</p></div>
                                        <div className="col-3-xs"><p className="custom-sub-text">{data.email}</p></div>
                                        <div className="col-2-xs"><p className="custom-sub-text">{data.balance}</p></div>
                                        <div className="col-1-xs"><p className="custom-sub-text">{data.role}</p></div>
                                        <div className="col-2-xs overflow-hidden"><p className="custom-sub-text">{data.created}</p></div>
                                        <div className="col-2-xs"><button className='custom-btn-rounded custom-text' onClick={
                                            () => {
                                                setClickedUser({
                                                    id: data.uid,
                                                    role: data.role,
                                                    balance: data.balance
                                                });
                                                openRef()
                                            }
                                        }>Options</button></div>
                                    </div>
                                </>
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
                                    <div className="col-2-xs"><button className='custom-btn-rounded custom-text' onClick={
                                            () => {
                                                setClickedUser({
                                                    id: data.uid,
                                                    role: data.role,
                                                    balance: data.balance
                                                });
                                                openRef()
                                            }
                                    }>Options</button></div>
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