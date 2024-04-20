import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import { useSelector } from "react-redux";


const LayoutAdmin = () => {

    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const user = useSelector(state => state.account.user);
    const userRole = user.role;
    return (
        <div className='layout-app'>
            {isAdminRoute && userRole === 'ADMIN' && <Header />}
            {/* <Header /> */}
            <Outlet />
            {/* <Footer /> */}
            {isAdminRoute && userRole === 'ADMIN' && <Footer />}
        </div>
    )
}

export default LayoutAdmin
