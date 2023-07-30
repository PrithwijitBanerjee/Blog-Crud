import {BrowserRouter, Routes,Route,Navigate} from 'react-router-dom'
import Home from './Pages/Home';
import About from './Pages/About';
import Student from './Pages/Student';
import Registration from './Authentication/Registration';
import Login from './Authentication/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import AddStudent from './Pages/AddStudent';
import Edit from './Pages/Edit';
import { check_token } from './Redux/LoginSlice';
import { useDispatch } from 'react-redux';
import {useEffect} from 'react'
import MoreProduct from './Pages/MoreProduct';
import AddToCart from './Pages/AddToCart';
import Blog from './Pages/Blog';
import NotFound from './Pages/NotFound'
import CategoryWithBlog from './Pages/CategoryWithBlog';
import BlogDetails from './Pages/BlogDetails';
import SearchedData from './Pages/SearchedData';
import Layout from './Components/Commons/HOCLayout/Layout';
function App() {
  const dispatch=useDispatch();
  const ProtectedRoute=({children}/*All Desendants Components */)=>{ //HOC
    const token=localStorage.getItem('token');
    if(token !== '' && token !== null && token !== undefined)
    {
      return (<>
        {
          children
        }
      </>)
    }else{
      return <Navigate to='/login'/>
    }
  }

  const publicRoutes=[
    {
      path:'/login',
      component:Login,
    },
    {
      path:'/registration',
      component:Registration
    }
  ];

  const privateRoutes=[
    {
      path:'/',
      component:Home
    },
    {
      path:'/about',
      component:About
    },
    {
      path:'/student',
      component:Student
    },
    {
      path:'/addStudent',
      component:AddStudent
    },
    {
      path:'/edit/:id',
      component:Edit
    },
    {
      path:'/moreProduct/:id',
      component:MoreProduct
    },
    {
      path:'/addToCart',
      component:AddToCart
    },
    {
      path:'/blog',
      component:Blog
    },
    {
      path:'/categoryWithBlog/:id',
      component:CategoryWithBlog
    },
    {
      path:'/blogDetails/:id',
      component:BlogDetails
    },
    {
      path:'/search',
      component:SearchedData
    },
    {
      path:'*',
      component:NotFound
    }
  ];
  useEffect(() => {
    dispatch(check_token());
  }, [dispatch]);
  
  return (
    <>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          {
            publicRoutes?.map((route,index)=>{
                const EnhancedPublicComponent=Layout(route?.component); //HOC
                return (<>
                    <Route 
                      key={index?.id}
                      exact path={route?.path}
                      element={<EnhancedPublicComponent description={`${route?.component} component`} title={'React Website'} author={'Rick'} keywords={'meta'}/>}
                    />
                </>)
            })
          }
          {
            privateRoutes?.map((route,index)=>{
                const EnhancedPrivateComponent=Layout(route?.component); //HOC
                return (<>
                    <Route 
                      key={index?.id}
                      exact path={route?.path}
                      element={(<ProtectedRoute><EnhancedPrivateComponent description={`${route?.component} component`} title={'React Website'} author={'Rick'} keywords={'meta'}/></ProtectedRoute>)}
                    />
                </>)
            })
          }
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
