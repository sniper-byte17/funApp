import React from 'react';


export default function BodyWrapper({isHome, children}) {

    let style = {
        height: 'calc(100vh - 89px - 140px)',
        overflow: 'scroll',
        overflowX: 'hidden'
    }
    if(isHome) {
        style['height'] = 'calc(100vh - 140px)';
    }

    return (
        <div style={style}>
            {children}
        </div>
    )
}