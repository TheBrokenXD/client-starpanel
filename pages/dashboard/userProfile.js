import Profile from "../../components/dashboard/Profile";

const UserProfile = () => {
    return (
        <>

            <div className="container">
                <div className="row align-i-center h-screen ml-3 mr-3">
                    <div className="col-12-xs card custom-card-bg min-h-80p max-h-80p overflow-y-scroll pl-7 pr-7">
                        <Profile />
                    </div>
                </div>
            </div>

        </>
    );
}
 
export default UserProfile;