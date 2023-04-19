import Carousel from 'react-bootstrap/Carousel';

export default function Header() {
    return (
        <div className="container-fluid header bg-primary p-0 mb-5">
            <div className="row g-0 align-items-center flex-column-reverse flex-lg-row">
                <div className="col-lg-6 p-5 wow fadeIn" data-wow-delay="0.1s">
                    <h1 className="text-white mb-5 custom-fs-1">HAPPY DENTAL</h1>
                    <h1 className="text-white mb-5">Vì Sức Khỏe Của Bạn</h1>
                    <div className="row g-4">
                        <div className="col-sm-4">
                            <div className="border-start border-light ps-4">
                                <h2 className="text-white mb-1" data-toggle="counter-up">000</h2>
                                <p className="text-light mb-0">Bác sĩ - Phụ tá</p>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="border-start border-light ps-4">
                                <h2 className="text-white mb-1" data-toggle="counter-up">000</h2>
                                <p className="text-light mb-0">Trang thiết bị</p>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="border-start border-light ps-4">
                                <h2 className="text-white mb-1" data-toggle="counter-up">000</h2>
                                <p className="text-light mb-0">Khách hàng</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${process.env.REACT_APP_CAROUSEL_1}`}
                                alt=""
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${process.env.REACT_APP_CAROUSEL_2}`}
                                alt=""
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${process.env.REACT_APP_CAROUSEL_3}`}
                                alt=""
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </div>
    );
};