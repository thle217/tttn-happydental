import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Form, Input, DatePicker, Radio, Select, Button, Popconfirm, Spin } from "antd";
import { setUserInfo } from "../../../slices/userSlice";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import CommonUtils from "../../../utils/commonUtils";
import roleAPI from "../../../services/roleAPI";
import locationAPI from "../../../services/locationAPI";
import employeeAPI from "../../../services/employeeAPI";
import imageAPI from "../../../services/imageAPI";
import AnimatedPage from "../../../utils/AnimatedPage";

export default function EmployeeDetails({ accessToken }) {


    //XỬ LÝ CONFIG AXIOS
    const data = useSelector(state => state.user.user);
    const axiosJWT = axios.create();
    const dispatch = useDispatch();

    axiosJWT.interceptors.request.use(async(config) => {
        let date = new Date();
        const decodedToken = jwt_decode(data.access_token);
        if(decodedToken.exp < date.getTime() / 1000) {
            const res = await axios(`${process.env.REACT_APP_API_URL}/api/auth/refresh-token`, {
                method: "post",
                withCredentials: true
            });
            Cookies.set("refreshToken", res.data.data.refresh_token);
            const refreshUser = {
                ...data,
                access_token: res.data.data.access_token
            };
            dispatch(setUserInfo({user: refreshUser, login: true}));
            config.headers["token"] = `Bearer ${res.data.data.access_token}`;
        };
        return config;
    }, e => {
        return Promise.reject(e);
    });


    //STATE CHỨA API ĐỊA CHỈ - ĐỊA CHỈ CHỌN TỪ SELECT
    const [cityList, setCityList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);
    const [city, setCity] = useState(null);
    const [district, setDistrict] = useState(null);
    const [ward, setWard] = useState(null);
    const [street, setStreet] = useState(null);


    //STATE CHỨA LIST VAI TRÒ VÀ DANH MỤC DỊCH VỤ
    const [roleList, setRoleList] = useState([]);


    //STATE CHỨA THÔNG TIN ẢNH
    const [localPath, setLocalPath] = useState(null);
    const [file, setFile] = useState(null);


    //KHAI BÁO ANTD, STATE LOADING
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);


    //LẤY THÔNG TIN NHÂN VIÊN KHI CHỌN Ở DATATABLE
    const {state} = useLocation();
    let user;
    if(state) user = state.record;


    //KHỞI TẠO GIÁ TRỊ CHO CHỨC NĂNG SỬA
    const initialValues = {
        role_id: user ? user.role_id : null,
        fullname: user ? user.fullname : null,
        dob: user ? dayjs(user.dob, 'YYYY-MM-DD') : null,
        gender: user ? user.gender : 1,
        phone: user ? user.phone : null,
        degree: user && user.degree ? user.degree : null,
        start_date: user && user.start_date ? dayjs(user.start_date, 'YYYY-MM-DD') : null,
        street: user && user.street ? user.street : null,
        ward: user && user.ward ? user.ward : null,
        district: user && user.district ? user.district : null,
        city: user && user.city ? user.city : null,
        email: user ? user.email : null,
        password: user ? user.password : null
    };


    //XỬ LÝ LẤY CÁC QUẬN/HUYỆN THEO THÀNH PHỐ
    const getDistrictsByCity = async(city_code) => {
        const res = await locationAPI.getAllDistricts();
        setDistrictList(res.data.filter(data => {
            return data.province_code === city_code;
        }));
    };


    //XỬ LÝ LẤY CÁC PHƯỜNG/XÃ THEO QUẬN/HUYỆN
    const getWardsByDistrict = async(district_code) => {
        const res = await locationAPI.getAllWards();
        setWardList(res.data.filter(data => {
            return data.district_code === district_code;
        }));
    };


    //CALL API
    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});

        const getAllRoles = async() => {
            const res = await roleAPI.getAll(accessToken, axiosJWT);
            setRoleList(res.data.data.filter(role => {
                return role.role_id !== 1;
            }));
        }
        const getAllCities = async() => {
            const res = await locationAPI.getAllCities();
            setCityList(res.data);
        };

        getAllRoles();
        getAllCities();

        if(city) {
            getDistrictsByCity();
            getWardsByDistrict();
        };

        if(user && user.avatar) {
            setLocalPath(user.avatar);
        };
    }, []);


    //XỬ LÝ CHỌN ẢNH TỪ MÁY
    const handleChooseAvatar = async(e) => {
        const file = e.target.files[0];
        if(file) {
            if(file.size <= 5242880) {
                const compressedFile = await CommonUtils.compressImage(file);
                setFile(compressedFile);
                setLocalPath(URL.createObjectURL(compressedFile));
            }
            else {
                const size = Math.round(((file.size / 1024)/1024) * 100) / 100;
                toast.error(`Kích thước ${size}MB vượt quá giới hạn`);
            };
        };
    };


    //XỬ LÝ XÓA AVATAR
    const handleDeleteAvatar = () => {
        setLocalPath(null);
        setFile(null);
        toast.success("Xóa thành công");
    };


    //XỬ LÝ TẠO MỚI NHÂN VIÊN
    const handleCreateUser = async(values) => {
        let url;

        if(file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "user_avatar");

            const res = await imageAPI.uploadImageToCloud(formData);
            if(res.status === 200) url = res.data.secure_url;
        };

        const userInfo = {
            role_id: values.role_id,
            fullname: values.fullname,
            avatar: url,
            dob: values.dob,
            gender: values.gender,
            phone: values.phone,
            degree: values.degree,
            start_date: values.start_date,
            street: street,
            ward: ward,
            district: district,
            city: city,
            email: values.email,
            password: values.password
        };

        setIsLoading(true);
        const res = await employeeAPI.create(userInfo, accessToken, axiosJWT);
        setIsLoading(false);
        if(res.data.errCode === 0) {
            toast.success("Thêm thành công");
            url = null;
            handleResetState();
            form.resetFields();
        }
        else if(res.data.errCode === 2) {
            toast.error("Email đã thuộc về người dùng khác");
        }
        else { //errCode === 5
            toast.error("Thêm thất bại");
        };
    };


    //XỬ LÝ CẬP NHẬT NHÂN VIÊN
    const handleUpdateUser = async(values) => {
        let url;

        if(file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "user_avatar");

            const res = await imageAPI.uploadImageToCloud(formData);
            if(res.status === 200) url = res.data.secure_url;
        };

        const userInfo = {
            role_id: values.role_id,
            fullname: values.fullname,
            avatar: url ? url : localPath ? user.avatar : null,
            dob: values.dob,
            gender: values.gender,
            phone: values.phone,
            degree: values.degree,
            start_date: values.start_date,
            street: street ? street : values.street,
            ward: ward ? ward : values.ward,
            district: district ? district : values.district,
            city: city ? city : values.city,
            email: values.email
        };

        setIsLoading(true);
        const res = await employeeAPI.update(userInfo, user.user_id, accessToken, axiosJWT);
        setIsLoading(false);
        if(res.data.errCode === 0) {
            toast.success("Cập nhật thành công");
        }
        else if(res.data.errCode === 2) {
            toast.error("Email đã thuộc về người dùng khác");
        }
        else { //errCode === 1 || errCode === 5
            toast.error("Cập nhật thất bại");
        };
    };


    //XỬ LÝ SUBMIT FORM
    const handleSubmit = (values) => {
        let resultCheckAge = CommonUtils.checkEmployeeAge(values.dob.$d);
        let resultCheckPhone = CommonUtils.checkPhoneNumber(values.phone);
        let resultCheckPassword;

        if(resultCheckAge) {
            if(resultCheckPhone) {
                if(user === undefined) {
                    resultCheckPassword = CommonUtils.checkPasswordLength(values.password);
                };
                if(resultCheckPassword || user) {
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
                    .then((result) => {
                        if (result.isConfirmed) {
                            if(user) {
                                handleUpdateUser(values);
                            }
                            else {
                                handleCreateUser(values);
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
        }
        else {
            toast.error("Nhân viên chưa đủ 18 tuổi");
        };
    };


    //XỬ LÝ SET LẠI GIÁ TRỊ CHO STATE
    const handleResetState = () => {
        setLocalPath(null);
        setFile(null);
        setStreet(null);
        setWard(null);
        setDistrict(null);
        setCity(null);
    };


    return (
        <AnimatedPage>
            <Spin tip="Đang tải..." spinning={isLoading}>
                <div className="container-fluid pt-4">
                    <div className="row bg-light rounded mx-0 mb-4">
                        <div className="col-md">
                            <div className="rounded p-4 bg-secondary">
                                <div className="row mb-2">
                                    <div className="col-md">
                                        <Link to="/quan-ly-nhan-vien" className="text-decoration-none text-primary">
                                            <small><FontAwesomeIcon icon={faChevronLeft}/> Quay lại</small>
                                        </Link>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    {
                                        user
                                        ?
                                        <span className="fs-5 fw-bold">Cập nhật thông tin</span>
                                        :
                                        <span className="fs-5 fw-bold">Thêm nhân viên</span>
                                    }
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md d-flex align-items-center flex-wrap">
                                        {
                                            localPath
                                            ? 
                                            <img
                                                className="user-avatar rounded"
                                                src={localPath}
                                                alt=""
                                            />
                                            :
                                            <div className="user-avatar border border-1 d-flex justify-content-center align-items-center rounded">
                                                <small>Chưa có ảnh</small>
                                            </div>
                                        }
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="avatar"
                                            hidden
                                            onChange={handleChooseAvatar}
                                        />
                                        <label className="btn btn-light btn-choose-avatar mx-2" htmlFor="avatar">Chọn</label>
                                        {
                                            localPath
                                            ?
                                            <Popconfirm title="Bạn có muốn xóa ảnh?" cancelText="Hủy" okText="Xóa" onConfirm={handleDeleteAvatar}>
                                                <Button className="me-2">Xóa</Button>
                                            </Popconfirm>
                                            :
                                            <></>
                                        }
                                        <small className="avatar-size-note">Kích thước ảnh tối đa 5MB (JPEG hoặc PNG)</small>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        <Form
                                            form={form}
                                            layout="vertical"
                                            onFinish={handleSubmit}
                                            validateMessages={{
                                                types: {
                                                    email: "Email không đúng định dạng"
                                                }
                                            }}
                                            initialValues={initialValues}
                                        >
                                            <div className="row">
                                                <div className="col-md-4 mt-3">
                                                    <Form.Item
                                                        label="Vai trò"
                                                        name="role_id"
                                                        rules={[{
                                                            required: true,
                                                            message: "Vai trò không được rỗng",
                                                        }]}
                                                    >
                                                        <Select
                                                            placeholder="Chọn vai trò"
                                                            size="large"
                                                            options={
                                                                roleList.map(role => {
                                                                    return {
                                                                        value: role.role_id,
                                                                        label: role.role_name
                                                                    }
                                                                })
                                                            }
                                                        />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-4 mt-3">
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
                                                <div className="col-md-4 mt-3">
                                                    <Form.Item label="Giới tính" name="gender">
                                                        <Radio.Group>
                                                            <Radio value={1}>Nam</Radio>
                                                            <Radio value={0}>Nữ</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4 mt-3">
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
                                                <div className="col-md-4 mt-3">
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
                                                <div className="col-md-4 mt-3">
                                                    <Form.Item label="Bằng cấp" name="degree">
                                                        <Input size="large" placeholder="Bằng cấp"/>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4 mt-3">
                                                    <Form.Item label="Ngày vào làm" name="start_date">
                                                        <DatePicker size="large" placeholder="Ngày làm việc"/>
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-4 mt-3">
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
                                                <div className="col-md-4 mt-3">
                                                    {
                                                        user
                                                        ?
                                                        <Form.Item
                                                            label="Mật khẩu"
                                                            name="password"
                                                        >
                                                            <Input.Password
                                                                size="large"
                                                                placeholder="Bạn không thể đổi mật khẩu"
                                                                visibilityToggle={false}
                                                                disabled
                                                            />
                                                        </Form.Item>
                                                        :
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
                                                    }
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4 mt-3">
                                                    <Form.Item label="Thành phố/tỉnh" name="city">
                                                        <Select
                                                            placeholder="Chọn thành phố/tỉnh"
                                                            size="large"
                                                            showSearch
                                                            options={
                                                                cityList.map(data => {
                                                                    return {
                                                                        value: data.name,
                                                                        label: data.name,
                                                                        code: data.code
                                                                    }
                                                                })
                                                            }
                                                            onChange={(value, obj) => {
                                                                setCity(value);
                                                                getDistrictsByCity(obj.code);
                                                            }}
                                                        />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-2 mt-3">
                                                    <Form.Item label="Quận/huyện" name="district">
                                                        <Select
                                                            placeholder="Chọn quận/huyện"
                                                            size="large"
                                                            showSearch
                                                            options={
                                                                districtList.map(data => {
                                                                    return {
                                                                        value: data.name,
                                                                        label: data.name,
                                                                        code: data.code
                                                                    }
                                                                })
                                                            }
                                                            onChange={(value, obj) => {
                                                                setDistrict(value);
                                                                getWardsByDistrict(obj.code);
                                                            }}
                                                            disabled={city || (user && user.city) ? false : true}
                                                        />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-2 mt-3">
                                                    <Form.Item label="Phường/xã" name="ward">
                                                        <Select
                                                            placeholder="Chọn phường/xã"
                                                            size="large"
                                                            showSearch
                                                            options={
                                                                wardList.map(data => {
                                                                    return {
                                                                        value: data.name,
                                                                        label: data.name,
                                                                        code: data.code
                                                                    }
                                                                })
                                                            }
                                                            onChange={value => setWard(value)}
                                                            disabled={district || (user && user.district) ? false : true}
                                                        />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-4 mt-3">
                                                    <Form.Item label="Số nhà và tên đường" name="street">
                                                        <Input
                                                            size="large"
                                                            placeholder="Số nhà và tên đường"
                                                            onChange={e => setStreet(e.target.value)}
                                                            disabled={ward || (user && user.ward) ? false : true}
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <Button htmlType="submit" className="btn-primary px-4 me-2">LƯU THÔNG TIN</Button>
                                                <Button htmlType="reset" className="px-4">RESET</Button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </AnimatedPage>
    );
};