import Head from 'next/head'
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';
// components
import Main from '../components/Main'
// framer motion
import { motion } from 'framer-motion'

export default function Home() {

  const titleRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
      const onScroll = () => {
        setOffset(window.pageYOffset)
        titleRef.current.style.transform = `translateX(-${window.pageYOffset}px)`
      };
      window.removeEventListener('scroll', onScroll);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>

      <Head>
        <title>Starpanel - SMM Panel</title>
      </Head>

      {/* don't remove this empty div */}
      <div className='navbar-toggled navbar firebaseui-card-content hidden'></div>

      {/* content */}
      <div className="container">

        <div>
          <motion.p initial={{ x: -200 }} animate={{ x: 0 }} ref={titleRef} className='lg-display-f justify-between align-i-baseline mt-6 xs-display-n'>
            <span className='font-xl-8 fw-md custom-text'>..</span><span className='font-xl-8 fw-md custom-text'>starpanel.</span>
          </motion.p>
          <div className='md-display-f justify-end align-i-baseline mt-6 lg-display-n xs-display-n'>
            <span className='font-xl-8 fw-md custom-text'>starpanel.</span>
          </div>
          <div className='md-display-f justify-start mt-200-px xs-display-n'>
            <p className='max-w-560-px font-lg custom-sub-text'>One of the most affordable and high-quality SMM services on the market. We would be delighted to assist you in spreading the word about your company, increasing its visibility, and attracting new customers.</p>
          </div>
          <div className='display-f justify-start mt-8 md-display-n'>
            <p className='max-w-80p font-lg custom-sub-text'>One of the best value SMM services available. We would be happy to help you promote your business, increase its exposure, and attract new clients.</p>
          </div>
          <Link href="/signUp" passHref><button className='custom-btn-rounded custom-text mt-2 pl-5 pr-5 pt-2 pb-2'>Create an account</button></Link>
        </div>

        <Main />

      </div>

    </>
  )
}
