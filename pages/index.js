import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
// components
import Main from '../components/Main'
// firebase auth
import firebase from '../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {

  // const [user, loading, error] = useAuthState(firebase.auth());
  // console.log(user, loading, error);

  return (
    <>

      <Head>
        <title>Affiliate - Starpanel</title>
      </Head>

      {/* don't remove this empty div */}
      <div className='navbar-toggled navbar firebaseui-card-content hidden'></div>

      {/* content */}
      <div className="container">

        <div>
          <p className='font-xl-8 fw-md text-right custom-text mt-6'>starpanel.</p>
          <p className='font-lg max-w-560-px custom-sub-text mt-200-px'>One of the most affordable and high-quality SMM services on the market. We would be delighted to assist you in spreading the word about your company, increasing its visibility, and attracting new customers.</p>
          <Link href="/signUp" passHref><button className='custom-btn-rounded custom-text mt-2 pl-5 pr-5 pt-2 pb-2'>Create an account</button></Link>
        </div>

        <Main />

      </div>

    </>
  )
}
