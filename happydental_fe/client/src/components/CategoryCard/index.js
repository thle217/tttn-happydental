import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function CategoryCard({category}) {
    return (
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="service-item bg-light rounded h-100 p-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{width: '65px', height: '65px'}}>
                    <i className="text-primary fs-4"><FontAwesomeIcon icon={faTooth} /></i>
                </div>
                <h4 className="mb-3 text-capitalize">{category.category_name}</h4>
                <p className="mb-4">Chọn "Xem thêm" để hiển thị danh sách các bác sĩ điều trị danh mục.</p>
                <Link className="btn" to="">
                    <i className="text-primary me-3"><FontAwesomeIcon icon={faPlus} /></i>Xem thêm
                </Link>
            </div>
        </div>
    );
};