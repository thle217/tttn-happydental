import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import AnimatedPage from "../../utils/AnimatedPage";

export default function NotFound() {
    return (
        <AnimatedPage>
            <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container text-center">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <i className="display-1 text-primary"><FontAwesomeIcon icon={faExclamationTriangle}/></i>
                            <h1 className="display-1">404</h1>
                            <h1 className="mb-4">Không tìm thấy trang</h1>
                            <p className="mb-4">Có vẻ như bạn đã truy cập sai đường dẫn</p>
                            <Link className="btn btn-primary rounded-pill py-3 px-5" to="/">Quay về trang chủ</Link>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};