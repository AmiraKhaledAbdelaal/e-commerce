import React, { useContext } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import { Usercontext } from '../../Context/Usercontext';
import { Cartcontext } from '../../Context/Cartcontext';

  export default function Navbar() {
    let {usertoken,setusertoken}=useContext(Usercontext)
    let navigate=useNavigate()
    let {numofitem }=useContext(Cartcontext)

    function logout(){
      localStorage.removeItem('usertokenlocal')
      setusertoken(null);
      navigate('/Login')

    }

    return<>

    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top mb-5">
  <div className="container">
  <Link className="navbar-brand" to="/home">
  <i  className="fa-solid fa-cart-shopping nav-icon maincolor fa-2x"></i>
  </Link>
  <Link className="navbar-brand" to="/home"><h4>fresh cart</h4></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav m-auto mb-2 mb-lg-0 text-center">
        {usertoken!==null ? <>
          <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
          </li>
         
          
          <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Products">Products</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Categors">Categores</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Brands">Brands</Link>
          </li>
        </>:''}
        
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
 
      {usertoken!==null ? <> <li className="nav-item position-relative">
          <Link className="nav-link active" aria-current="page" to="/Cart"><i className="fa-solid fa-cart-shopping fa-2x"></i><span className='super badge position-absolute top-0  start-50' >5</span></Link>
          </li>
          <li className="nav-item position-relative">
          <Link className="nav-link active" aria-current="page" to="/Wishlist"><i className="fa-solid fa-heart fa-2x"></i><span className='super badge position-absolute top-0  start-50' >{numofitem}</span></Link>
          </li>
      <li className="nav-item">

          <span onClick={()=>logout()} className="nav-link active cursor-pointer" aria-current="page" to="/logout">Logout</span>
        </li></>
        :<>   <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
        </li></>}
        
      </ul>
    </div>
  </div>
</nav>
    </>
    
}