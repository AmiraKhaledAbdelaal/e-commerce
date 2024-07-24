import axios from 'axios';
import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Cartcontext } from '../../Context/Cartcontext';
import toast from 'react-hot-toast';
function Wishlist(props) {
    let {addcart,setnum,numofitem}=useContext(Cartcontext)
    let [errorcategory,seterrorcategory]=useState('');
    let [wishdata,setwishdata]=useState([]);
    let [isloading,setisloading]=useState(false);

    useEffect(()=>{
        getwishcategory()

    },[])

        async function addProducttocart(id){
        let {data} = await addcart(id);
        deletewish(id)
        // console.log(data);
        // console.log(id);
            toast.success(data.message)
         
    
    }
    async function getwishcategory(){
        setisloading(true)
        let response=await axios.get(`https://route-ecommerce.onrender.com/api/v1/wishlist`,{
            headers:{
                token:localStorage.getItem('usertokenlocal')
            },
          
        }).catch((err)=>{
            seterrorcategory(err.response.data.message)
            // console.log(err.response.data.message)
        })
        if(response){
            setwishdata(response.data.data)
            setnum(numofitem)
            // settotalprice(response.data.data.totalCartPrice)
            // setnumberofitem(response.data.numOfCartItems)

        }
        // console.log(cartdata)
        // console.log(response)
        // console.log(response.data.data.products)
        // console.log(response.data.data)
        setisloading(false)

    }
    async function deletewish(productid){
        // setisloading(true)
        let response= await axios.delete(` https://route-ecommerce.onrender.com/api/v1/wishlist/${productid}`,{
            headers:{
                token:localStorage.getItem('usertokenlocal')
            }
        })
        if(response){
        // setcartdata(response.data.data.products)
        // settotalprice(response.data.data.totalCartPrice)
        // setnumberofitem(response.data.numOfCartItems)
        getwishcategory()
        }
        // console.log(response)
        // setisloading(false)
   
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
               <h2 className='mb-4 maincolor'>My Wish List</h2>
           </div>
           {wishdata?.map((product)=>{
               return <div key={product.id} className='product-cart'>
                   <div className="row shadow-lg my-4 rounded-3 py-2">
                       <div className="col-md-2">
                           <img className='w-100' src={product.imageCover} alt={product.category.name} />
                       </div>
                       <div className="col-md-9 d-flex justify-content-between align-items-center ">
                           
                                   <div className="col-md-10 py-2">
                                   <h2>{product.category.name}</h2>
                                       
                                       <h6>{product.price} EGP</h6>
                                           <div onClick={()=>deletewish(product.id)} className='cursor-pointer'>
                                               <i className="fa-solid fa-trash icon-red "></i>
                                               <span className='mx-2 icon-red'>Remove</span>
                                           </div>
                                           
                                   </div>
                                   <div className="col-md-2">
                                    <button onClick={()=>{addProducttocart(product.id)}} className=' btn bg-maincolor w-75 my-2 text-white '>add to cart</button>
                                   </div>
                       </div>
                       
                   </div>
               </div>
           })}
       
   </div>
   }
   </> }
   </>
    );
}

export default Wishlist;