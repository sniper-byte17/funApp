import React from 'react';

const ProgressBar = ({items, currentQuestion, hidden, circle1Class, circle2Class, circle3Class, circle4Class, hasSelectedAnswer}) => {
    const basePercentage = (1/items)*100;
    const percentCompeted = basePercentage * (currentQuestion - 1);
    // console.log(currentQuestion);
    let width = (25 * (currentQuestion + 1));
    if(width === 25 && hasSelectedAnswer === false && currentQuestion === 0) {
        // console.log('pull back to zero %');
        // width = 0;
    } 
    return <div 
            className="progress-bar">
                {/* <span className='progress-bar--base'></span> */}
                {/* <span className="progress-bar--moving" style={{width: `${width}%`}}></span> */}
                {/* <span className="progress-bar__percentCompleted">{100 - backgroundPosition}% Completed</span>                 */}
                <span className={`${circle1Class} circle `} style={{left: '0px'}}></span>
                <span className={`${circle2Class} circle`} style={{left: '33%'}}></span>
                <span className={`${circle3Class} circle`}  style={{left: '67%'}}></span>
                <span className={`${circle4Class} circle`}  style={{left: '100%'}}></span>
            </div>
}

export default ProgressBar;