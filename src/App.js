import './App.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./layout/Layout"
import Explore from './pages/Explore'
import ForgotPassword from './pages/ForgotPassword'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import PrivateRoutes from './Components/PrivateRoutes';
import Category from './pages/Category';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <div>No Such Route Exists!!!</div>,
    children: [
      {
        index: true,
        element: <Explore />,
      },
      {
        path: 'offers',
        element: <Offers />
      },
      {
        path: 'profile',
        element: <PrivateRoutes />,
        children: [
          {
            index: true,
            element: <Profile />
          }
        ]
      },
      {
        path: 'category/:categoryName',
        element: <Category />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "/sign-in",
        element: <SignIn />
      },
      {
        path: "/sign-up",
        element: <SignUp />
      },
    ],

  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />


      {/* Protected Routes for older react-router-dom */}
      {/* <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
        </Route> */}


    </div>
  );
}

export default App;
