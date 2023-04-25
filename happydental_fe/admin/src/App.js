import "./assets/scss/bootstrap.min.scss";
import "./assets/scss/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, adminRoutes, receptionistRoutes, doctorRoutes, assistantRoutes } from "./routes";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { MainLayout } from "./layouts";

function App() {

    //KIỂM TRA ĐĂNG NHẬP VÀ PHÂN QUYỀN
    const isLogin = useSelector(state => state.user.login);
    const user = useSelector(state => state.user.user);
    let employeeRoutes = [];

    if(isLogin) {
        if(user.role_id === 2) employeeRoutes = adminRoutes;
        else if(user.role_id === 3) employeeRoutes = receptionistRoutes;
        else if(user.role_id === 4) employeeRoutes =  doctorRoutes;
        else employeeRoutes = assistantRoutes;
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    {
                        isLogin
                        ?
                        employeeRoutes.map((route, index) => {
                            let Page = route.page;
                            return (
                                <Route
                                    path={route.path}
                                    element={
                                        <MainLayout>
                                            <Page accessToken={user.access_token}/>
                                        </MainLayout>
                                    }
                                    key={index}/>
                            );
                
                        })
                        :
                        publicRoutes.map((route, index) => {
                            let Page = route.page;
                            return (
                                <Route
                                    path={route.path}
                                    element={<Page/>}
                                    key={index}
                                />
                            );
                        })
                    }
                </Routes>
                <Toaster />
            </div>
        </Router>
    );
}
export default App;  