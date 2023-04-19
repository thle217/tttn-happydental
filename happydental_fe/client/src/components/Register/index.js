import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Form, Input, DatePicker, Radio, Alert, Spin } from "antd";
import { setRegisterOpen } from "../../slices/registerSlice";
import { setLoginOpen } from "../../slices/loginSlice";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import CommonUtils from "../../utils/commonUtils";
import authAPI from "../../services/authAPI";

export default function Register() {


    //XỬ LÝ ĐÓNG MỞ MODAL ĐĂNG KÝ - SET LOADING
    const isOpen = useSelector(state => state.register);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);


    //XỬ LÝ ĐĂNG KÝ
    const [form] = Form.useForm();
    const handleSubmit = (values) => {
        let resultCheckPhone = CommonUtils.checkPhoneNumber(values.phone);
        let resultCheckPassword;

        if(resultCheckPhone) {
            resultCheckPassword = CommonUtils.checkPasswordLength(values.password);
            if(resultCheckPassword) {
                Swal.fire({
                    title: "Xác nhận đăng ký?",
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
                        const res = await authAPI.register({
                            fullname: values.fullname,
                            dob: values.dob,
                            gender: values.gender,
                            phone: values.phone,
                            email: values.email,
                            password: values.password
                        });
                        setIsLoading(false);
                        if(res.data.errCode === 0) {
                            form.resetFields();
                            dispatch(setRegisterOpen(false));
                            toast.success("Bạn cần xác minh đăng ký qua email");
                        }
                        else if(res.data.errCode === 2) {
                            toast.error("Email đã thuộc về người dùng khác");
                        }
                        else { //errCode === 5
                            toast.error("Đăng ký thất bại");
                        };
                    };
                });
            }
            else {
                toast.error("Mật khẩu cần có độ dài 6 - 20 ký tự");
            };
        }
        else {
            toast.error("Số điện thoại không hợp lệ");
        };
    };


    return (
        <Modal
            open={isOpen}
            onCancel={() => dispatch(setRegisterOpen(false))}
            okButtonProps={{hidden: true}}
            cancelButtonProps={{hidden: true}}
        >
            <Spin tip="Đang tải..." spinning={isLoading}>
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{gender: 1}}
                    onFinish={handleSubmit}
                    validateMessages={{
                        types: {
                            email: "Email không đúng định dạng"
                        }
                    }}
                >
                    <div className="row">
                        <div className="col-md mt-2">
                            <Form.Item
                                label="Họ và tên"
                                name="fullname"
                                rules={[{
                                    required: true,
                                    message: "Họ và tên không được rỗng"
                                }]}
                            >
                                <Input size="large" placeholder="Họ và tên"/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md mt-2">
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Item
                                        label="Ngày sinh"
                                        name="dob"
                                        rules={[{
                                            required: true,
                                            message: "Ngày sinh không được rỗng",
                                        }]}
                                    >
                                        <DatePicker size="large" placeholder="Ngày sinh"/>
                                    </Form.Item>
                                </div>
                                <div className="col-md-6">
                                    <Form.Item label="Giới tính" name="gender">
                                        <Radio.Group>
                                            <Radio value={1}>Nam</Radio>
                                            <Radio value={0}>Nữ</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md mt-2">
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[{
                                    required: true,
                                    message: "Số điện thoại không được rỗng",
                                }]}
                            >
                                <Input size="large" placeholder="Số điện thoại"/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md mt-2">
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Email không được rỗng"
                                    },
                                    {
                                        type: 'email'
                                    }
                                ]}
                            >
                                <Input size="large" placeholder="Email"/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md mt-2">
                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[{
                                    required: true,
                                    message: "Mật khẩu không được rỗng",
                                }]}
                            >
                                <Input.Password
                                    size="large"
                                    placeholder="Mật khẩu (6 - 20 ký tự)"
                                    visibilityToggle={false}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="mt-3">
                        <Button htmlType="submit" className="btn-primary px-4 me-2">ĐĂNG KÝ</Button>
                        <Button htmlType="reset" className="px-4">RESET</Button>
                    </div>
                    <div className="mt-3">
                        <Alert
                            type="warning"
                            showIcon message="Bạn đã có tài khoản?"
                            action={
                                <Button
                                    className="bg-transparent border-0"
                                    onClick={() => {
                                        dispatch(setRegisterOpen(false));
                                        dispatch(setLoginOpen(true));
                                    }}
                                >
                                    Đăng nhập ngay
                                </Button>
                            }
                        />
                    </div>
                </Form>
            </Spin>
        </Modal>
    );
};