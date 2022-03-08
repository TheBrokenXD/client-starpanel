import Image from "next/image";
import Link from "next/link";

const Main = () => {
    return (
        <main>

            {/* card-1 */}

            <div className='card black-bg custom-card-bg-gradient display-f align-i-center mt-4 ml-3 mr-3 p-3'>
                <Image src="/svg/services.svg" height={300} width={300} alt="img" />
                <div className="pl-5">
                    <h1 className='font-xl-2 custom-text'>Services</h1>
                    <p className='font-lg custom-sub-text pt-1'>A better way to spend money</p>
                    <p className='font-md custom-sub-text pt-3'>Our first objective is to increase the visibility of your brand and cultivate a customer base for you. It is important to us that the services offered by our panel are reasonably priced. Adding money to your account is simple and convenient. Delivery of your purchase will be swift, as you will discover.</p>
                    <Link href="/services" passHref><button className='custom-btn-rounded custom-text mt-2 shadow-base'>View Services</button></Link>
                </div>
            </div>

            {/* card-2 */}

            <div className="mt-5">
                <h1 className='font-xl custom-text text-center'>How to use?</h1>
                <p className='font-lg custom-sub-text text-center max-w-912-px m-auto mt-1'>You can simply create your order by following the steps below.</p>
                <div className="row justify-center mt-4">

                    <div className="col-2-xs column align-i-center">
                        <div className="card custom-card-bg p-4">
                            <Image src="/svg/register.svg" height={120} width={120} alt="icon" />
                            <p className="font-lg text-center custom-text pt-2">Sign Up</p>
                        </div>
                    </div>
                    <div className="col-2-xs column align-i-center ml-5 mt-4">
                        <div className="card custom-card-bg p-4">
                            <Image src="/svg/wallet.svg" height={120} width={120} alt="icon" />
                            <p className="font-lg text-center custom-text pt-2">Add Funds</p>
                        </div>
                    </div>
                    <div className="col-2-xs column align-i-center ml-5">
                        <div className="card custom-card-bg p-4">
                            <Image src="/svg/bag.svg" height={120} width={120} alt="icon" />
                            <p className="font-lg text-center custom-text pt-2">Order</p>
                        </div>
                    </div>
                    <div className="col-2-xs column align-i-center ml-5 mt-4">
                        <div className="card custom-card-bg p-4">
                            <Image src="/svg/heart.svg" height={120} width={120} alt="icon" />
                            <p className="font-lg text-center custom-text pt-2">Results</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* card-3 */}

            <div className='card black-bg custom-card-bg-gradient display-f align-i-center justify-between mt-4 ml-3 mr-3 mb-3 p-3'>
                <div>
                    <h1 className='font-xl-2 custom-text'>Ready to dive in?</h1>
                    <p className='font-lg custom-sub-text pt-1'>Register for free now!</p>
                </div>
                <div>
                    <Link href="/signUp" passHref><button className="custom-btn-rounded custom-text shadow-base pl-5 pr-5 pt-2 pb-2">Sign up</button></Link>
                </div>
            </div>

        </main>
    );
}
 
export default Main;