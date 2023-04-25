import Home from "../pages/Home";
import CategoryList from "../pages/CategoryList";
import DoctorList from "../pages/DoctorList";
import Account from "../pages/Account";
import Contact from "../pages/Contact";
import NotFound from "../components/NotFound";

export const publicRoutes = [
    {
        path: "/",
        page: Home,
    },
    {
        path: "/danh-muc-dich-vu",
        page: CategoryList
    },
    {
        path: "/doi-ngu-bac-si",
        page: DoctorList
    },
    {
        path: "/lien-he",
        page: Contact
    },
    {
        path: "*",
        page: NotFound,
        is404Page: true
    }
];

export const privateRoutes = [
    ...publicRoutes,
    {
        path: "/quan-ly-tai-khoan",
        page: Account
    },
];