import Image from "next/image";
import Link from "next/link";

const Main = () => {
    return (
        <main>

            {/* card-1 */}

            <div className='card black-bg custom-card-bg-gradient p-3 mt-5 ml-3 mr-3'>
                <div className="display-f align-i-center bp-index-service">
                    <div className="xl-display-b xs-display-n">
                        <div className="pl-2 pr-2">
                            <Image src="/svg/services.svg" height={300} width={300} alt="img" />
                        </div>
                    </div>
                    <div className="pl-3 xxxl-pl-4 bp-index-service-content">
                        <h1 className='font-xl-2 custom-text xl-font-xl'>Services</h1>
                        <p className='xl-font-md custom-sub-text mt-2 xxxl-font-lg xl-display-b xs-display-n'>Our first objective is to increase the visibility of your brand and cultivate a customer base for you. It is important to us that the services offered by our panel are reasonably priced. Adding money to your account is simple and convenient. Delivery of your purchase will be swift, as you will discover.</p>
                        <Link href="/services" passHref><button className='custom-btn-rounded custom-text shadow-base mt-2 xxxl-mt-3 xxxl-pl-4 xxxl-pr-4 xxxl-font-md'>View Services</button></Link>
                    </div>
                </div>
            </div>

            {/* card-2 */}

            <div className="mt-5">
                <h1 className='font-xl custom-text text-center'>How to use?</h1>
                <p className='font-lg custom-sub-text text-center m-auto mt-1'>You can simply create your order by following the steps below.</p>
                
                <div className="row justify-center mt-4 gap-2 ml-5 mr-5">

                    <div className="col-3-xl col-6-md col-12-xs">
                        <div className="column align-i-center">
                            <div className="card custom-card-bg p-5 xxxl-p-7 xxl-p-6">
                                <Image src="/svg/register.svg" height={120} width={120} alt="icon" />
                                <p className="font-lg text-center custom-text pt-2">Sign Up</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3-xl col-6-md col-12-xs mt-4 xl-mt-4 xs-mt-0">
                        <div className="column align-i-center">
                            <div className="card custom-card-bg p-5 xxxl-p-7 xxl-p-6">
                                <Image src="/svg/wallet.svg" height={120} width={120} alt="icon" />
                                <p className="font-lg text-center custom-text pt-2">Add Funds</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3-xl col-6-md col-12-xs">
                        <div className="column align-i-center">
                            <div className="card custom-card-bg p-5 xxxl-p-7 xxl-p-6">
                                <Image src="/svg/bag.svg" height={120} width={120} alt="icon" />
                                <p className="font-lg text-center custom-text pt-2">Order</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3-xl col-6-md col-12-xs mt-4 xl-mt-4 xs-mt-0">
                        <div className="column align-i-center">
                            <div className="card custom-card-bg p-5 xxxl-p-7 xxl-p-6">
                                <Image src="/svg/heart.svg" height={120} width={120} alt="icon" />
                                <p className="font-lg text-center custom-text pt-2">Results</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* card-3 */}

            <div className='card black-bg custom-card-bg-gradient display-f md-flex-dir-row md-align-i-center md-justify-between mt-4 ml-3 mr-3 mb-3 p-3 xs-flex-dir-column xs-justify-center xs-align-i-center'>
                <div>
                    <h1 className='font-xl-2 custom-text md-text-left xs-text-center bp-index-card3-h'>Ready to dive in?</h1>
                    <p className='font-lg custom-sub-text pt-1 md-text-left xs-text-center bp-index-card3-p'>Register for free now!</p>
                </div>
                <div>
                    <Link href="/signUp" passHref><button className="custom-btn-rounded custom-text shadow-base pl-5 pr-5 pt-2 pb-2 md-mt-0 xs-mt-2">Sign up</button></Link>
                </div>
            </div>

        </main>
    );
}
 
export default Main;