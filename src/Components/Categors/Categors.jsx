import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Categors(props) {

    let [categorydata,setcategorydata]=useState([])
    let [isloading,setisloading]=useState(false)
    // let[branddetailss,setbranddetailss]=useState('')
    // let [errorcategory,seterrorcategory]=useState('');

    useEffect(()=>{
        datacategory()

    },[])
    async function datacategory(){
        setisloading(true);
        let {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`) 
        if(data){
            setcategorydata(data.data)
            // console.log(data.data)
        }
        setisloading(false);
    }
    return (
        <>
        {isloading?<div
            className=" maincolor loading position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center">
            <i className="fa fa-spinner fa-spin fa-5x"></i>
        </div>:
        <>
        <div className="container py-5 ">
            <div className="row py-5">
                {categorydata?.map((product)=>{
                  return  <div key={product._id} className="categoryitem col-md-4 my-3 rounded-2 px-0 ">
                        <div className='categoryimg overflow-hidden w-100'>
                            <img className='categoryimg w-100' src={product.image} alt="" />
                        </div>
                        <div>
                            <h3 className='text-center py-2'>{product.name}</h3>
                        </div>

                    </div>
                })}
                
            </div>
        </div>
      
        </>
     
        }
</>
    );
}

export default Categors;
