import { useState, useEffect } from "react";
import DoctorCard from "../../components/DoctorCard";
import AnimatedPage from "../../utils/AnimatedPage";
import customerAPI from "../../services/customerAPI";

export default function DoctorList() {

    const [doctorList, setDoctorList] = useState([]);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        const getAllDoctors = async() => {
            const res = await customerAPI.getAllDoctors();
            setDoctorList(res.data.data);
        };
        getAllDoctors();
    }, [])

    return (
        <AnimatedPage>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: '600px'}}>
                        <p className="d-inline-block border rounded-pill py-1 px-4">Đội Ngũ Bác Sĩ</p>
                        <h1>Danh Sách Các Bác Sĩ</h1>
                    </div>
                    <div className="row g-4">
                        {
                            doctorList.map((doctor, index) => {
                                return (
                                    <DoctorCard key={index} doctor={doctor} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};