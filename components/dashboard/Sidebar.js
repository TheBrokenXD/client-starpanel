import { useRef } from "react";
// recoil
import { useRecoilState } from "recoil";
// atoms
import { activeState } from "../../atoms/dashboardAtom";

const Sidebar = () => {

    const clickRef = useRef();
    const [active, setActive] = useRecoilState(activeState);

    const activeOne = () => {
        setActive(0);
        clickRef.current.children[0].className = "font-lg fw-md custom-text list-item pointer custom-card-bg-gradient";
        clickRef.current.children[1].className = "font-lg fw-md custom-text list-item pointer";
        clickRef.current.children[2].className = "font-lg fw-md custom-text list-item pointer";
        clickRef.current.children[3].className = "font-lg fw-md custom-text list-item pointer";
        clickRef.current.children[4].className = "font-lg fw-md custom-text list-item pointer";
    }

    const activeTwo = () => {
        setActive(1);
        clickRef.current.children[0].className = "font-lg fw-md custom-text list-item pointer";
        clickRef.current.children[1].className = "font-lg fw-md custom-text list-item pointer custom-card-bg-gradient";
        clickRef.current.children[2].className = "font-lg fw-md custom-text list-item pointer";
        clickRef.current.children[3].className = "font-lg fw-md custom-text list-item pointer";
        clickRef.current.children[4].className = "font-lg fw-md custom-text list-item pointer";
    }

    const activeThree = () => {
        setActive(2);
        clickRef.current.children[0].className = "font-lg fw-md custom-text list-item pointer";
        clickRef.current.children[1].className = "font-lg fw-md custom-text list-item pointer";
        clickRef.current.children[2].className = "font-lg fw-md custom-text list-item pointer custom-card-bg-gradient";
        clickRef.current.children[3].className = "font-lg fw-md custom-text list-item pointer";
        clickRef.current.children[4].className = "font-lg fw-md custom-text list-item pointer";
    }
    
    const activeFour = () => {
        setActive(3);
        clickRef.current.children[0].className = "font-lg fw-md custom-text list-item pointer";
        clickRef.current.children[1].className = "font-lg fw-md custom-text list-item pointer";
        clickRef.current.children[2].className = "font-lg fw-md custom-text list-item pointer";
        clickRef.current.children[3].className = "font-lg fw-md custom-text list-item pointer custom-card-bg-gradient";
        clickRef.current.children[4].className = "font-lg fw-md custom-text list-item pointer";
    }

    const activeFive = () => {
        setActive(4);
        clickRef.current.children[0].className = "font-lg fw-md custom-text list-item pointer";
        clickRef.current.children[1].className = "font-lg fw-md custom-text list-item pointer";
        clickRef.current.children[2].className = "font-lg fw-md custom-text list-item pointer";
        clickRef.current.children[3].className = "font-lg fw-md custom-text list-item pointer";
        clickRef.current.children[4].className = "font-lg fw-md custom-text list-item pointer custom-card-bg-gradient";
    }

    return (
        <>
        
        <div>

            {/* <div className="display-f justify-around">
                <p className="custom-text">picture</p>
                <div>
                    <p className="custom-text">Your name</p>
                    <p className="custom-sub-text">your email here</p>
                </div>
            </div> */}

            <ul ref={clickRef} className="list pr-2">
                <li className="font-lg fw-md custom-text list-item pointer custom-card-bg-gradient" onClick={activeOne}>New Order</li>
                <li className="font-lg fw-md custom-text list-item pointer" onClick={activeTwo}>Orders</li>
                <li className="font-lg fw-md custom-text list-item pointer" onClick={activeThree}>Add Funds</li>
                <li className="font-lg fw-md custom-text list-item pointer" onClick={activeFour}>Contact</li>
                <li className="font-lg fw-md custom-text list-item pointer" onClick={activeFive}>Terms</li>
            </ul>

            {/* <p className="fw-md custom-text">2022 Starpanel - Affiliates</p> */}

        </div>

        </>
    );
}
 
export default Sidebar;