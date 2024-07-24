import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
function Longslider(props) {
    let[categorys,setCategorys]=useState([])
    useEffect(()=>{
        getallcategory()

    },[])
    async function getallcategory(){
        let {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
        setCategorys(data.data)
        // console.log(categorys)
    }
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };
    return (
         <>
         <Slider {...settings} className='m-3 my-5'>
                       {categorys?.map((category,index)=>{
                        return<div key={index}>
                        <img className='w-100'  height={250}  src={category.image} alt={category.name} />
                            <h5 className='text-center'>{category.name}</h5>
                        </div>
                            
                       })}
                        
                    </Slider>
        </>
    );
}


export default Longslider;