import React, { useRef } from "react";
import Link from "next/link";
// assets
import Lottie from "lottie-react";
import Data from "../public/data.json";
import { useAuth } from "../context/AuthContext";
import { Router, useRouter } from "next/router";

const Navbar = () => {

  const lottieRef = useRef();
  const animationData = useRef();

  const handleClick = () => {

    if(animationData.current.className == "sidebar") {
      animationData.current.className = 'sidebar-toggled';
      lottieRef.current.setDirection(1);
      lottieRef.current.playSegments(1, 21, true);
    } else {
      animationData.current.className = "sidebar";
      lottieRef.current.setDirection(-1);
      lottieRef.current.play();
    }
    
  }

  const { user, signOut } = useAuth()
  const router = useRouter()

  return (
    <div className="nav">

      <div className="nav-content">
        <Link href="/" passHref><p className="nav-brand custom-text">Starpanel.</p></Link>
        <div className="nav-burger">
          <div className="lottie" onClick={handleClick} >
            <Lottie lottieRef={lottieRef} animationData={Data} loop={false} autoplay={false} />
          </div>
        </div>
      </div>

      <div ref={animationData} className="sidebar">
        <ul>
          <li><Link href="/" passHref><a className="font-xl custom-text custom-color-hover">Home</a></Link></li>
          <li>
            {user ? (
              <Link href="/signIn" passHref><a className="font-xl custom-text custom-color-hover" onClick={() => {
                signOut()
                router.push('/signIn')
              }} >Sign out</a></Link>
            ) : (
              <Link href="/signIn" passHref><a className="font-xl custom-text custom-color-hover">Sign In</a></Link>
            )}
          </li>
          <li><Link href="/services" passHref><a className="font-xl custom-text custom-color-hover">Services</a></Link></li>
          <li><Link href="#" passHref><a className="font-xl custom-text custom-color-hover">API</a></Link></li>
        </ul>
      </div>

    </div>
  );

}
 
export default Navbar;