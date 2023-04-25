import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

export default function Topbar() {

    return (   
        <div className="container-fluid bg-light p-0 wow fadeIn" data-wow-delay="0.1s">
            <div className="row gx-0 d-none d-lg-flex">
                <div className="col-lg-7 px-5 text-start">
                    <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                        <small className="text-primary me-2"><FontAwesomeIcon icon={faMapMarkerAlt}/></small>
                        <small>180 Cao Lỗ, P4, Q8, TP.HCM</small>
                    </div>
                    <div className="h-100 d-inline-flex align-items-center py-3">
                        <small className="text-primary me-2"><FontAwesomeIcon icon={faClock}/></small>
                        <small>08:00 - 20:00 (T2 - T7) & 08:00 - 17:00 (CN)</small>
                    </div>
                </div>
                <div className="col-lg-5 px-5 text-end">
                    <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                        <small className="text-primary me-2"><FontAwesomeIcon icon={faPhoneAlt}/></small>
                        <small>+012 345 6789</small>
                    </div>
                </div>
            </div>
        </div>
    );
};