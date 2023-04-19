import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faList, faCalendarAlt, faFileInvoiceDollar, faChartBar, faUserCog } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {

    const togglerStatus = useSelector(state => state.togglerStatus);
    const user = useSelector(state => state.user.user);

    return (
        <div className={`sidebar pe-4 pb-3 ${togglerStatus ? 'open' : ''}`}>
            <nav className="navbar bg-secondary navbar-dark">
                <Link to="/" className="navbar-brand mx-4 mb-3">
                    <h3 className="text-primary">HAPPY DENTAL</h3>
                </Link>
                <div className="d-flex align-items-center ms-4 mb-4">
                    <div className="position-relative">
                        <img
                            className="rounded-circle"
                            src={user.avatar ? user.avatar : "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"}
                            alt=""
                            style={{width: '40px', height: '40px'}}
                        />
                        <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                    </div>
                    <div className="ms-3">
                        <h6 className="mb-0 text-dark">
                            {
                                user.role_id === 2 ? 'Quản trị viên' :
                                user.role_id === 3 ? 'Lễ tân' :
                                user.role_id === 4 ? 'Bác sĩ' : 'Phụ tá'
                            }
                        </h6>
                        <span>{user.fullname}</span>
                    </div>
                </div>
                <div className="navbar-nav w-100">
                    <NavLink to="/tai-khoan" className="nav-item nav-link">
                        <i className="me-2"><FontAwesomeIcon icon={faUserCog}/></i>Tài khoản
                    </NavLink>
                    <hr/>
                    {
                        user.role_id === 2
                        ?
                        <>                        
                        <NavLink to="/" className="nav-item nav-link">
                            <i className="me-2"><FontAwesomeIcon icon={faChartBar}/></i>Thống kê
                        </NavLink>
                        <NavLink to="/quan-ly-nhan-vien" className="nav-item nav-link">
                            <i className="me-2"><FontAwesomeIcon icon={faUser}/></i>Nhân viên
                        </NavLink>
                        </>
                        :
                        <></>

                    }
                    {
                        user.role_id === 2 || user.role_id === 3
                        ?
                        <NavLink to="/quan-ly-khach-hang" className="nav-item nav-link">
                            <i className="me-2"><FontAwesomeIcon icon={faUser}/></i>Khách hàng
                        </NavLink>
                        :
                        <></>

                    }
                    {
                        user.role_id === 2
                        ?
                        <>
                        <NavLink to="/quan-ly-danh-muc-dich-vu" className="nav-item nav-link">
                            <i className="me-2"><FontAwesomeIcon icon={faList}/></i>Danh mục dịch vụ
                        </NavLink>
                        <NavLink to="/quan-ly-dich-vu" className="nav-item nav-link">
                            <i className="me-2"><FontAwesomeIcon icon={faList}/></i>Dịch vụ
                        </NavLink>
                        <NavLink to="/quan-ly-ca-kham" className="nav-item nav-link">
                            <i className="me-2"><FontAwesomeIcon icon={faList}/></i>Ca khám
                        </NavLink>
                        </>
                        :
                        <></>
                    }
                    <NavLink to="/quan-ly-lich-lam-viec" className="nav-item nav-link">
                        <i className="me-2"><FontAwesomeIcon icon={faCalendarAlt}/></i>Lịch làm việc
                    </NavLink>
                    {
                        user.role_id === 3 || user.role_id === 4
                        ?
                        <NavLink to="/quan-ly-lich-hen" className="nav-item nav-link">
                            <i className="me-2"><FontAwesomeIcon icon={faCalendarAlt}/></i>Lịch hẹn
                        </NavLink>
                        :
                        <></>
                    }
                    {
                        user.role_id === 3
                        ?
                        <NavLink to="/quan-ly-hoa-don" className="nav-item nav-link">
                            <i className="me-2"><FontAwesomeIcon icon={faFileInvoiceDollar}/></i>Hóa đơn
                        </NavLink>
                        :
                        <></>
                    }
                </div>
            </nav>
        </div>
    );
};