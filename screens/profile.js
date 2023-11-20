import Img from '../lib/Img';
import Link from 'next/link';
import { useContext, useRef, useState } from 'react';
import { UserContext } from '../lib/context';
import Fancybox from '../lib/FancyBox';
import { useFileUpload } from '../hooks/useFileUpload';
import { Toaster } from 'react-hot-toast';
import LoadingSpinner from '../components/LadingSpinner';
import { PlusCircleTwoTone } from '@ant-design/icons';
import useMediaUpload from '../hooks/useMediaUpload';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import WebsiteAdder from '../lib/Modal';
import useAccountSettings from '../hooks/useAccountSettings';

const Profile = (props) => {
    const {user} = useContext(UserContext);
    // console.log(props);
    const {storeWebsiteFormData} = useAccountSettings();
    const [websiteEditBtnRef, setWebsiteEditBtnRef] = useState(null);
    const { bio, firstname, username, profilePicture, cover, photos, videos, websites } = props.user;
    
    const [clickedSite, setClickedSite] = useState({});
    const inputProfilePic = useRef(null);
    const inputCoverPic = useRef(null);
    const {changeProfilePicture, changeCoverPicture, dpLoading, coverLoading} = useFileUpload();
    const {directlyUploadimages, loading, removeImage} = useMediaUpload();
    // console.log(user);
    const inputFile = useRef(null);
    const websiteEditBtn = useRef(null);
    const coverPic = cover ? cover?.fileURL : '/user-cover-default.png';
    const profilePic = profilePicture ?  profilePicture?.fileURL : '/user-dp-default.jpg'
    const data = 'meh';
    const sendDataToModal = (site) => {
        setClickedSite(site);
    }
    return (
        <>
        <main className='profile'>
            <Toaster />
            <div className='profile-cover' style={{backgroundImage: `url(${coverPic})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat:'no-repeat'}}>
                {
                    coverLoading ? <LoadingSpinner /> : 
                    <div onClick={() => inputCoverPic.current.click()} className='profile-cover__icon-wrapper' >
                        <Img src="/camera-icon.png" className="profile-cover__icon" alt="Camera" />                                    
                        <input
                            type="file"
                            onChange={(e) => changeCoverPicture(e)}
                            style={{display: 'none'}}
                            ref={inputCoverPic}
                        />
                    </div>
                }                
            </div>
            <div onClick={() => inputProfilePic.current.click()} className='profile-dp' style={{backgroundImage: `url(${profilePic})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat:'no-repeat', borderRadius: '50%'}} >
                {
                    dpLoading ? <LoadingSpinner /> : 
                    <>
                        <Img src="/camera-icon.png" className="profile-dp__icon" alt="Camera" />
                        <input
                            type="file"
                            onChange={(e) => changeProfilePicture(e)}
                            style={{display: 'none'}}
                            ref={inputProfilePic}
                        />
                    </>
                }
            </div>
            <div className='profile-info-short'>
                <span className='profile-username'>@{username}</span>
                {/* <span className='profile-lastseen'>Last seen Mar 1</span> */}
            </div>
            <div className='profile-websites'>
                <ul className='profile-websites__row'> 
                    {
                        websites?.length > 0 ? 
                        <>
                            {
                                websites.map( (site, i) => {
                                    // first 3 goes here. 0 1 2
                                    if(i <= 2) {
                                        if(site) {
                                            return (
                                              <span className="hover-action-parent">
                                                <a href={site.link} className="website-preview" target="_blank" rel="noreferrer">
                                                <Img src={`/${site.logo}.png`} alt={site.logo} className="websites-logo" /> 
                                                {site.displayLink}
                                                </a>
                                                <WebsiteAdder 
                                                  storeWebsiteFormData={storeWebsiteFormData} 
                                                  mode="edit"
                                                  website={clickedSite}
                                                  ref={websiteEditBtn} />
                                                <EditOutlined
                                                 onClick={e => {
                                                    websiteEditBtn.current.click(e);
                                                    const clickedWebsiteData = {site, i}
                                                    setClickedSite(prevState => clickedWebsiteData)
                                                 }}
                                                 className="hover-action" />
                                              </span>
                                            )
                                        }
                                    }
                                })
                            }
                        </> : ''
                    }
                </ul>
                <ul className='profile-websites__row'>
                    {
                        websites?.length > 0 ? 
                        <>
                            {
                                websites.map( (site, i) => {
                                    // last 3 goes here. 3 4 5
                                    if(i > 2 ) {
                                        if(site) {
                                            return (
                                            <span className="hover-action-parent">
                                                <a href={site.link} className="website-preview" target="_blank" rel="noreferrer">
                                                <Img src={`/${site.logo}.png`} alt={site.logo} className="websites-logo" /> 
                                                {site.displayLink}
                                                </a>
                                                <WebsiteAdder 
                                                  storeWebsiteFormData={storeWebsiteFormData} 
                                                  mode="edit"
                                                  website={clickedSite}
                                                  ref={websiteEditBtn} />
                                                <EditOutlined
                                                 onClick={e => {
                                                    websiteEditBtn.current.click(e);
                                                    const clickedWebsiteData = {site, i}
                                                    setClickedSite(prevState => clickedWebsiteData)
                                                 }}
                                                 className="hover-action" />
                                              </span>
                                            )
                                        }
                                    }
                                })
                            }
                        </> : ''
                    }
                </ul>
            </div>
            <div className='profile-navigation'>
                <div className='profile-navigation__link active'>
                    <Img src="/profile-skel.png" className="profile-navigation__img" alt="Profile User" />
                    <span>Profile</span>
                </div>
                {/* <div className='profile-navigation__link'>
                    <Img src="/profile-heart.png" className="profile-navigation__img" alt="Profile Friends" />
                    <span>Friends</span>
                </div> */}
                <Link href={`/${username}/profile/settings`} passHref>
                    <a>
                        <div className='profile-navigation__link'>
                            <Img src="/profile-edit.png" className="profile-navigation__img" alt="Profile Edit" />
                            <span>Account</span>
                        </div>
                    </a>
                </Link>
            </div>
            <div className='profile-bio'>
                <p>
                    {bio?.length > 0 ? bio : 'No bio yet'}
                </p>
            </div>
            
            <Fancybox options={{ infinite: false }}>
            <div className='profile-media-wrapper'>
                {
                    loading ? <LoadingSpinner /> : 
                    <>
                        {
                            photos?.length > 0 && (
                                photos.map( (img, i) => (
                                    <div key={img.fileURL} className="hover-action-parent">
                                    <Img  
                                        src={img.fileURL} 
                                        className="profile-media" 
                                        alt="Image" 
                                        data-fancybox="gallery" 
                                        data-src={img.fileURL}  />
                                    <DeleteOutlined className='hover-action' onClick={() => removeImage(img.public_id, i)} />
                                    </div>                            
                                ))
                            ) 
                        }
                        <>
                            <input
                                type="file"
                                multiple
                                onChange={directlyUploadimages}
                                className="media-upload-button"
                                style={{display: 'none'}}
                                ref={inputFile}
                            />
                            <PlusCircleTwoTone onClick={() => inputFile.current.click()} style={{fontSize: '24px'}} /> 
                        </>
                    </>
                }
            </div>
            </Fancybox>
        </main>
        </>
    );
};

export default Profile;