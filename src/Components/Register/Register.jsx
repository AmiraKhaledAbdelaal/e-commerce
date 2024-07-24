import { useFormik} from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';

import style from './Register.module.css';
// import './Register.moudle.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {RotatingLines} from 'react-loader-spinner'
  export default function Register() {
    let [show ,setshow] = useState(false)
    let [error , seterror]= useState(null)
    let navigate = useNavigate();
    let [isloading , setisloading]=useState(false)

   async function submitform(values){
        console.log('hello')
        // console.log(values) 
        setisloading(true)
        let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`,values)
        .catch(
            (err)=>{
                setisloading(false)
                seterror(err.response.data.message)
            }
            )
        if(data.message==='success'){
            setisloading(false)
            navigate('/Login')
        }
    }
    
//    async function submitform(){
//     console.log('hello')
//     let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`);
//     console.log(data)
// }
  
        let handleshow = ()=>{
            setshow(!show)
        }
       
    let passregural= /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    let phoneregural= /^01[0125][0-9]{8}$/;
     let validation = Yup.object({
            name:Yup.string().min(3 ,'name is less than 3 character').max(20 , 'name is more than 10 character').required('name is requrired'),
            email:Yup.string().email('invalied email').required('email is required '),
            password:Yup.string().matches(passregural , 'password is not valid ').required('pasword is required'),
            rePassword:Yup.string().oneOf([Yup.ref('password')],'repassword is not same passsword').required('repassword in required'),
            phone:Yup.string().matches(phoneregural,'phone is not valied').required('phone is required')
        
     })

    let formik = useFormik(
        {
            initialValues:{
                name:'',
                email:'',
                password:'',
                rePassword:'',
                phone:''
            },validationSchema:validation,
            onSubmit:submitform

        }
    )
    return <>
        <div className="container my-5">
            {/* <div className="alert alert-danger">{error}</div> */}
            {error? <div className="alert alert-danger">{error}</div>:''}
                <h2>register now</h2>
            <form onSubmit={formik.handleSubmit}>

                    <label htmlFor="name">name :</label>
                    <input className='form-control' type="text" name='name' id='name' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.name && formik.touched.name ? <div className="alert alert-danger my-2 p-2">{formik.errors.name}</div> :""}
                    

                    <label htmlFor="email">email :</label>
                    <input className='form-control' type="text" name='email' id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger my-2 p-2'>{formik.errors.email}</div>:""}

                    <label htmlFor="password">password :</label>
                    {/* <input className='form-control ' type='password'  name='password' id='password' onChange={formik.handleChange} onBlur={formik.handleBlur} />  */}
                    <div className="show position-relative">
                        <input className='form-control ' type={show ? "text" : "password"}  name='password' id='password' onChange={formik.handleChange} onBlur={formik.handleBlur} /> 
                        <span onClick={handleshow}>
                            {show ? <i className={`${style.showw} fa-regular fa-eye-slash`}/>:<i className={`${style.showw} fa-solid fa-eye`}/>}
                        </span>
                    </div> 
                    {formik.errors.password&& formik.touched.password ? <div className='alert alert-danger my-2 p-2'>{formik.errors.password}</div>:""}
                    

                    <label htmlFor="rePassword">rePassword :</label>
                    <input className='form-control' type="password" name='rePassword' id='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur} /> 
                    {formik.errors.rePassword && formik.touched.rePassword? <div className='alert alert-danger my-2 p-2'>{formik.errors.rePassword}</div>:""}

                    <label htmlFor="phone">phone :</label>
                    <input className='form-control' type="tel" name='phone' id='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} /> 
                    {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger my-2 p-2'>{formik.errors.phone}</div>:""}

                    {/* <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-maincolor text-light my-3 d-flex ms-auto py-2 ' type='submit'>Register Now</button> */}
                   
                   {/* {isloading ? <button className='ms-auto btn d-flex  bg-maincolor text-light my-2' type='button'><i className="fas fa-spinner fa-spin ms-auto"></i></button>: <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-maincolor text-light my-3 d-flex ms-auto py-2 ' type='submit'>Register Now</button>} */}
                   {isloading ? <button type='button' className='my-2 btn maincolor  '><RotatingLines
//   strokeColor="gray"
  strokeWidth="5"
  animationDuration="0.75"
  width="50"
  visible={true}
/></button>
                   : <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-maincolor text-light my-3 d-flex ms-auto py-2 ' type='submit'>Register Now</button>}
                   
                    {/* <button className='btn bg-maincolor text-light ms-auto' type='button'><i className="fas fa-spinner fa-spin"></i></button> */}
            </form>
        </div>
</>
}


