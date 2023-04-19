import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Select, Modal, Form, Input, Radio, Spin } from "antd";
import toast from "react-hot-toast";
import DataTable from "../../components/DataTable";
import categoryAPI from "../../services/categoryAPI";
import { setData } from "../../slices/dataSlice";
import Swal from "sweetalert2";

export default function Categories({ accessToken }) {


    //KHAI BÁO BIẾN
    const [categoryList, setCategoryList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchList, setSearchList] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [form] = Form.useForm();
    const data = useSelector(state => state.data);
    const dispatch = useDispatch();


    //XỬ LÝ LẤY TẤT CẢ DANH MỤC DỊCH VỤ
    const getAllCategories = async() => {
        setIsLoading(true);
        const res = await categoryAPI.getAll(accessToken);
        setCategoryList(res.data.data);
        setIsLoading(false);
    };


    //CALL API
    useEffect(() => {
        if(data.category_id) {
            form.setFieldsValue({
                category_name: data.category_name,
                status: data.status
            });
            setIsOpen(true);
        };
        getAllCategories();
    }, [data, form]);


    //ĐỊNH DẠNG DATATABLE
    const columns = [
        {
            title: "ID",
            dataIndex: "category_id",
        },
        {
            title: "Tên danh mục",
            dataIndex: "category_name",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: (text, record) => (
                record.status === 1
                ?
                <span className="text-success">Đang hoạt động</span>
                :
                <span className="text-danger">Ngưng hoạt động</span>
            )
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
        },
    ];


    //XỬ LÝ LỌC DANH MỤC THEO TRẠNG THÁI
    const handleFilterList = (status) => {
        if(status === -1) {
            setSearchList(null);
        }
        else {
            const list = categoryList.filter(category => {
                return category.status === status;
            });
            setSearchList(list);
        };
    };


    //XỬ LÝ TÌM DANH MỤC THEO TÊN
    const handleSearchByName = () => {
        if(keyword) {
            const list = categoryList.filter(category => {
                return category.category_name.includes(keyword.toLowerCase());
            });
            setSearchList(list);
            setKeyword("");
        };
    };


    //XỬ LÝ TẠO MỚI
    const handleCreateCategory = async(values) => {
        setIsLoading(true);
        const res = await categoryAPI.create({
            category_name: values.category_name,
            status: values.status
        }, accessToken);
        setIsLoading(false);

        if(res.data.errCode === 0) {
            toast.success("Thêm thành công");
            form.resetFields();
            getAllCategories();
        }
        else if(res.data.errCode === 2) {
            toast.error("Tên danh mục đã tồn tại");
        }
        else { //errCode === 5
            toast.error("Thêm thất bại");
        };
    };


    //XỬ LÝ CẬP NHẬT
    const handleUpdateCategory = async(values) => {
        setIsLoading(true);
        const res = await categoryAPI.update({
            category_name: values.category_name,
            status: values.status
        }, data.category_id, accessToken);
        setIsLoading(false);

        if(res.data.errCode === 0) {
            toast.success("Cập nhật thành công");
            dispatch(setData({}));
            getAllCategories();
            setIsOpen(false);
        }
        else if(res.data.errCode === 2) {
            toast.error("Tên danh mục đã tồn tại");
        }
        else { //errCode === 1 || errCode === 5
            toast.error("Cập nhật thất bại");
        };
    };


    //XỬ LÝ SUBMIT
    const handleSubmit = (values) => {
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
                if(data.category_id) {
                    handleUpdateCategory(values);
                }
                else {
                    handleCreateCategory(values);
                };
            };
        });
    };


    //XỬ LÝ XÓA DANH MỤC
    const handleDeleteCategory = async(record) => {
        const res = await categoryAPI.delete(record.category_id, accessToken);
        if(res.data.errCode === 0) {
            toast.success("Xóa thành công");
            getAllCategories();
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


    //XỬ LÝ CLICK BUTTON THÊM MỚI
    const handleClickButtonAdd = () => {
        dispatch(setData({}));
        form.setFieldsValue({
            category_name: null,
            status: 1
        });
        setIsOpen(true);
    };


    return (
        <div className="container-fluid pt-4">
            <div className="row bg-light rounded mx-0 mb-4">
                <div className="col-md">
                    <div className="rounded p-4 bg-secondary mb-4">
                        <div className="row">
                            <div className="col-md">
                                <span className="text-dark page-title">QUẢN LÝ DANH MỤC DỊCH VỤ</span>
                                <Button
                                    className="btn-add btn-primary px-4"
                                    onClick={handleClickButtonAdd}
                                >
                                    THÊM MỚI
                                </Button>
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
                                            initialValues={{status: 1}}
                                            onFinish={handleSubmit}
                                        >
                                            <div className="row">
                                                <div className="col-md mt-3">
                                                    <Form.Item
                                                        label="Tên danh mục dịch vụ"
                                                        name="category_name"
                                                        rules={[{
                                                            required: true,
                                                            message: "Tên danh mục dịch vụ không được rỗng"
                                                        }]}
                                                    >
                                                        <Input size="large" placeholder="Tên danh mục dịch vụ"/>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md mt-3">
                                                    <Form.Item label="Trạng thái" name="status">
                                                        <Radio.Group>
                                                            <Radio value={1}>Hoạt động</Radio>
                                                            <Radio value={0}>Ngưng hoạt động</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <Button htmlType="submit" className="btn-primary px-4 me-2">LƯU THÔNG TIN</Button>
                                                <Button htmlType="reset" className="px-4">RESET</Button>
                                            </div>
                                        </Form>
                                    </Spin>
                                </Modal>
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
                                                label: "Đang hoạt động",
                                            },
                                            {
                                                value: 0,
                                                label: "Ngưng hoạt động",
                                            },
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
                                            placeholder="Nhập tên danh mục"
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
                                        list={searchList ? searchList : categoryList}
                                        handleDelete={handleDeleteCategory}
                                        isLoading={isLoading}
                                        isOnePage={true}
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