import React, { useContext, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { Usercontext } from '../../Context/Usercontext';
import { Toaster } from 'react-hot-toast';


 function Layout() {

    let {setusertoken}= useContext(Usercontext);
    useEffect(()=>{
     if(localStorage.getItem('usertokenlocal')!==null){
      setusertoken(localStorage.getItem('usertokenlocal'))
      }

    },[]);


    return <>
       <Navbar/>
           <Outlet></Outlet>
           <Toaster/>

       <Footer/> 
       </>     
}
export default Layout;