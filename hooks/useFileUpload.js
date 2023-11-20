import { useContext, useState } from 'react';
import { UserContext } from '../lib/context';
import {useRouter} from 'next/router'
import axios from 'axios';
import toast from 'react-hot-toast';

class CustomError extends Error {
  constructor(message) {
    super();
    this.errorMessage = message;
  }
};

// const customError = new CustomError('tag1');
  
export const useFileUpload = (stopRedirectToProfile) => {
    const [dpLoading, setDpLoading] = useState(false);
    const [coverLoading, setCoverLoading] = useState(false);
    const {user, setUser} = useContext(UserContext);
    const [authError, setAuthError] = useState({});
    const router = useRouter();
    const currentProfilePicPublicId = user?.profilePicture?.public_id || '';
    const currentCoverPicPublicId = user?.cover?.public_id || '';

    // TODO: CHECK FOR VALID FILE TYPES AND SIZES

    const changeProfilePicture = (e) => {
        console.log(e.target.files[0]);
        if(e.target.files[0]) {
            setDpLoading(true);
            const formData = new FormData();
            formData.append("file", e.target.files[0]);

            formData.append("upload_preset", "<>"); // Replace the preset name with your own
            formData.append("cloud_name", "<>"); // Replace API key with your own Cloudinary key
            formData.append("folder", "<>");
            formData.append("timestamp", (Date.now() / 1000) | 0);

            axios.post("<>", formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" }
            })
            .then(response => {
                const data = response.data;
                const fileURL = data.secure_url // You should store this URL for future references in your app
                const {public_id} = data;
                const profilePic = {fileURL, public_id}

                if(user?.profilePicture?.public_id) {
                    // If there is already a profie picture in the user Object coming from context, use it's public_id to remove it from cloudinary
                    removePicture(currentProfilePicPublicId);
                }

                axios
                .patch(`<HOSTED_URL>/api/v1/profile/email/${user.email}`, {profilePicture: profilePic})
                .then(res => {
                    const newUser = {...user, profilePicture: profilePic}
                    setUser(newUser);
                })
                .catch(err => {
                console.log(err);
                });

                setDpLoading(false);
                toast.success('Profile picture updated succesfully.');
            })
            .catch( err => {
                setDpLoading(false);
                toast.error('An error occured.');
                console.log(err)
            });
        }
        
        // console.log(e);
    }

    const changeCoverPicture = (e) => {
        console.log('chaning cover picture')
        if(e.target.files[0]) {
            setCoverLoading(true);
            const formData = new FormData();
            formData.append("file", e.target.files[0]);

            formData.append("upload_preset", "<>"); // Replace the preset name with your own
            formData.append("cloud_name", "<>"); // Replace API key with your own Cloudinary key
            formData.append("folder", "<>");
            formData.append("timestamp", (Date.now() / 1000) | 0);

            axios.post("<>", formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" }
            })
            .then(response => {
                const data = response.data;
                const fileURL = data.secure_url // You should store this URL for future references in your app
                const {public_id} = data;
                const coverPic = {fileURL, public_id}

                if(user?.cover?.public_id) {
                    // If there is already a profie picture in the user Object coming from context, use it's public_id to remove it from cloudinary
                    removePicture(currentCoverPicPublicId);
                }

                axios
                .patch(`<HOSTED_URL>/api/v1/profile/email/${user.email}`, {cover: coverPic})
                .then(res => {
                    const newUser = {...user, cover: coverPic}
                    setUser(newUser);
                })
                .catch(err => {
                console.log(err);
                })
            
                setCoverLoading(false);
                toast.success('Cover photo updated!');
            })
            .catch( err => {
                setCoverLoading(false);
                toast.success('An Error Occured');
                console.log(err)
            });
        }
    }

    const removePicture = (public_id) => {        
        const newPublicId = public_id.split('/').join('-');
        fetch(`<HOSTED_URL>/api/v1/profile/deletePhoto/${newPublicId}`, {
            method: 'DELETE',
            })
            .then(res => res.text()) // or res.json()
            .then(res => {
                console.log(res);
            })
            .catch( err => console.log(err));
    }
    return {
        changeProfilePicture,
        changeCoverPicture,
        dpLoading,
        coverLoading
    }
}
