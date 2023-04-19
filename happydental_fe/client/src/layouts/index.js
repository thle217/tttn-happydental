import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

export function MainLayout({ children }) {
    return (
        <>
            <Topbar/>
            <Navbar/>
            {children}
            <Footer/>
        </>
    );
};