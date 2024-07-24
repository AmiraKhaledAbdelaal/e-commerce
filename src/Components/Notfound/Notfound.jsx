import React from 'react';
import imgerror from '../../Assets/images/notfound.png'
function Notfound(props) {
    return (
        <div className='d-flex justify-content-center'>
            <img className='w-100 h-50'  src={imgerror} alt="notfound" />
           
        </div>
    );
}

export default Notfound;