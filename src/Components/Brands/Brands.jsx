import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';

function Brands(props) {
    let [branddata,setbranddata]=useState([])
    let [isloading,setisloading]=useState(false)
    // let[branddetailss,setbranddetailss]=useState('')
    // let [errorcategory,seterrorcategory]=useState('');

    useEffect(()=>{
        databrands()

    },[])
    async function databrands(){
        setisloading(true);
        let {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`) 
        if(data){
            setbranddata(data.data)
            console.log(data.data)
        }
        setisloading(false);
    }

    // async function branddetailss(brandid){
    //     let {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands/${brandid}`)
    //     // .catch((err)=>{
    //     //     seterrorcategory(err.response.data.message)
    //     //     console.log(err.response.data.message)
    //     // })
    //     if(data){
    //         setbranddetailss(data)
    //         console.log(data)

    //     }
    // }
    return (
        <>
                {isloading?<div
                    className=" maincolor loading position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center">
                    <i className="fa fa-spinner fa-spin fa-5x"></i>
                </div>:
                <>
                    <div className="container ">
                        <h1 className='maincolor text-center mt-5  py-5'>All Brands</h1>
                        <div className="row g-4">
                        
                            {branddata?.map((product)=>{
                            return <div key={product._id} className="col-md-3 brand cursor-pointer g-3">
                                           
                                            <div className='border-1 rounded-2 px-5 g-4'>
                                                    <img className='w-100' src={product.image} alt={product.name} />
                                                    <p className='text-center py-4'>{product.name}</p>
                                                    
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

export default Brands;