import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Form, Input, Alert, Spin } from "antd";
import { setLoginOpen } from "../../slices/loginSlice";
import { setRegisterOpen } from "../../slices/registerSlice";
import { setUserInfo } from "../../slices/userSlice";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import authAPI from "../../services/authAPI";

export default function Login() {


    //XỬ LÝ ĐÓNG MỞ MODAL ĐĂNG NHẬP - SET LOADING
    const isOpen = useSelector(state => state.login);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    
    
    //XỬ LÝ ĐĂNG NHẬP
    const handleLogin = async(values) => {
        setIsLoading(true);
        const res = await authAPI.login({
            email: values.email,
            password: values.password
        });
        setIsLoading(false);
        if(res.data.errCode === 0) {
            if(res.data.data.role_id !== 1) {
                toast.error("Không đúng phân quyền");
            }
            else {
                const {refresh_token, ...data} = res.data.data;
                const action = setUserInfo({user: data, login: true});
                dispatch(action);
                dispatch(setLoginOpen(false));
                Cookies.set("customerRefreshToken", res.data.data.refresh_token);
            };
        }
        else if(res.data.errCode === 4) {
            toast.error("Bạn cần xác minh tài khoản qua email");
        }
        else {
            toast.error("Sai thông tin đăng nhập");
        };
    };


    return (
        <Modal
            open={isOpen}
            onCancel={() => dispatch(setLoginOpen(false))}
            okButtonProps={{hidden: true}}
            cancelButtonProps={{hidden: true}}
        >
            <Spin tip="Đang tải..." spinning={isLoading}>
                <Form
                    layout="vertical"
                    onFinish={handleLogin}
                    validateMessages={{
                        types: {
                            email: "Email không đúng định dạng"
                        }
                    }}
                >
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
                        <Button htmlType="submit" className="btn-primary px-4 me-2">ĐĂNG NHẬP</Button>
                        <Button htmlType="reset" className="px-4">RESET</Button>
                    </div>
                    <div className="mt-3">
                        <Alert
                            type="warning"
                            showIcon message="Bạn chưa có tài khoản?"
                            action={
                                <Button
                                    className="bg-transparent border-0"
                                    onClick={() => {
                                        dispatch(setLoginOpen(false));
                                        dispatch(setRegisterOpen(true));
                                    }}
                                >
                                    Đăng ký ngay
                                </Button>
                            }
                        />
                    </div>
                </Form>
            </Spin>
        </Modal>
    );
};