import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { setUserInfo } from "../../slices/userSlice";
import { Spin } from "antd";
import authAPI from "../../services/authAPI";

export default function Login() {


    //STATE CHỨA THÔNG TIN
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();


    //XỬ LÝ ĐĂNG NHẬP
    const handleLogin = async(e) => {
        e.preventDefault();

        setIsLoading(true);
        const res = await authAPI.login({
            email: email,
            password: password
        });
        setIsLoading(false);
        if(res.data.errCode === 0) {
            if(res.data.data.role_id === 1) {
                toast.error("Không đúng phân quyền");
            }
            else {
                const action = setUserInfo({user: res.data.data, login: true});
                dispatch(action);
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
        <Spin tip="Đang tải..." spinning={isLoading}>
            <div className="container-fluid bg-light">
                <div className="row h-100 align-items-center justify-content-center" style={{minHeight: '100vh'}}>
                    <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                        <form onSubmit={handleLogin} method="post" className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h3 className="text-primary">HAPPY DENTAL</h3>    
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="floatingEmail"
                                    placeholder="Địa chỉ email"
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <label htmlFor="floatingEmail">Địa chỉ email</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Mật khẩu"
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <label htmlFor="floatingPassword">Mật khẩu</label>
                            </div>
                            <input type="submit" name="btn-login" value="ĐĂNG NHẬP" className="btn btn-primary py-3 w-100 mb-4"/>
                            <Link to="/quen-mat-khau" className="text-decoration-none text-primary">Quên mật khẩu</Link>
                        </form>
                    </div>
                </div>
            </div>
        </Spin>
    );
};