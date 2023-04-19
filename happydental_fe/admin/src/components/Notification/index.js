import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function Notification() {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="white" className="text-dark" id="dropdown-basic">
                <i className="me-2 rounded-circle"><FontAwesomeIcon icon={faBell}/></i>
                Thông báo
            </Dropdown.Toggle>
            <Dropdown.Menu className="border-top-0">
                <Dropdown.Item href="#/action-1">
                    <div className="d-flex align-items-center px-3">
                        <img className="rounded-circle" src="https://i.pinimg.com/originals/fa/02/02/fa0202572e8aa734cedb154c413a4846.jpg" alt="" style={{width: '40px', height: '40px'}}/>
                        <div className="ms-2">
                            <span>Yêu cầu đặt lịch hẹn</span><br/>
                            <small>15 minutes ago</small>
                        </div>
                    </div>
                    <hr className="dropdown-divider"/>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                    <div className="d-flex align-items-center px-3">
                        <img className="rounded-circle" src="https://i.pinimg.com/originals/fa/02/02/fa0202572e8aa734cedb154c413a4846.jpg" alt="" style={{width: '40px', height: '40px'}}/>
                        <div className="ms-2">
                            <span>Yêu cầu đặt lịch hẹn</span><br/>
                            <small>15 minutes ago</small>
                        </div>
                    </div>
                    <hr className="dropdown-divider"/>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                    <span className="dropdown-item text-center">Xem tất cả</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};