import axios from 'axios';
import React, {  useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
// import toast from 'react-hot-toast';
import { Cartcontext } from '../../Context/Cartcontext';
function ProductDetails() {
        let {addcart}=useContext(Cartcontext)
        var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const [productsDetails, setProductsDetails] = useState({})
    const [isloading, setisloading] = useState(false)
    let params=useParams()
    useEffect(() => {
        getproductdetails(params.id)
    },[])

    async function addProducttocart(id){
        console.log(id)
        let response = await addcart(id);
        // console.log(response);
        // console.log(id)
            // toast.success('product sucsses added to your cart')
    }
    
    async function getproductdetails(paramsid){
        setisloading(true)
        let {data}= await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${paramsid}`)
        setProductsDetails(data.data)
        console.log(data.data)
        setisloading(false)
    }
    return (
        isloading ? <>
            <div
                className=" maincolor loading position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center">
                <i className="fa fa-spinner fa-spin fa-5x"></i>

            </div>
       </> : <>
       <div className="container pt-5">
           <div className="row mt-5">
               <div className="col-md-4">
                   {/* <img className='w-100' src={productsDetails.imageCover} alt={productsDetails.title} /> */}

                    <Slider {...settings} className='m-3 mb-5'>
                    {productsDetails.images?.map((img,index)=>(

                        <img key={index} className='w-100' src={img} alt={productsDetails.title} />

                    )) }
                  
                    </Slider>
               </div>
               <div className="col-md-8 d-flex align-items-center p-5 ">
                       <div className='w-100'>
                           <h1>{productsDetails?.category?.name}</h1>
                       <h5>{productsDetails?.slug}</h5>
                           <p>{productsDetails?.description}</p>

                           <div className='d-flex justify-content-between'>
                           <span>
                           <p className='text-dark'>{productsDetails?.price} EGP</p>

                           </span>
                           <div className='d-flex align-items-center justify-content-between'>
                           <i  className=" fa-solid fa-star ratingcolor"></i>
                               <span className='text-dark'>{productsDetails?.ratingsAverage}</span>
                               
                           </div>
                       </div>
                       <div className='d-flex justify-content-between p-2 position-relative overflow-hidden'>
                       <button onClick={()=>{addProducttocart(ProductDetails?.id)}} className='btndetails btn btn-success w-75 my-2'>+ add to cart</button>
                       <i className="fa-solid fa-heart fa-2x ms-auto text-dark "></i>
                       </div>
                           
                       </div>

               </div>
           </div>
       </div>
       </>
    );
}



export default ProductDetails;













