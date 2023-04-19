import { Link } from "react-router-dom";

export default function DoctorCard({doctor}) {
    return (
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="team-item position-relative rounded overflow-hidden">
                <div className="overflow-hidden">
                    <img className="img-fluid" src={doctor.avatar} alt=""/>
                </div>
                <div className="team-text bg-light text-center p-4">
                    <h5>{doctor.fullname}</h5>
                    <p className="text-primary">{doctor.degree}</p>
                    <div className="text-center">
                        <Link to="">Xem thêm</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};