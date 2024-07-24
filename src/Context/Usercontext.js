import { createContext, useState } from "react";

export let Usercontext= createContext();


export default function Usercontextprovider(props){
    let [usertoken , setusertoken] =useState(null);
    return <Usercontext.Provider value={{usertoken,setusertoken}}>
     {props.children}
    </Usercontext.Provider>
}