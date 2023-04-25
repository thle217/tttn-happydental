import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimatedPage from "../../utils/AnimatedPage";
import { faMapMarkedAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";

export default function Contact() {
    return (
        <AnimatedPage>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-4">
                            <div className="h-100 bg-light rounded d-flex align-items-center py-5 px-4">
                                <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: '55px', height: '55px'}}>
                                    <i className="text-primary"><FontAwesomeIcon icon={faMapMarkedAlt}/></i>
                                </div>
                                <div className="ms-4">
                                    <p className="mb-2">Địa chỉ</p>
                                    <h6 className="mb-0">180 Cao Lỗ, P4, Q8, TP.HCM</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="h-100 bg-light rounded d-flex align-items-center py-5 px-4">
                                <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white"style={{width: '55px', height: '55px'}}>
                                    <i className="text-primary"><FontAwesomeIcon icon={faPhoneAlt}/></i>
                                </div>
                                <div className="ms-4">
                                    <p className="mb-2">Hotline</p>
                                    <h6 className="mb-0">+012 345 6789</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="h-100 bg-light rounded d-flex align-items-center py-5 px-4">
                                <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white"style={{width: '55px', height: '55px'}}>
                                    <i className="text-primary"><FontAwesomeIcon icon={faEnvelopeOpen}/></i>
                                </div>
                                <div className="ms-4">
                                    <p className="mb-2">Email</p>
                                    <h6 className="mb-0">happydental2023@gmail.com</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                            <img src={process.env.REACT_APP_CONTACTPAGE} className="w-100 rounded" alt=""/>
                        </div>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                            <div className="h-100" style={{minHeight: '400px'}}>
                                <iframe
                                    title="maps"
                                    className="rounded w-100 h-100"
                                    src="https://maps.google.com/maps?q=180 Cao Lỗ&t=&z=17&ie=UTF8&iwloc=&output=embed"
                                    allowFullScreen="0"
                                    aria-hidden="false"
                                    tabIndex="0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};