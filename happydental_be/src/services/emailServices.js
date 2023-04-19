import nodemailer from "nodemailer";
require("dotenv").config();


//GỬI MAIL XÁC NHẬN NGƯỜI DÙNG
const sendVerifyUser = async(data) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        }
    });

    let info = await transporter.sendMail({
        from: `"Happy Dental" <${process.env.EMAIL_APP}>`,
        to: data.email,
        subject: "Xác minh tài khoản",
        html:
        data.role_id == 1
        ?
        `
        <h3>Xin chào ${data.fullname}!</h3>
        <p><b>Happy Dental</b> gửi đến bạn email xác nhận thao tác đăng ký tài khoản đã thực hiện trên website.</p>
        <p>Bạn cần xác nhận theo đường dẫn được đính kèm bên dưới để kích hoạt tài khoản.</p>
        <p>Nếu bạn không thực hiện đăng ký tài khoản với Happy Dental, vui lòng liên hệ với chúng tôi để được hỗ trợ.</p>
        <a href=${data.redirectLink}>Xác minh tài khoản</a>
        `
        :
        `
        <h3>Xin chào ${data.fullname}!</h3>
        <p>Bạn cần xác nhận theo đường dẫn được đính kèm bên dưới để có thể đăng nhập vào hệ thống quản lý của Happy Dental.</p>
        <p>Nếu bạn nghĩ đây là sự nhầm lẫn, vui lòng liên hệ với chúng tôi để được hỗ trợ.</p>
        <a href=${data.redirectLink}>Xác minh tài khoản</a>
        `
    });
};


//GỬI EMAIL QUÊN MẬT KHẨU
const sendForgotPassword = async(data) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        }
    });

    let info = await transporter.sendMail({
        from: `"Happy Dental" <${process.env.EMAIL_APP}>`,
        to: data.email,
        subject: "Đặt lại mật khẩu",
        html:
        `
        <h3>Xin chào ${data.fullname}!</h3>
        <p><b>Happy Dental</b> gửi đến bạn email đặt lại mật khẩu cho trường hợp quên mật khẩu của bạn.</p>
        <p>Bạn cần xác nhận theo đường dẫn được đính kèm bên dưới để đặt lại mật khẩu mới</p>
        <p>Nếu bạn không thực hiện hành động này, vui lòng liên hệ với chúng tôi để được hỗ trợ.</p>
        <a href=${data.redirectLink}>Đặt lại mật khẩu</a>
        `
    });
};


module.exports = {
    sendVerifyUser,
    sendForgotPassword
};