import Navbar from "./Navbar";
import Footer from "./Footer";
import { Router, router, useRouter } from "next/dist/client/router";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => { NProgress.start(); });
Router.events.on("routeChangeComplete", () => { NProgress.done(); });
Router.events.on("routeChangeError", () => { NProgress.done(); });

const Layout = ({ children }) => {

    const router = useRouter();
    // const showNav = router.pathname === '/admin' ? false '/dashoboard' ? false : true;
    const showNav = router.pathname === '/admin' ? false : true;
    
    return (
      <>

        {showNav && <Navbar />}
        { children }
        {/* <Footer /> */}

      </>
    );
}
 
export default Layout;