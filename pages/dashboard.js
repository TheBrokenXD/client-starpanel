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

            <div className="row">
                <div className="col-2-xs">
                    <Sidebar />
                </div>
                <div className="col-10-xs">
                    <Center />
                </div>
            </div>

        </>
    );
}
 
export default Dashboard;