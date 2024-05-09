import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import ContactPage from './pages/contact';
import BookPage from './pages/book';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Register from './pages/register';
import Login from './pages/login';
import { callFetchAccount } from './services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doGetAccountAction } from './redux/account/accountSlice';
import Loading from './components/Loading/index.jsx';
import NotFound from './components/NotFound/index.jsx';
import AdminPage from './pages/admin/index.jsx';
import ProtectedRoute from './components/ProtectedRoute/index.jsx';
import LayoutAdmin from './components/Admin/LayoutAdmin.jsx';
import OrderPage from './pages/order/index.jsx';
import TableUser from './components/Admin/User/TableUser.jsx';
import InputSearch from './components/Admin/User/InputSearch.jsx';
import TableBook from './components/Admin/Book/TableBook.jsx';
import './styles/global.scss'

const Layout = () => {
  return (
    <div className='layout-app'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}


export default function App() {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);
  const isLoading = useSelector(state => state.account.isLoading);

  const getAccount = async () => {
    if (window.location.pathname === '/login'
      || window.location.pathname === '/register'
      // || window.location.pathname === '/'
    ) return;
    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data));
    }
  }

  useEffect(() => {
    getAccount();
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book/:slug",
          element: <BookPage />,
        },
        {
          path: "order",
          element:
            <OrderPage />
          ,
        },
      ],
    },

    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },

    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
        },
        {
          path: "user",
          element:
            <ProtectedRoute>
              <TableUser />
            </ProtectedRoute>,
        },
        {
          path: "book",
          element: <ProtectedRoute>
            <TableBook />
          </ProtectedRoute>
          ,
        },
      ],
    },

  ]);
  return (
    <>
      {isLoading === false || window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/' ?
        <RouterProvider router={router} />
        :
        <Loading />
      }
    </>
  )
}
