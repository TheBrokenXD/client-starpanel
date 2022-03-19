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
          <motion.p initial={{ x: -200 }} animate={{ x: 0 }} ref={titleRef} className='font-xl-8 fw-md custom-text mt-6 display-f justify-between align-i-baseline'><span>..</span><span>starpanel.</span></motion.p>
          <p className='font-lg max-w-560-px custom-sub-text mt-200-px'>One of the most affordable and high-quality SMM services on the market. We would be delighted to assist you in spreading the word about your company, increasing its visibility, and attracting new customers.</p>
          <Link href="/signUp" passHref><button className='custom-btn-rounded custom-text mt-2 pl-5 pr-5 pt-2 pb-2'>Create an account</button></Link>
        </div>

        <Main />

      </div>

    </>
  )
}
