import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import authAPI from "../../services/authAPI";

export function ForgetPassword() {

    const [email, setEmail] = useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();

        if(email) {
            const res = await authAPI.forgetPassword({email: email});
            if(res.data.errCode === 0) {
                toast.success("Đã gửi email đặt lại mật khẩu");
            }
            else {
                toast.error("Lỗi");
            };
            setEmail("");
        }
        else {
            toast.error("Bạn chưa nhập email");
        };
    };


    return (
        <div className="container-fluid bg-light">
            <div className="row h-100 align-items-center justify-content-center" style={{minHeight: '100vh'}}>
                <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                    <form onSubmit={handleSubmit} method="post" className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                        <small className="text-primary">Bạn cần nhập <b className="text-danger">địa chỉ email hiện tại</b> của tài khoản.</small>
                        <div className="form-floating mb-3 mt-3">
                            <input
                                type="email"
                                className="form-control"
                                id="floatingEmail"
                                placeholder="Địa chỉ email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <label htmlFor="floatingEmail">Địa chỉ email</label>
                        </div>
                        <input type="submit" name="btn-login" value="GỬI EMAIL" className="btn btn-primary py-3 w-100 mb-4"/>
                        <Link to="/" className="text-decoration-none text-primary">Đăng nhập</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export function ResetPassword() {

    const [newPassword, setNewPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();

        if(newPassword) {

        }
        else {
            toast.error("Bạn chưa nhập mật khẩu");
        };
    };

    return (
        <div className="container-fluid bg-light">
            <div className="row h-100 align-items-center justify-content-center" style={{minHeight: '100vh'}}>
                <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                    <form onSubmit={handleSubmit} method="post" className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Mật khẩu mới"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                            />
                            <label htmlFor="floatingPassword">Mật khẩu mới</label>
                        </div>
                        <input type="submit" name="btn-login" value="LƯU MẬT KHẨU" className="btn btn-primary py-3 w-100"/>
                    </form>
                </div>
            </div>
        </div>
    );
};