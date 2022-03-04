// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicket } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp, faTelegram } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return ( 
        <>
            <footer className="footer">
                <div className="footer-content">

                    <div className='card display-f justify-between align-i-center p-3'>
                        <div>
                            <p className='custom-text'>© 2022 Starpanel</p>
                        </div>
                        <div className='display-f'>
                            <span className="font-lg custom-text"><FontAwesomeIcon icon={faWhatsapp} /></span>
                            <span className="font-lg custom-text pl-3"><FontAwesomeIcon icon={faTelegram} /></span>
                            <span className="font-lg custom-text pl-3"><FontAwesomeIcon icon={faTicket} /></span>
                        </div>
                    </div>

                </div>
            </footer>
        </>
    );
}

export default Footer;