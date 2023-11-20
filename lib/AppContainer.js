import React from 'react';


export default function AppContainer({isHome, children}) {
    const style = {
        display: 'grid',
        gridTemplateRows: '8.9rem 1fr 14rem'
    }
    if(isHome) {
        style['gridTemplateRows'] =  '1fr 14rem'
    }

    return (
        <div style={style}>
            {
                isHome ? (
                    <>
                    {children[1]}
                    {children[2]}
                    </>
                ) 
                :
                (
                    <>
                    {children[0]}
                    {children[1]}
                    {children[2]}
                    </>
                )
            }
        </div>
    )
}