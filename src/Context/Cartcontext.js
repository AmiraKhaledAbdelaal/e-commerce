import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
export let Cartcontext=createContext()

export default function Cartcontextprovider(props){
    let [numofitem,setnum]= useState(0)
    function addcart(id){
        return  axios.post(` https://route-ecommerce.onrender.com/api/v1/cart`,{
            productId:id
        },{
            headers:{
                token:localStorage.getItem('usertokenlocal')
            }
        }).then((response)=>{
            setnum(response.data.numOfCartItems)
            console.log(numofitem)
            console.log (response.data.numOfCartItems)
            return response
        })
            .catch((error)=>error)
}
return <Cartcontext.Provider value={{ addcart ,numofitem,setnum }}>
     {props.children}
    </Cartcontext.Provider>
}