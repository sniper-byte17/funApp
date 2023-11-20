import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Img from '../lib/Img';
import HeroRight from './HeroRight';
import Link from 'next/link'
import PromotedCreatorcard from './PromotedCreatorCard';

export default function Hero ({}) {
    return (
        <Grid container spacing={0} className="hero">
            <Grid item xs={12} md={6} className="hero-left">
                <Img 
                    src="/hero-logo.png"
                    alt="Fun Findrr"
                    className="hero-logo"
                />
                <p className='hero-text'>Sign up to support your favorite creators</p>
                <Grid container spacing={0} className="hero-promoted-creators">
                    <Grid item >
                        <Link passHref href="/">
                            <a>
                                <PromotedCreatorcard />                                
                            </a>
                        </Link>
                    </Grid>
                    <Grid item >
                        <Link passHref href="/">
                            <a>
                                <PromotedCreatorcard />                                
                            </a>
                        </Link>
                    </Grid>                    
                </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <HeroRight />
            </Grid>
        </Grid>        
    )
}