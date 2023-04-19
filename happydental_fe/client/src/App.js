import './assets/scss/bootstrap.min.scss';
import './assets/scss/style.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Toaster } from "react-hot-toast";
import { publicRoutes, privateRoutes } from './routes';
import { MainLayout } from './layouts';

function App() {

    //KIỂM TRA ĐĂNG NHẬP
    const isLogin = useSelector(state => state.user.login);
    let webRoutes = publicRoutes;
    if(isLogin) webRoutes = privateRoutes;

    return (
        <Router>
            <div className="App">
                <Routes>
                    {
                        webRoutes.map((route, index) => {
                            const Page = route.page;
                            let Layout = MainLayout;

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        route.is404Page
                                        ?
                                        <Page/>
                                        :
                                        <Layout><Page/></Layout>
                                    }
                                />
                            );
                        })
                    }
                </Routes>
                <Toaster/>
            </div>
        </Router>
    );
}

export default App;