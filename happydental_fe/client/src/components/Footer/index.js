import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {

    return (
        <div className="container-fluid bg-white text-dark footer pt-5 wow fadeIn" data-wow-delay="0.1s">
            <div className="container py-5">
                <div className="row g-5">
                    <div className="col-lg-4 col-md-6">
                        <h5 className="text-primary mb-4">Thông tin liên hệ</h5>
                        <p className="mb-2">
                            <i className="me-3"><FontAwesomeIcon icon={faMapMarkerAlt}/></i>
                            180 Cao Lỗ, Phường 4, Quận 8, TP.HCM
                        </p>
                        <p className="mb-2">
                            <i className="me-3"><FontAwesomeIcon icon={faPhoneAlt}/></i>
                            +012 345 67890
                        </p>
                        <p className="mb-2">
                            <i className="me-3"><FontAwesomeIcon icon={faEnvelope}/></i>
                            happydental2023@gmail.com
                        </p>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <h5 className="text-primary mb-4">Thời gian làm việc</h5>
                        <p className="mb-2">
                            <i className="me-3"><FontAwesomeIcon icon={faClock}/></i>
                            08:00 - 20:00 (Thứ 2 đến thứ 7)
                        </p>
                        <p className="mb-2">
                            <i className="me-3"><FontAwesomeIcon icon={faClock}/></i>
                            08:00 - 17:00 (Chủ nhật)
                        </p>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <h5 className="text-primary mb-4">Kết nối với Happy Dental</h5>
                        <div className="d-flex pt-2">
                            <Link className="btn btn-primary btn-social rounded-circle" to="">
                                <i className="text-white"><FontAwesomeIcon icon={faFacebookF}/></i>
                            </Link>
                            <Link className="btn btn-primary btn-social rounded-circle" to="">
                                <i className="text-white"><FontAwesomeIcon icon={faInstagram}/></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};