import React, { useState } from 'react';
import {FaChevronDown,FaChevronUp} from 'react-icons/fa'

const FaqQA = ({data}) => {
    const [hide,setHide] = useState(false)
    console.log(data);
    return (
        <div className='bg-mycolor-100 rounded-lg px-2'>
            <p style={{fontSize: '1.6rem'}} className="flex justify-between items-center text-mycolor-200 font-bold h-[42px]" onClick={()=>setHide(!hide)}>
                <span style={{fontSize: '1.6rem'}}>{data.id}.{data.qusetion}</span>
                <span>{hide ? <FaChevronDown/>:<FaChevronUp/>}</span>
            </p>
            {hide && <p className='text-base pr-10 text-justify' style={{fontSize: '1.6rem', lineHeight:'2.4rem'}}>{data.answer}</p>}
        </div>
    );
};

export default FaqQA;