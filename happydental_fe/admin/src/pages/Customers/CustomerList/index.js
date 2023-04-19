import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import DataTable from "../../../components/DataTable";
import customerAPI from "../../../services/customerAPI";

export default function CustomerList({ accessToken }) {


    //KHAI BÁO BIẾN
    const [customerList, setCustomerList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchList, setSearchList] = useState(null);
    const [keyword, setKeyword] = useState("");


    //XỬ LÝ LẤY TẤT CẢ KHÁCH HÀNG
    const getAllCustomers = async() => {
        setIsLoading(true);
        const res = await customerAPI.getAll(accessToken);
        setCustomerList(res.data.data);
        setIsLoading(false);
    };


    //CALL API
    useEffect(() => {
        getAllCustomers();
    }, []);


    //ĐỊNH DẠNG DATATABLE
    const detailsPage = "/chi-tiet-khach-hang"
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
            title: "Trạng thái",
            dataIndex: "is_verified",
            render: (value) => (
                value === 1
                ?
                <span className="text-success">Đã xác minh</span>
                :
                <span className="text-danger">Chưa xác minh</span>
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


    //XỬ LÝ LỌC KHÁCH HÀNG THEO TRẠNG THÁI
    const handleFilterList = (is_verified) => {
        if(is_verified === -1) {
            setSearchList(null);
        }
        else {
            const list = customerList.filter(customer => {
                return customer.is_verified === is_verified;
            });
            setSearchList(list);
        };
    };


    //XỬ LÝ TÌM KHÁCH HÀNG THEO TÊN
    const handleSearchByName = () => {
        if(keyword) {
            const list = customerList.filter(customer => {
                return customer.fullname.toLowerCase().includes(keyword.toLowerCase());
            });
            setSearchList(list);
            setKeyword("");
        };
    };


    //XỬ LÝ XÓA KHÁCH HÀNG
    const handleDeleteCustomer = async(record) => {
        const res = await customerAPI.delete(record.user_id, accessToken);
        if(res.data.errCode === 0) {
            toast.success("Xóa thành công");
            getAllCustomers();
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
                                <span className="text-dark page-title">QUẢN LÝ KHÁCH HÀNG</span>
                                <Link to="/chi-tiet-khach-hang">
                                    <Button className="btn-add btn-primary px-4">THÊM MỚI</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="rounded p-4 bg-secondary">
                        <div className="row mb-5">
                            <div className="col-md-6">
                                <small className="me-4 filter-input-title">Tìm theo trạng thái</small>
                                <Select
                                    className="filter-input w-50"
                                    placeholder="Chọn trạng thái"
                                    size="large"
                                    options={
                                        [
                                            {
                                                value: -1,
                                                label: "Hiển thị tất cả",
                                                className: "text-primary"
                                            },
                                            {
                                                value: 1,
                                                label: "Đã xác minh"
                                            },
                                            {
                                                value: 0,
                                                label: "Chưa xác minh"
                                            }
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
                                            placeholder="Nhập tên khách hàng"
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
                                        list={searchList ? searchList : customerList}
                                        handleDelete={handleDeleteCustomer}
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