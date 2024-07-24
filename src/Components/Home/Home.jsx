import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import Mainslider from '../Mainslider/Mainslider';
import Longslider from '../Longslider/Longslider';

function Home() {

const [products, setProducts] = useState([])
const [isloading, setisloading] = useState(false)
    useEffect(() => {
        getAllProducts()
    }, [])
    // async function getAllProducts() {
    //      await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    //     .then((response)=>{
    //         setProducts(response.data.data)
    //     })
    // }
    async function getAllProducts(){
        setisloading(true)
        let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products')
        setProducts(data.data)
        setisloading(false)
    }
    return (
        isloading ? <>
         <div
            className=" maincolor loading position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center">
            <i className="fa fa-spinner fa-spin fa-5x"></i>
        </div>
        </>:
         <div className='mb-5'>
            <div className="container shadow-lg ">
                <Mainslider/>
            </div>
            <div className="container lonngslider">
                <div className="row">
                    <div className="col-md-12">
                        <Longslider/>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {products?.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
                </div>
            </div>
        </div> 
    );
}

export default Home;