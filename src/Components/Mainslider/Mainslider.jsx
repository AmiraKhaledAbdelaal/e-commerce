import React from 'react';
import Slider from "react-slick";
import slider1 from '../../Assets/images/slider1.jpeg'
import slider2 from '../../Assets/images/slider2.jpeg'
import slider3 from '../../Assets/images/slider3.png'
import slider4 from '../../Assets/images/slider4.png'
import slider5 from '../../Assets/images/slider5.jpeg'
import slider6 from '../../Assets/images/slider6.jpeg'


function Mainslider(props) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
    slidesToScroll: 1,
      };
    return (
        <>
            <div className="mainslider mt-5 ">
                <div className="row justify-content-center pt-5">
                    <div className="col-md-6 p-0 ">
                    <Slider {...settings} className=' mx-5 '>
                        <img height={500} src={slider1} alt="slide1" />
                        <img className='w-100' height={500}  src={slider2} alt="slide2" />
                        
                    </Slider>

                    </div>
                    <div className="col-md-3 p-0" >
                        <img className='w-100' height={250}  src={slider3} alt="slide3" />
                        <img className='w-100' height={250}  src={slider4} alt="slide4" />
                    </div>
                    <div className="col-md-3 p-0" >
                        <img className='w-100' height={250}  src={slider5} alt="slide5" />
                        <img className='w-100' height={250}  src={slider6} alt="slide6" />
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Mainslider;