import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/dist/client/router";

const Layout = ({ children }) => {

    const router = useRouter();
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