import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Tabs, Tab } from "react-bootstrap";
import { Form, Input, Button, Radio, Modal, Popconfirm, Alert, Spin } from "antd";
import { setUserInfo } from "../../slices/userSlice";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import authAPI from "../../services/authAPI";
import CommonUtils from "../../utils/commonUtils";
import AnimatedPage from "../../utils/AnimatedPage";
import Cookies from "js-cookie";

export default function Account() {


    //KHAI BÁO BIẾN
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();


    //KHỞI TẠO GIÁ TRỊ CHO THÔNG TIN CƠ BẢN
    const basicInfo = {
        role_id:
            user.role_id === 2 ? 'Quản trị viên' :
            user.role_id === 3 ? 'Lễ tân' :
            user.role_id === 4 ? 'Bác sĩ' : 'Phụ tá',
        fullname: user.fullname,
        dob: user.dob,
        gender: user.gender,
        phone: user.phone,
        degree: user.degree ? user.degree : "",
        start_date: user.start_date ? user.start_date : "",
        email: user.email,
    };


    //KHỞI TẠO GIÁ TRỊ CHO ĐỊA CHỈ LIÊN HỆ
    const addressInfo = {
        street: user.street ? user.street : "",
        ward: user.ward ? user.ward : "",
        district: user.district ? user.district : "",
        city: user.city ? user.city : ""
    };


    //XỬ LÝ ĐĂNG XUẤT
    const handleLogout = () => {
        Cookies.remove("refreshToken");
        dispatch(setUserInfo({user: null, login: false}));
        navigate("/");
    };


    //XỬ LÝ SUBMIT ĐỔI MẬT KHẨU
    const handleSubmit = (values) => {
        const resultCheckPassword = CommonUtils.checkPasswordLength(values.new_password);
        if(resultCheckPassword) {
            Swal.fire({
                title: "Xác nhận lưu thông tin?",
                confirmButtonText: "Xác nhận",
                showCancelButton: true,
                cancelButtonText: "Hủy",
                customClass: {
                    title: "fs-5 fw-normal text-dark",
                    confirmButton: "btn-primary shadow-none",
                    cancelButton: "btn-secondary-cancel shadow-none",
                },
            })
            .then(async(result) => {
                if (result.isConfirmed) {
                    setIsLoading(true);
                    const res = await authAPI.changePassword({
                        current_password: values.current_password,
                        new_password: values.new_password
                    }, user.user_id);
                    setIsLoading(false);

                    if(res.data.errCode === 0) {
                        toast.success("Đổi mật khẩu thành công");
                        form.resetFields();
                        setIsOpen(false);
                    }
                    else if(res.data.errCode === 2) {
                        toast.error("Mật khẩu không hợp lệ");
                    }
                    else {
                        toast.error("Đổi mật khẩu thất bại");
                    };
                };
            });
        }
        else {
            toast.error("Mật khẩu mới cần có độ dài 6 - 20 ký tự");
        };
    };


    return (
        <AnimatedPage>
            <div className="container-fluid pt-4">
                <div className="row bg-light rounded mx-0 mb-4">
                    <div className="col-md">
                        <div className="rounded p-4 bg-secondary">
                            <div className="row mb-2">
                                <div className="col-md">
                                    <Link to="/" className="text-decoration-none text-primary">
                                        <small><FontAwesomeIcon icon={faChevronLeft}/> Trang chủ</small>
                                    </Link>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <span className="fs-5 fw-bold">Thông tin tài khoản</span>
                            </div>
                            <div className="row mb-5">
                                <div className="col-md">
                                    {
                                        user.avatar
                                        ? 
                                        <img
                                            className="user-avatar rounded"
                                            src={user.avatar}
                                            alt=""
                                        />
                                        :
                                        <div className="user-avatar border border-1 d-flex justify-content-center align-items-center rounded">
                                            <small>Chưa có ảnh</small>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md">
                                    <Tabs defaultActiveKey={1}>
                                        <Tab eventKey={1} title="Thông tin cơ bản">
                                            <Form
                                                className="mt-3"
                                                layout="vertical"
                                                initialValues={basicInfo}
                                            >
                                                <div className="row">
                                                    <div className="col-md-4 mt-3">
                                                        <Form.Item label="Vai trò" name="role_id">
                                                            <Input size="large" readOnly/>
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-md-4 mt-3">
                                                        <Form.Item label="Họ và tên" name="fullname">
                                                            <Input size="large" readOnly/>
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-md-4 mt-3">
                                                        <Form.Item label="Giới tính" name="gender">
                                                            <Radio.Group value={0}>
                                                                <Radio value={1}>Nam</Radio>
                                                                <Radio value={0}>Nữ</Radio>
                                                            </Radio.Group>
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4 mt-3">
                                                        <Form.Item label="Ngày sinh" name="dob">
                                                            <Input size="large" readOnly/>
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-md-4 mt-3">
                                                        <Form.Item label="Số điện thoại" name="phone">
                                                            <Input size="large" readOnly/>
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-md-4 mt-3">
                                                        <Form.Item label="Bằng cấp" name="degree">
                                                            <Input size="large" placeholder="Chưa có thông tin" readOnly/>
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4 mt-3">
                                                        <Form.Item label="Ngày vào làm" name="start_date">
                                                            <Input size="large" placeholder="Chưa có thông tin" readOnly/>
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-md-4 mt-3">
                                                        <Form.Item label="Email" name="email">
                                                            <Input size="large" readOnly/>
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-md-2 mt-3">
                                                        <Form.Item label="Mật khẩu">
                                                            <Button className="w-100" onClick={() => setIsOpen(true)}>Đổi mật khẩu</Button>
                                                        </Form.Item>
                                                        <Modal
                                                            open={isOpen}
                                                            onCancel={() => setIsOpen(false)}
                                                            okButtonProps={{hidden: true}}
                                                            cancelButtonProps={{hidden: true}}
                                                        >
                                                            <Spin tip="Đang tải..." spinning={isLoading}>
                                                                <Form
                                                                    form={form}
                                                                    layout="vertical"
                                                                    onFinish={handleSubmit}
                                                                >
                                                                    <div className="row">
                                                                        <div className="col-md mt-3">
                                                                            <Form.Item
                                                                                label="Mật khẩu hiện tại"
                                                                                name="current_password"
                                                                                rules={[{
                                                                                    required: true,
                                                                                    message: "Mật khẩu hiện tại không được rỗng"
                                                                                }]}
                                                                            >
                                                                                <Input.Password
                                                                                    size="large"
                                                                                    visibilityToggle={false}
                                                                                    placeholder="Mật khẩu hiện tại"
                                                                                />
                                                                            </Form.Item>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md mt-3">
                                                                            <Form.Item
                                                                                label="Mật khẩu mới"
                                                                                name="new_password"
                                                                                rules={[{
                                                                                    required: true,
                                                                                    message: "Mật khẩu mới không được rỗng"
                                                                                }]}
                                                                            >
                                                                                <Input.Password
                                                                                    size="large"
                                                                                    visibilityToggle={false}
                                                                                    placeholder="Mật khẩu mới"
                                                                                />
                                                                            </Form.Item>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-3">
                                                                        <Button htmlType="submit" className="btn-primary px-4 me-2">LƯU MẬT KHẨU</Button>
                                                                        <Button htmlType="reset" className="px-4">RESET</Button>
                                                                    </div>
                                                                </Form>
                                                            </Spin>
                                                        </Modal>
                                                    </div>
                                                    <div className="col-md-2 mt-3">
                                                        <Form.Item label="Đăng xuất">
                                                            <Popconfirm
                                                                title="Bạn có muốn đăng xuất?"
                                                                cancelText="Hủy"
                                                                okText="Có"
                                                                onConfirm={handleLogout}
                                                            >
                                                                <Button className="w-100 btn-primary">Đăng xuất</Button>
                                                            </Popconfirm>
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <Alert message="Bạn không thể thay đổi thông tin cá nhân, hãy liên hệ quản trị viên nếu bạn cần cập nhật thông tin." type="warning" showIcon/>
                                                </div>
                                            </Form>
                                        </Tab>
                                        <Tab eventKey={2} title="Địa chỉ liên hệ">
                                            <Form
                                                className="mt-3"
                                                layout="vertical"
                                                initialValues={addressInfo}
                                            >
                                                <div className="row">
                                                    <div className="col-md-3 mt-3">
                                                        <Form.Item label="Số nhà và tên đường" name="street">
                                                            <Input size="large" placeholder="Chưa có thông tin" readOnly/>
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-md-3 mt-3">
                                                        <Form.Item label="Phường/xã" name="ward">
                                                            <Input size="large" placeholder="Chưa có thông tin" readOnly/>
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-md-3 mt-3">
                                                        <Form.Item label="Quận/huyện" name="district">
                                                            <Input size="large" placeholder="Chưa có thông tin" readOnly/>
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-md-3 mt-3">
                                                        <Form.Item label="Thành phố/tỉnh" name="city">
                                                            <Input size="large" placeholder="Chưa có thông tin" readOnly/>
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <Alert message="Bạn không thể thay đổi thông tin cá nhân, hãy liên hệ quản trị viên nếu bạn cần cập nhật thông tin." type="warning" showIcon/>
                                                </div>
                                            </Form>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};