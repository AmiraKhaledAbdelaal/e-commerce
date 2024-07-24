import React from 'react';
import {Navigate } from 'react-router-dom';

function Protectedrouter(props) {
    // let navigate =useNavigate()
    if(localStorage.getItem('usertokenlocal')){
    return props.children

    }else{
        return <Navigate to={'/login'}/>

    }
    // return <>
    // protected route
    // </>
    
}

export default Protectedrouter;