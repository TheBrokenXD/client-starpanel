import Head from 'next/head'
import Image from "next/image"
// components
import ServiceList from '../../components/services/ServiceList'

const Services = () => {
    return (
        <>

        <Head>
            <title>Affiliate - Starpanel</title>
        </Head>

        <div className="container">

            <div className="row align-i-center h-screen">
                <div className='col-1-xs column align-i-center'>
                    <div>
                        <Image src="/svg/services/home.svg" height={62} width={62} alt="icon" />
                    </div>
                    <div className="mt-2">
                        <Image src="/svg/services/categories.svg" height={50} width={50} alt="icon" />
                    </div>
                    <div className='mt-2'>
                        <Image src="/svg/services/sale.svg" height={50} width={50} alt="icon" />
                    </div>
                </div>
                <div className='col-11-xs card custom-card-bg row justify-center align-i-center max-h-third overflow-y-scroll p-0'>
                    <ServiceList />
                </div>
            </div>

        </div>

        </>
    );
}
 
export default Services;