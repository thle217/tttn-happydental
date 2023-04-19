import { useState, useEffect } from "react";
import CategoryCard from "../../components/CategoryCard";
import AnimatedPage from "../../utils/AnimatedPage";
import categoryAPI from "../../services/categoryAPI";

export default function CategoryList() {

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        const getActiveCategories = async() => {
            const res = await categoryAPI.getActive();
            setCategoryList(res.data.data);
        };
        getActiveCategories();
    }, [])

    return (
        <AnimatedPage>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: '600px'}}>
                        <p className="d-inline-block border rounded-pill py-1 px-4">Danh Mục Dịch Vụ</p>
                        <h1>Các Dịch Vụ Của Chúng Tôi</h1>
                    </div>
                    <div className="row g-4">
                        {
                            categoryList.map((category, index) => {
                                return (
                                    <CategoryCard key={index} category={category} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};