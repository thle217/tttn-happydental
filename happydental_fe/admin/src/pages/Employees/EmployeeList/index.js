import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import DataTable from "../../../components/DataTable";
import employeeAPI from "../../../services/employeeAPI";
import roleAPI from "../../../services/roleAPI";

export default function EmployeeList({ accessToken }) {


    //KHAI BÁO BIẾN
    const [roleList, setRoleList] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchList, setSearchList] = useState(null);
    const [keyword, setKeyword] = useState("");


    //XỬ LÝ LẤY TẤT CẢ NHÂN VIÊN
    const getAllEmployees = async() => {
        setIsLoading(true);
        const res = await employeeAPI.getAll(accessToken);
        setEmployeeList(res.data.data);
        setIsLoading(false);
    };


    //CALL API
    useEffect(() => {
        const getAllRoles = async() => {
            const res = await roleAPI.getAll(accessToken);
            setRoleList(res.data.data.filter(role => {
                return role.role_id !== 1;
            }));
        };

        getAllRoles();
        getAllEmployees();
    }, []);


    //ĐỊNH DẠNG DATATABLE
    const detailsPage = "/chi-tiet-nhan-vien"
    const columns = [
        {
            title: "ID",
            dataIndex: "user_id",
        },
        {
            title: "Ảnh đại diện",
            dataIndex: "avatar",
            render: (text, record) => (
                record.avatar
                ?
                <img
                    src={record.avatar}
                    alt=""
                    className="datatable-avatar rounded"
                />
                :
                <div className="datatable-avatar border rounded d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faImage} size="lg" className="text-gray" />
                </div>
            )
        },
        {
            title: "Vai trò",
            dataIndex: "role_id",
            render: (value) => (
                value === 2 ? "Quản trị viên" :
                value === 3 ? "Lễ tân" :
                value === 4 ? "Bác sĩ" : "Phụ tá"
            )
        },
        {
            title: "Họ và tên",
            dataIndex: "fullname",
        },
        {
            title: "Ngày sinh",
            dataIndex: "dob",
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            render: (value) => (
                value === 0 ? "Nữ" : "Nam"
            )
        },
        {
            title: "Email",
            dataIndex: "email",
        },
    ];


    //XỬ LÝ LỌC NHÂN VIÊN THEO VAI TRÒ
    const handleFilterList = (role_id) => {
        if(role_id === 0) {
            setSearchList(null);
        }
        else {
            const list = employeeList.filter(employee => {
                return employee.role_id === role_id;
            });
            setSearchList(list);
        };
    };


    //XỬ LÝ TÌM NHÂN VIÊN THEO TÊN
    const handleSearchByName = () => {
        if(keyword) {
            const list = employeeList.filter(employee => {
                return employee.fullname.toLowerCase().includes(keyword.toLowerCase());
            });
            setSearchList(list);
            setKeyword("");
        };
    };


    //XỬ LÝ XÓA NHÂN VIÊN
    const handleDeleteEmployee = async(record) => {
        const res = await employeeAPI.delete(record.user_id, accessToken);
        if(res.data.errCode === 0) {
            toast.success("Xóa thành công");
            getAllEmployees();
        }
        else {
            toast.error("Xóa thất bại");
        };
    };


    //XỬ LÝ ENTER KHI TÌM THEO TÊN
    const handleEnter = (e) => {
        if(e.keyCode === 13) {
            handleSearchByName();
        };
    };
    

    return (
        <div className="container-fluid pt-4">
            <div className="row bg-light rounded mx-0 mb-4">
                <div className="col-md">
                    <div className="rounded p-4 bg-secondary mb-4">
                        <div className="row">
                            <div className="col-md">
                                <span className="text-dark page-title">QUẢN LÝ NHÂN VIÊN</span>
                                <Link to="/chi-tiet-nhan-vien">
                                    <Button className="btn-add btn-primary px-4">THÊM MỚI</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="rounded p-4 bg-secondary">
                        <div className="row mb-5">
                            <div className="col-md-6">
                                <small className="me-4 filter-input-title">Tìm theo vai trò</small>
                                <Select
                                    className="filter-input w-50"
                                    placeholder="Chọn vai trò"
                                    size="large"
                                    options={
                                        [
                                            {
                                                value: 0,
                                                label: "Hiển thị tất cả",
                                                className: "text-primary"
                                            },
                                            ...roleList.map(role => {
                                                return {
                                                    value: role.role_id,
                                                    label: role.role_name
                                                }
                                            })
                                        ]
                                    }
                                    onChange={value => handleFilterList(value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex align-items-center">
                                    <small className="me-4 search-input-title">Tìm theo tên</small>
                                    <div className="input-group search-input w-75">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập tên nhân viên"
                                            value={keyword}
                                            onChange={e => setKeyword(e.target.value)}
                                            onKeyUp={handleEnter}
                                        />
                                        <Button onClick={handleSearchByName}>Tìm</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <div className="table-responsive">
                                    <DataTable
                                        columns={columns}
                                        list={searchList ? searchList : employeeList}
                                        handleDelete={handleDeleteEmployee}
                                        detailsPage={detailsPage}
                                        isLoading={isLoading}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};