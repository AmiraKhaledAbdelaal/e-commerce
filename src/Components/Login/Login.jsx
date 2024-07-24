import { useFormik} from 'formik';
import * as Yup from 'yup';


import style from './Login.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {RotatingLines} from 'react-loader-spinner'

import { useState } from 'react';
import { useContext } from 'react';
import { Usercontext } from '../../Context/Usercontext';
  export default function Login() {
    let {setusertoken}=useContext(Usercontext);
    let [show ,setshow] = useState(false)
    let [error , seterror]= useState(null)
    let navigate = useNavigate();
    let [isloading , setisloading]=useState(false);

   async function submitlogin(values){
   
       
        setisloading(true)
        let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`,values)
        .catch(
            (err)=>{
                setisloading(false)
                seterror(err.response.data.message)
            }
            )
        if(data.message==='success'){
            setisloading(false)
            localStorage.setItem('usertokenlocal',data.token)
            setusertoken(data.token)
            navigate('/Home')
        }
    }
    
  
        let handleshow = ()=>{
            setshow(!show)
        }
       
 
    let phoneregural= /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
     let validation = Yup.object({

            email:Yup.string().email('invalied email').required('email is required '),
            password:Yup.string().matches(phoneregural , 'password is not valid ').required('pasword is required'),
       
     })

    let formik = useFormik(
        {
            initialValues:{
                email:'',
                password:''
               
            },validationSchema:validation,
            onSubmit:submitlogin

        }
    )
    return <>
        <div className="container my-5">
            {/* <div className="alert alert-danger">{error}</div> */}
            {error? <div className="alert alert-danger">{error}</div>:''}
                <h2>Login Now</h2>
            <form onSubmit={formik.handleSubmit}>

                    

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
                    

                    {/* <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-maincolor text-light my-3 d-flex ms-auto py-2 ' type='submit'>Register Now</button> */}
                   
                   {/* {isloading ? <button className='ms-auto btn d-flex  bg-maincolor text-light my-2' type='button'><i className="fas fa-spinner fa-spin ms-auto"></i></button>: <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-maincolor text-light my-3 d-flex ms-auto py-2 ' type='submit'>Register Now</button>} */}
                   { isloading ?
                    <div  className='my-2  maincolor   '><RotatingLines
//   strokeColor="gray"
  strokeWidth="5"
  animationDuration="0.75"
  width="50"
  visible={true}
/></div>

                   : <div className='d-flex'><button className='btn'><Link className='text-dark text-decoration-none' to="/Register"><h5>forget your password ? </h5></Link></button>
                   <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-maincolor text-light my-3 d-flex ms-auto py-2 ' type='submit'>Register Now</button>
                   </div>}
                    {/* <button className='btn bg-maincolor text-light ms-auto' type='button'><i className="fas fa-spinner fa-spin"></i></button> */}
            </form>
        </div>
</>
}


