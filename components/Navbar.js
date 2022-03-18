import React, { useRef } from "react";
import Link from "next/link";
// assets
import Lottie from "lottie-react";
import Data from "../public/data.json";
import { useAuth } from "../context/AuthContext";
import { Router, useRouter } from "next/router";
// framer motion
import { motion } from "framer-motion";

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

  const closeFunc = () => {
    animationData.current.className = "sidebar";
    lottieRef.current.setDirection(-1);
    lottieRef.current.play();
  }

  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <div className="nav">

      <div className="nav-content">
        <Link href="/" passHref><p className="nav-brand custom-text unselectable">Starpanel.</p></Link>
        <div className="nav-burger">
          <div className="lottie" onClick={handleClick} >
            <Lottie lottieRef={lottieRef} animationData={Data} loop={false} autoplay={false} />
          </div>
        </div>
      </div>

      <div ref={animationData} className="sidebar">
        <ul>
          <motion.li whileHover={{ scale: 1.1, originX: 0, }} ><Link href="/" passHref><a className="font-xl custom-text custom-color-hover" onClick={closeFunc}>Home</a></Link></motion.li>
          <li>
            {user ? (
              <div className="custom-li">
                <motion.div whileHover={{ scale: 1.1, originX: 0 }} ><Link href="/dashboard" passHref><a className="font-xl custom-text custom-color-hover" onClick={closeFunc}>Dashboard</a></Link></motion.div>
                <motion.div whileHover={{ scale: 1.1, originX: 0 }} ><Link href="/signIn" passHref><a className="font-xl custom-text custom-color-hover mt-5" onClick={() => {
                  logout()
                  router.push('/signIn')
                  closeFunc()
                }} >Sign out</a></Link></motion.div>
              </div>
            ) : (
              <div className="custom-li">
                <motion.div whileHover={{ scale: 1.1, originX: 0 }} ><Link href="/signIn" passHref><a className="font-xl custom-text custom-color-hover" onClick={closeFunc}>Sign In</a></Link></motion.div>
                <motion.div whileHover={{ scale: 1.1, originX: 0 }} ><Link href="/signUp" passHref><a className="font-xl custom-text custom-color-hover" onClick={closeFunc}>Sign Up</a></Link></motion.div>
              </div>
            )}
          </li>
          <motion.li whileHover={{ scale: 1.1, originX: 0 }} ><Link href="/services" passHref><a className="font-xl custom-text custom-color-hover" onClick={closeFunc}>Services</a></Link></motion.li>
        </ul>
      </div>

    </div>
  );

}
 
export default Navbar;