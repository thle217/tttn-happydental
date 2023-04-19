import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faCommentMedical, faHeadphones, faPhoneAlt, faUserMd, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import CategoryList from "../CategoryList";
import DoctorList from "../DoctorList";
import AnimatedPage from "../../utils/AnimatedPage";

export default function Home() {
    return (
        <AnimatedPage>
            <Header/>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                            <div className="d-flex flex-column">
                                <img className="img-fluid rounded w-75 align-self-end" src="https://res.cloudinary.com/dcteqnz2i/image/upload/v1681286856/carousel-2_upwfrp.jpg" alt=""/>
                                <img className="img-fluid rounded w-50 bg-white pt-3 pe-3" src="https://res.cloudinary.com/dcteqnz2i/image/upload/v1681286856/carousel-3_e6zsls.jpg" alt="" style={{marginTop: '-25%'}}/>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                            <p className="d-inline-block border rounded-pill py-1 px-4">Về Chúng Tôi</p>
                            <h1 className="mb-4">Hãy Tìm Hiểu Về Happy Dental</h1>
                            <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                            <p className="mb-4">Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No stet est diam rebum amet diam ipsum. Clita clita labore, dolor duo nonumy clita sit at, sed sit sanctus dolor eos.</p>
                            <p><i className="text-primary me-3"><FontAwesomeIcon icon={faCheckCircle}/></i>Chất lượng dịch vụ</p>
                            <p><i className="text-primary me-3"><FontAwesomeIcon icon={faCheckCircle}/></i>Đội ngũ bác sĩ tận tâm</p>
                            <p><i className="text-primary me-3"><FontAwesomeIcon icon={faCheckCircle}/></i>Trang thiết bị hiện đại</p>
                            {/* <a className="btn btn-primary rounded-pill py-3 px-5 mt-3" href="">Read More</a> */}
                        </div>
                    </div>
                </div>
            </div>
            <CategoryList/>
            <div className="container-fluid bg-primary overflow-hidden my-5 px-lg-0">
                <div className="container feature px-lg-0">
                    <div className="row g-0 mx-lg-0">
                        <div className="col-lg-6 feature-text py-5 wow fadeIn" data-wow-delay="0.1s">
                            <div className="p-lg-5 ps-lg-0">
                                <h1 className="text-white mb-4">Hãy Chọn Happy Dental</h1>
                                <p className="text-white mb-4 pb-2">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo erat amet</p>
                                <div className="row g-4">
                                    <div className="col-6">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{width: '55px', height: '55px'}}>
                                                <i className="text-primary"><FontAwesomeIcon icon={faUserMd}/></i>
                                            </div>
                                            <div className="ms-4">
                                                <p className="text-white mb-2">Bác sĩ</p>
                                                <h5 className="text-white mb-0">Chuyên môn cao</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{width: '55px', height: '55px'}}>
                                                <i className="text-primary"><FontAwesomeIcon icon={faCheck}/></i>
                                            </div>
                                            <div className="ms-4">
                                                <p className="text-white mb-2">Dịch vụ</p>
                                                <h5 className="text-white mb-0">Chất lượng</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{width: '55px', height: '55px'}}>
                                                <i className="text-primary"><FontAwesomeIcon icon={faCommentMedical}/></i>
                                            </div>
                                            <div className="ms-4">
                                                <p className="text-white mb-2">Tư vấn</p>
                                                <h5 className="text-white mb-0">Nhiệt tình</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{width: '55px', height: '55px'}}>
                                                <i className="text-primary"><FontAwesomeIcon icon={faHeadphones}/></i>
                                            </div>
                                            <div className="ms-4">
                                                <p className="text-white mb-2">Hỗ trợ</p>
                                                <h5 className="text-white mb-0">Mọi lúc - mọi nơi</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 pe-lg-0 wow fadeIn" data-wow-delay="0.5s" style={{minHeight: '400px'}}>
                            <div className="position-relative h-100">
                                <img className="position-absolute img-fluid w-100 h-100" src="https://res.cloudinary.com/dcteqnz2i/image/upload/v1681286856/carousel-3_e6zsls.jpg" style={{objectFit: 'cover'}} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DoctorList/>
            {/* <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <p className="d-inline-block border rounded-pill py-1 px-4">Appointment</p>
                            <h1 className="mb-4">Make An Appointment To Visit Our Doctor</h1>
                            <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                            <div className="bg-light rounded d-flex align-items-center p-5 mb-4">
                                <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: '55px', height: '55px'}}>
                                    <i className="text-primary"><FontAwesomeIcon icon={faPhoneAlt}/></i>
                                    <i className="fa fa-phone-alt text-primary"></i>
                                </div>
                                <div className="ms-4">
                                    <p className="mb-2">Call Us Now</p>
                                    <h5 className="mb-0">+012 345 6789</h5>
                                </div>
                            </div>
                            <div className="bg-light rounded d-flex align-items-center p-5">
                                <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: '55px', height: '55px'}}>
                                    <i className="text-primary"><FontAwesomeIcon icon={faEnvelopeOpen}/></i>
                                </div>
                                <div className="ms-4">
                                    <p className="mb-2">Mail Us Now</p>
                                    <h5 className="mb-0">info@example.com</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="bg-light rounded h-100 d-flex align-items-center p-5">
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </AnimatedPage>        
    );
};