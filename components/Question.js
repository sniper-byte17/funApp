////////////////////
import React, {useState, useEffect} from 'react';
import Img from '../lib/Img';

const Question = ({expectedData, data, question, options, storeAnswer, removeAnswer}) => {
    // console.log(options);
    const submitAnswer = storeAnswer;
    const [selected, setSelected] = useState([]);
    useEffect( () => {
        const selectedState = options.map( option => false );
        setSelected(selectedState);
    }, []);
    
    
 
    const handleClick = (e, i) => { 
        // console.log(i);
        if(!selected[i]) {
            // Wasn't selected before. Now is. So, store the answer.
            storeAnswer(e);
            e.target.checked = true;
            const selectedState = [...selected];
            selectedState[i] = true;
            setSelected(selectedState);
        } else if(selected[i]) {
            // Has been selected before. Remove the answer and the selectedState
            removeAnswer(e, e.target.value);
            e.target.checked = false;
            const selectedState = [...selected];
            selectedState[i] = false;
            setSelected(selectedState);
        }
    }
    console.log(selected);
    return (
    <>
        <p className="question">{question}</p>
        <div className="options">
        <div className='options__row options__row-1'>
            {
                expectedData === 'gender' ? 
                
                    options.map( (option, i) => {
                        if(i < 2) {
                            return (
                                <div key={i} className={`Question-Choice-Container ${selected[i] && 'Question-Choice-Container-locked'}`} >
                                    <input className='Choice-Radio' onClick={(e) => handleClick(e, i)} data-expectedData={expectedData} data-dataValue={option.data} type="radio" value={option.value} />
                                    <label className="Choice-subtitle" >{option.value}</label>
                                    <span className="Choice-Bg">&nbsp;</span>
                                    {
                                        option.src.length > 0 && 
                                        <Img src={option.src} alt={option.value} className={`Choice-img ${option.class}`} />
                                    }
                                </div>
                            )
                        }
                    })
                    :                 
                    options.map( (option, i) => {
                        if(i < 5) {
                            // console.log('Not gender');
                            return (
                                <div key={i} className={`Question-Choice-Container Question-Choice-Container--no-img ${selected[i] && 'Question-Choice-Container-locked'}`}>
                                    <input className='Choice-Radio' onClick={(e) => handleClick(e, i)} data-expectedData={expectedData} data-dataValue={option.data} type="radio" value={option.value} />
                                    <span className="Choice-Bg">&nbsp;</span>
                                    <span className='Choice-content'>{option.value}</span>
                                    
                                </div>
                            )
                        }
                    })
                
            }
        </div>
        <div className='options__row options__row-2'>
        {
                expectedData === 'gender' ? 
                
                    options.map( (option, i) => {
                        if(i > 1) {
                            return (
                                <div  className={`Question-Choice-Container ${selected[i] && 'Question-Choice-Container-locked'}`}>
                                    <input className='Choice-Radio' onClick={(e) => handleClick(e, i)} data-expectedData={expectedData} data-dataValue={option.data} type="radio" value={option.value} />
                                    <label className={`Choice-subtitle ${i === 4 ? 'Choice-subtitle--last' : ' '}`} >{option.value}</label>
                                    <span className="Choice-Bg">&nbsp;</span>
                                    {
                                        option.src.length > 0 && 
                                        <Img src={option.src} alt={option.value} className={`Choice-img ${option.class}`} />
                                    }
                                </div>
                            )
                        }
                    })
                    :                 
                    options.map( (option, i) => {
                        if(i > 4) {
                            // console.log('Not gender');
                            return (
                                <div  key={i} className={`Question-Choice-Container Question-Choice-Container--no-img ${selected[i] && 'Question-Choice-Container-locked'}`}> 
                                    <input className='Choice-Radio' onClick={(e) => handleClick(e, i)} data-expectedData={expectedData} data-dataValue={option.data} type="radio" value={option.value} />
                                    <span className="Choice-Bg">&nbsp;</span>
                                    <span className='Choice-content'>{option.value}</span>
                                    
                                </div>
                            )
                        }
                    })
                
            }
            
        </div>                               
        </div>
    </>
    )
}

export default Question;