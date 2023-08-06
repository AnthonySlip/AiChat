import React from 'react';
import './generating.scss'
const Generating = (props) => {
    return (
        <span className='generating'>
            <h5 className='generating-title'>Generating</h5>
            <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </span>
    );
}

export default Generating;