// ALways use width and height by a className.

import Image from 'next/image';

export default function Img({src, className, alt, ...rest}) {
    return (
        <div {...rest} style={{position: 'relative'}} className={className} >
        {/* <div {...rest} className="unset-img" > */}
            <Image
                alt={alt}
                src={src}
                layout='fill'
                className="Img"
                objectFit='contain'
            />
        </div>
    )
}