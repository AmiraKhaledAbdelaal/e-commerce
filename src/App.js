import { createBrowserRouter ,RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Cart from './Components/Cart/Cart';
import Notfound from './Components/Notfound/Notfound';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Logout from './Components/Logout/Logout'
import Wishlist from './Components/Wishlist/Wishlist';
import Products from './Components/Products/Products';
import Categors from './Components/Categors/Categors';
import Brands from './Components/Brands/Brands'
import Usercontextprovider from './Context/Usercontext';
import Protectedrouter from './Components/Protectedrouter/Protectedrouter';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Cartcontextprovider from './Context/Cartcontext';

 let routers = createBrowserRouter([
  {path:'/' , element:<Layout/>, children:[
    {index:'true', element:<Protectedrouter><Home/></Protectedrouter>},
    {path:'home', element:<Protectedrouter><Home/></Protectedrouter>},
    {path:'cart', element:<Protectedrouter><Cart/></Protectedrouter>},
    {path:'wishlist', element:<Protectedrouter><Wishlist/></Protectedrouter>},
    {path:'Products', element:<Protectedrouter><Products/></Protectedrouter>},
    {path:'Categors', element:<Protectedrouter><Categors/></Protectedrouter>},
    {path:'Brands', element:<Protectedrouter><Brands/></Protectedrouter>},
    
    {path:'login', element:<Login/>},
    {path:'Register', element:<Register/>}, 
    {path:'Logout', element:<Logout/>}, 
    {path:'ProductDetails/:id',element:<Protectedrouter><ProductDetails/></Protectedrouter>},
    {path:'*', element:<Notfound/>},
  ]}
 ])

 export default function App() {


 return <Cartcontextprovider>
    <Usercontextprovider>
          <RouterProvider router={routers}></RouterProvider>
          
    </Usercontextprovider>
    </Cartcontextprovider>


  
}

