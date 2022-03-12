import Head from 'next/head'
// components
import Sidebar from '../components/dashboard/Sidebar';
import Center from '../components/dashboard/Center';

const Dashboard = () => {

    return (
        <>

            <Head>
                <title>Affiliate - Starpanel</title>
            </Head>

            <div className="container">
                <div className="row align-i-center h-screen">
                    <div className="col-2-xs">
                        <Sidebar />
                    </div>
                    <div className="col-10-xs card custom-card-bg min-h-80p max-h-80p overflow-y-scroll p-0">
                        <Center />
                    </div>
                </div>
            </div>

        </>
    );
}
 
export default Dashboard;