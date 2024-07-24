import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Product from '../Product/Product';
function Products(props) {

    // let [errorcategory,seterrorcategory]=useState('');
    let [productdata,setproductdata]=useState([]);
    let [isloading,setisloading]=useState(false);

    useEffect(()=>{
        getproducts()

    },[])
    async function getproducts(){
        setisloading(true)
        let response=await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`)
       
        if(response){
            setproductdata(response.data.data)
        // settotalprice(response.data.data.totalCartPrice)
        // setnumberofitem(response.data.numOfCartItems)

        }
        // console.log(cartdata)
        // console.log(response)
        // console.log(response.data.data.products)
        // console.log(response.data.data)
        setisloading(false)

    }
    return (
        <>
        {isloading?  <div
                 className=" maincolor loading position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center">
                 <i className="fa fa-spinner fa-spin fa-5x"></i>
             </div>: 
             <>
     <div className="container my-5">
                <div className="row">
                    {productdata?.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
                </div>
            </div>
        </> }
        </>




        
    );
}

export default Products;