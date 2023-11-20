import React, { useEffect, useState } from 'react';
import BasicModal from "../lib/BasicModal";
import Stepper from "../lib/Stepper";
import {useRouter} from 'next/router';

export default function HeroRight ({}) {
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(window.innerWidth < 700) {
            setIsMobile(true);
        }
    }, []);
    return (
        <div className="hero-right">
            {
                !isMobile ? <BasicModal /> : <button className='login-button--modal' onClick={() => router.push('/sign-in')}>Login</button>
            }
            <h2 className="hero-right__text">Let&apos;s Get Started</h2>
            <Stepper />
        </div>
    )
}

