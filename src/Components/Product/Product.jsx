import axios from 'axios';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';

import { Link, useNavigate } from 'react-router-dom';
import { Usercontext } from '../../Context/Usercontext';

function Product({product}) {
    let {setusertoken}=useContext(Usercontext)
    let navigate=useNavigate()

    async function addtocart(productId){
        // console.log(productId);
         let response = await axios.post('https://route-ecommerce.onrender.com/api/v1/cart',{
            productId:productId
        },{
            headers:{
                token:localStorage.getItem('usertokenlocal')
            }
           
            
        }).catch((error)=>{
            toast.error(error.response.data.message)
            localStorage.removeItem('usertokenlocal')
            setusertoken(null);
            navigate('/Login')
        })
        // console.log(response)
        if(response){
           toast.success(response.data.message)
        }
        
    }
    async function addtowish(productId){
        // console.log(productId);
         let response = await axios.post('https://route-ecommerce.onrender.com/api/v1/wishlist',{
            productId:productId
        },{
            headers:{
                token:localStorage.getItem('usertokenlocal')
            }
           
            
        }).catch((error)=>{
            toast.error(error.response.data.message)
            localStorage.removeItem('usertokenlocal')
            setusertoken(null);
            navigate('/Login')
        })
        // console.log(response)
        if(response){
           toast.success(response.data.message)
        }
        
    }
    return (
        <>
            <div  className=" colproduct col-sm-6 col-lg-3 my-5  overflow-hidden">
                <Link to={`/ProductDetails/${ product._id}`} >
                    <div className=" px-2 py-3 me-3">
                        <img className='w-100' src={product.imageCover} alt="" />
                        <p className='maincolor'>{product.category.name}</p>
                        <h6 className='text-dark'>{product.slug}</h6>
                        <div className='d-flex justify-content-between'>
                            <span>
                            <p className='text-dark'>{product.price} EGP</p>

                            </span>
                            <div className='d-flex align-items-center justify-content-between'>
                                <i  className=" fa-solid fa-star ratingcolor"></i>
                                <span className='text-dark'>{product.ratingsAverage}</span>
                                
                            </div>
                        </div>
                    </div>
                </Link>
                <div className='d-flex justify-content-between p-2 position-relative mb-2'>
                        <button onClick={()=>addtocart(product._id)} className='btnadd btn btn-success w-75 my-2'>+ add to cart</button>
                        <i onClick={()=>addtowish(product._id)} className="fa-solid fa-heart fa-2x ms-auto text-dark "></i>
                </div>
            </div>
            
            
        </>
    );
}

export default Product;