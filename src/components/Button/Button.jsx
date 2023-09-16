import React from "react";
import './Button.css';

export const Button = ({onloadMore}) => (
    <button 
       type="button" 
       className='load__more' 
       onClick={onloadMore}>
        Load more
        </button>
)