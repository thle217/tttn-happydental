import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Button, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { setData } from "../../slices/dataSlice";

export default function DataTable(props) {

    const dispatch = useDispatch();

    //ĐỊNH DẠNG COLUMN
    const columns = [
        ...props.columns,
        {
            title: "Xóa",
            dataIndex: "",
            align: "center",
            render: (_, record) => (
                <Popconfirm title="Bạn có muốn xóa?" cancelText="Hủy" okText="Xóa" onConfirm={() => props.handleDelete(record)}>
                    <Button className="bg-light">
                        <FontAwesomeIcon icon={faTrashAlt} className="text-dark"/>
                    </Button>
                </Popconfirm>
            )
        },
        props.isOnePage
        ?
        {
            title: "Xem",
            dataIndex: "",
            align: "center",
            render: (_, record) => (
                <Button
                    className="bg-light"
                    onClick={() => dispatch(setData(record))}
                >
                    <FontAwesomeIcon icon={faEdit} className="text-dark"/>
                </Button>
            )
        }
        :
        {
            title: "Xem",
            dataIndex: "",
            align: "center",
            render: (_, record) => (
                <Link to={`${props.detailsPage}`} state={{ record }}>
                    <Button className="bg-light">
                        <FontAwesomeIcon icon={faEdit} className="text-dark"/>
                    </Button>
                </Link>
            )
        }
    ];

    
    return (
        <Table
            columns={columns}
            dataSource={props.list}
            rowKey={columns[0].dataIndex} //prop key
            loading={props.isLoading}
        />
    );
};