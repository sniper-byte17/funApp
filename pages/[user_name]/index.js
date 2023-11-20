/* eslint-disable @next/next/no-img-element */
import Img from '../../lib/Img';
import { useEffect, useState } from 'react';
import Fancybox from '../../lib/FancyBox';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';

// Route => /username
// If not logged in, 
const Profile = () => {
    const router = useRouter();
    const {user_name} = router.query;
    const [profile, setProfile] = useState();

    useEffect( () => {
        fetch(`<HOSTED_URL>/api/v1/profile/username/${user_name}`)
        .then( res => res.json())
        .then( data => {
            console.log(data);
            setProfile(data.data[0]);
        })
    }, [user_name]);

    const { bio, username, profilePicture, cover, photos, videos, websites } = profile || {
        bio: '',
        username: '',
        profilePicture: {},
        cover: {},
        photos: [],
        videos: [],
        websites: []
    };


    let col1 = [];
    let col2 = [];
    let col3 = [];
    let col4 = [];
    if(photos.length > 0) {
        photos.forEach( (img, i) => {
            if(i%4 === 0) {
                col1.push(img.fileURL);
            } else if(i%4 === 1) {
                col2.push(img.fileURL);
            } else if(i%4 === 2) {
                col3.push(img.fileURL);
            } else if(i%4 === 3) {
                col4.push(img.fileURL);
            }
        })
        // const col1 = photos.map()
    }
    console.log(col1, col2, col3, col4)
    
    const coverPic = cover?.fileURL?.length > 0 ? cover.fileURL : '/user-cover-default.png';
    const profilePic = profilePicture?.fileURL?.length > 0 ? profilePicture.fileURL : '/user-dp-default.png';
    console.log(coverPic);
    return (
        <>
        <main className='profile'>
            <Toaster />
            <div className='profile-cover' style={{backgroundImage: `url(${coverPic})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat:'no-repeat'}}>
            </div>
            <div className='profile-dp' style={{backgroundImage: `url(${profilePic})`, backgroundSize: 'cover', border: '2px solid white', backgroundPosition: 'center', backgroundRepeat:'no-repeat', borderRadius: '50%'}} >
            </div>
            <div className='profile-info-short'>
                <span className='profile-username'>@{username}</span>
            </div>
            <div className='profile-websites'>
                <ul className='profile-websites__row'>
                    {
                        websites.length > 0 ? 
                        <>
                            {
                                websites.map( (site, i) => {
                                    // first 3 goes here. 0 1 2
                                    if(i <= 2) {
                                        return (
                                            <a key={i} href={site.link} target="_blank" rel="noreferrer">
                                                <span className="website-preview">
                                                <Img src={`/${site.logo}.png`} alt={site.logo} className="websites-logo" /> 
                                                {site.displayLink}
                                                </span>                                            
                                            </a>
                                        )
                                    }
                                })
                            }
                        </> : ''
                    }
                </ul>
                <ul className='profile-websites__row'>
                    {
                        websites.length > 0 ? 
                        <>
                            {
                                websites.map( (site, i) => {
                                    // last 3 goes here. 3 4 5
                                    if(i > 2 ) {
                                        return (
                                            <a key={i} href={site.link} target="_blank" rel="noreferrer">
                                                <span className="website-preview">
                                                <Img src={`/${site.logo}.png`} alt={site.logo} className="websites-logo" /> 
                                                {site.displayLink}
                                                </span>                                            
                                            </a>
                                        )
                                    }
                                })
                            }
                        </> : ''
                    }
                </ul>
            </div>
            
            <div className='profile-bio'>
                <p>
                    {bio.length > 0 ? bio : 'No bio yet'}
                </p>
            </div>
            
            <Fancybox options={{ infinite: false }}>
            
            <div className='profile-media-wrapper'>
                {
                    photos.length > 0 ? 
                    (
                        <div className='image-gallery-row'>
                            <div className="image-gallery-column">
                                {
                                    col1.map( (img, i) => (
                                        <img 
                                        key={i} 
                                        alt="Image" 
                                        src={img} 
                                        style={{width: '100%'}} 
                                        data-fancybox="gallery" 
                                        data-src={img}  />
                                    ))
                                }    
                            </div>
    
                            <div className="image-gallery-column">
                                {
                                    col2.map( (img, i) => (
                                        <img key={i} alt="Image" src={img} style={{width: '100%'}} 
                                        data-fancybox="gallery" 
                                        data-src={img}  />
                                    ))
                                }    
                            </div>
                            
                            <div className="image-gallery-column">
                                {
                                    col3.map( (img, i) => (
                                        <img key={i} alt="Image" src={img} style={{width: '100%'}} 
                                        data-fancybox="gallery" 
                                        data-src={img}  />
                                    ))
                                }    
                            </div>
                            
                            <div className="image-gallery-column">
                                {
                                    col4.map( (img, i) => (
                                        <img key={i} alt="Image" src={img} style={{width: '100%'}} 
                                        data-fancybox="gallery" 
                                        data-src={img}  />
                                    ))
                                }    
                            </div>
                        </div>

                    )
                     : ''
                }
                {/* {
                    videos.length > 0 ? 
                    <>
                    {
                        videos.map( (video, i) => (
                            <Img key={i} 
                                src={video} 
                                className="profile-media" 
                                alt="Video" 
                                data-fancybox="gallery" 
                                data-src={video}  />
                        ))
                    }
                    </> : ''
                } */}
                {
                    (videos.length === 0 && photos.length === 0 ) && 
                    'No images or videos to show.'
                }
                
            </div>
            </Fancybox>
        </main>
        </>
    );
};

export default Profile;