import Head from 'next/head'
import Image from "next/image"
// react
import { useRef } from 'react'
// components
import ServiceList from '../../components/services/ServiceList'
import Limited from '../../components/services/Limited';

const Services = () => {

    const compRef = useRef();

    const homeClick = () => {
        compRef.current.children[0].classList.remove("hidden");
        compRef.current.children[1].classList.add("hidden");
    }
    const saleClick = () => {
        compRef.current.children[0].classList.add("hidden");
        compRef.current.children[1].classList.remove("hidden");
    }

    return (
        <>

        <Head>
            <title>Affiliate - Starpanel</title>
        </Head>

        <div className="container">

            <div className="row align-i-center h-screen">
                <div className='col-1-xs column align-i-center'>
                    <div className='pointer' onClick={homeClick}>
                        <Image src="/svg/services/home.svg" height={62} width={62} alt="icon" />
                    </div>
                    <div className='mt-2 pointer' onClick={saleClick}>
                        <Image src="/svg/services/sale.svg" height={50} width={50} alt="icon" />
                    </div>
                </div>
                <div ref={compRef} className='col-11-xs card custom-card-bg row justify-center align-i-center min-h-third max-h-third overflow-y-scroll p-0'>
                    <div className=''><ServiceList /></div>
                    <div className='hidden'><Limited /></div>
                </div>
            </div>

        </div>

        </>
    );
}
 
export default Services;