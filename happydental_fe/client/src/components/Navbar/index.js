import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Button, Popconfirm } from "antd";
import { setLoginOpen } from "../../slices/loginSlice";
import { setRegisterOpen } from "../../slices/registerSlice";
import { setUserInfo } from "../../slices/userSlice";
import Cookies from "js-cookie";
import Dropdown from 'react-bootstrap/Dropdown';
import Login from "../Login";
import Register from "../Register";

export default function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);

    //XỬ LÝ ĐĂNG XUẤT
    const handleLogout = () => {
        Cookies.remove("customerRefreshToken");
        dispatch(setUserInfo({user: null, login: false}));
        navigate("/");
    };

    return (
        <>
            <nav className="container-fluid custom-navbar bg-white sticky-top px-5">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3">
                    <Link to="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                        <img className="logo" src={`${process.env.REACT_APP_LOGO}`} alt=""/>
                    </Link>
                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><NavLink to="/" className="nav-link px-2 link-dark">Trang chủ</NavLink></li>
                        <li><NavLink to="/danh-muc-dich-vu" className="nav-link px-2 link-dark">Danh mục dịch vụ</NavLink></li>
                        <li><NavLink to="/doi-ngu-bac-si" className="nav-link px-2 link-dark">Đội ngũ bác sĩ</NavLink></li>
                        <li><NavLink to="/lien-he" className="nav-link px-2 link-dark">Liên hệ</NavLink></li>
                    </ul>

                    <div className="col-md-3 text-end">
                        {
                            user
                            ?
                            <>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" style={{width: '200px'}}>
                                    <span className="d-inline-block text-truncate" style={{width: '150px'}}>
                                        {`Xin chào, ${user.fullname}`}
                                    </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{width: '200px'}}>
                                    <Dropdown.Item
                                        onClick={() => navigate("/quan-ly-tai-khoan")}
                                    >
                                        Quản lý tài khoản
                                    </Dropdown.Item>
                                    <Dropdown.Item>Lịch sử lịch hẹn</Dropdown.Item>
                                    <Popconfirm
                                        title="Bạn có muốn đăng xuất?"
                                        placement="bottom"
                                        cancelText="Hủy"
                                        okText="Có"
                                        onConfirm={handleLogout}
                                    >
                                        <Button className="border-0 w-100 mt-2">Đăng xuất</Button>
                                    </Popconfirm>
                                </Dropdown.Menu>
                            </Dropdown>
                            </>
                            :
                            <>                            
                            <Button onClick={() => dispatch(setLoginOpen(true))} className="btn-primary me-2">Đăng nhập</Button>
                            <Button onClick={() => dispatch(setRegisterOpen(true))}>Đăng ký</Button>
                            </>
                        }
                    </div>
                </div>
            </nav>
            <Login/>
            <Register/>
        </>
    );
};