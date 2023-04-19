import Report from "../pages/Reports";
import Login from "../pages/Login";
import NotFound from "../components/NotFound";
import { ForgetPassword, ResetPassword } from "../pages/ForgetPassword";
import Account from "../pages/Account";
import EmployeeList from "../pages/Employees/EmployeeList";
import EmployeeDetails from "../pages/Employees/EmployeeDetails";
import CustomerList from "../pages/Customers/CustomerList";
import CustomerDetails from "../pages/Customers/CustomerDetails";
import Categories from "../pages/Categories";


export const publicRoutes = [
    {
        path: "/",
        page: Login
    },
    {
        path: "/quen-mat-khau",
        page: ForgetPassword
    },
    {
        path: "/dat-lai-mat-khau",
        page: ResetPassword
    },
    {
        path: "*",
        page: NotFound
    }
];


export const adminRoutes = [
    {
        path: "/",
        page: Report
    },
    {
        path: "/tai-khoan",
        page: Account
    },
    {
        path: "/quan-ly-nhan-vien",
        page: EmployeeList
    },
    {
        path: "/chi-tiet-nhan-vien",
        page: EmployeeDetails
    },
    {
        path: "/quan-ly-khach-hang",
        page: CustomerList
    },
    {
        path: "/chi-tiet-khach-hang",
        page: CustomerDetails
    },
    {
        path: "/quan-ly-danh-muc-dich-vu",
        page: Categories
    },
    {
        path: "*",
        page: NotFound
    }
];

export const receptionistRoutes = [
    {
        path: "/",
        page: Report
    },
    {
        path: "/tai-khoan",
        page: Account
    },
    {
        path: "/quan-ly-khach-hang",
        page: CustomerList
    },
    {
        path: "/chi-tiet-khach-hang",
        page: CustomerDetails
    },
    {
        path: "*",
        page: NotFound
    }
];

export const doctorRoutes = [
    {
        path: "/",
        page: Report
    },
    {
        path: "/tai-khoan",
        page: Account
    },
    {
        path: "*",
        page: NotFound
    }
];

export const assistantRoutes = [
    {
        path: "/",
        page: Report
    },
    {
        path: "/tai-khoan",
        page: Account
    },
    {
        path: "*",
        page: NotFound
    }
];