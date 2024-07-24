import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { cartcontext } from '../../Context/Cartcontext';
// import {RotatingLines} from 'react-loader-spinner'
function Cart(props) {
    let [errorcategory,seterrorcategory]=useState('');
    let [cartdata,setcartdata]=useState([]);
    let [totalprice,settotalprice]=useState(0);
    let [numberofitem,setnumberofitem]=useState(0);
    let [isloading,setisloading]=useState(false);
    // let [btnloading1,setbtnloading1]=useState(false)
    // let [btnloading2,setbtnloading2]=useState(false)

    useEffect(()=>{
        getcartcategory()

    },[])
    async function getcartcategory(){
        setisloading(true)
        let response=await axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`,{
            headers:{
                token:localStorage.getItem('usertokenlocal')
            },
          
        }).catch((err)=>{
            seterrorcategory(err.response.data.message)
            // console.log(err.response.data.message)
        })
        if(response){
            setcartdata(response.data.data.products)
        settotalprice(response.data.data.totalCartPrice)
        setnumberofitem(response.data.numOfCartItems)

        }
        // console.log(cartdata)
        // console.log(response)
        // console.log(response.data.data.products)
        // console.log(response.data)
        setisloading(false)

    }
    async function deletproduct(productid){
        // setisloading(true)
        let response= await axios.delete(` https://route-ecommerce.onrender.com/api/v1/cart/${productid}`,{
            headers:{
                token:localStorage.getItem('usertokenlocal')
            }
        })
        if(response){
        // setcartdata(response.data.data.products)
        // settotalprice(response.data.data.totalCartPrice)
        // setnumberofitem(response.data.numOfCartItems)
        getcartcategory()
        }
        // console.log(response)
        // setisloading(false)
   
    }
    async function deleteallcart(){
        // setisloading(true)
        let response= await axios.delete(` https://route-ecommerce.onrender.com/api/v1/cart`,{
            headers:{
                token:localStorage.getItem('usertokenlocal')
            }
        })
        if(response){
            // setcartdata([])
            // seterrorcategory('ffff')
            
            getcartcategory()
            
        }
        
        // console.log(response)
        // setisloading(false)

    }
    async function updatecount(count,productid){
        // setbtnloading1(true)
            let response=await axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productid}`,{
                count
            },{
                headers:{
                    token:localStorage.getItem('usertokenlocal')
                }
            }
            )
            
            if(response){
                getcartcategory()
            }
            console.log(response)
            // setbtnloading1(false)
    }
    
   return (
    <>
   {isloading?  <div
            className=" maincolor loading position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center">
            <i className="fa fa-spinner fa-spin fa-5x"></i>
        </div>: 
        <>
   {errorcategory ?
   <div className="container my-5 py-5">
       <h1 className='alert alert-success text-center py-5'>your cart shop is empty</h1>
   </div>
   :
   <div className="container  my-5 px-5">
           <div className='d-flex justify-content-between pt-5'>
               <h2 className='mb-4 maincolor'>Cart Shop</h2>
               <button className='btn bg-maincolor text-light px-4 mb-5'>check out</button>
           </div>
           <div className='d-flex justify-content-between'>
               <h5 className='mb-5'>total price: <span className='maincolor'>{totalprice}</span></h5>
               <h5 className='mb-5'>total number of items: <span className='maincolor'>{numberofitem}</span></h5>
           </div>
           {cartdata?.map((product)=>{
               return <div key={product._id} className='product-cart'>
                   <div className="row shadow-lg my-4 rounded-3 py-2">
                       <div className="col-md-2">
                           <img className='w-100' src={product.product.imageCover} alt={product.product.title} />
                       </div>
                       <div className="col-md-9 d-flex justify-content-between align-items-center ">
                           
                                   <div className="col-md-10 py-2">
                                       
                                       <h2>{product.product.title}</h2>
                                       <h6>{product.product.category.name}</h6>
                                       <h6>{product.price} EGP</h6>
                                       <h5>total price : <span>{product.price *product.count}</span></h5>

                                           <div onClick={()=>deletproduct(product.product._id)} className='cursor-pointer'>
                                               <i className="fa-solid fa-trash icon-red "></i>
                                               <span className='mx-2 icon-red'>Remove</span>
                                           </div>
                                           
                                   </div>
                                   <div className="col-md-2">
                                           <div className="d-flex align-items-center ">
                                            
                                            
                                               <button onClick={()=>updatecount(product.count + 1,product.product._id)} className='btn btn-outline-success mx-3 '>+</button>
                                               <h6>{product.count}</h6>
                                        
                                               <button onClick={()=>{if(product.count>1){updatecount(product.count - 1,product.product._id)}else{deletproduct(product.product._id)} }} className='btn btn-outline-success mx-3'>-</button>
                                           </div>
                                   </div>
                       </div>
                       
                   </div>
               </div>
           })}
      
       <div className='d-flex justify-content-center'>
       <button onClick={()=>deleteallcart()} className='btn bg-maincolor text-white  d-inline text-black py-2 mb-5  '>clear your cart</button>
       </div>
       
   </div>
   }
   </> }
   </>
   )
   
   
}

export default Cart;





// return <>
        
// {errorcategory ?
// <div className="container my-5 py-5">
//     <h1 className='alert alert-success text-center py-5'>your cart shop is empty</h1>
// </div>
// :
// <div className="container  my-5 px-5">
//         <div className='d-flex justify-content-between pt-5'>
//             <h2 className='mb-4 maincolor'>Cart Shop</h2>
//             <button className='btn bg-maincolor text-light px-4 mb-5'>check out</button>
//         </div>
//         <div className='d-flex justify-content-between'>
//             <h5 className='mb-5'>total price: <span className='maincolor'>{totalprice}</span></h5>
//             <h5 className='mb-5'>total number of items: <span className='maincolor'>{numberofitem}</span></h5>
//         </div>
//         {cartdata?.map((product)=>{
//             return <div key={product._id} className='product-cart'>
//                 <div className="row shadow-lg my-4 rounded-3 py-2">
//                     <div className="col-md-3">
//                         <img className='w-100' src={product.product.imageCover} alt={product.product.title} />
//                     </div>
//                     <div className="col-md-9 d-flex justify-content-between align-items-center ">
                        
//                                 <div className="col-md-10 py-2">
                                    
//                                     <h2>{product.product.title}</h2>
//                                     <h6>{product.product.category.name}</h6>
//                                     <h6>{product.price} EGP</h6>
//                                     <h5>total price : <span>{product.price *product.count}</span></h5>

//                                         <div onClick={()=>deletproduct(product.product._id)} className='cursor-pointer'>
//                                             <i className="fa-solid fa-trash icon-red "></i>
//                                             <span className='mx-2 icon-red'>Remove</span>
//                                         </div>
                                        
//                                 </div>
//                                 <div className="col-md-2">
                                    
//                                         <div className="d-flex align-items-center ">
//                                             <button className='btn btn-outline-success mx-3 '>+</button>
//                                             <h6>{product.count}</h6>
//                                             <button className='btn btn-outline-success mx-3'>-</button>
//                                         </div>
//                                 </div>
                        
//                     </div>
                    
//                 </div>
//             </div>
//         })}
   
//     <div className='d-flex justify-content-center'>
//     <button onClick={()=>deleteallcart()} className='btn btn-outline-success d-inline text-black py-2 mb-5  '>clear your cart</button>
//     </div>
    
// </div>
// }
// </> 