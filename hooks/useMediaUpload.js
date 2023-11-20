import {useState, useEffect, useContext} from 'react';
import { UserContext } from '../lib/context';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function useMediaUpload() {
    const [imgUrls, setImgUrls] = useState([]);
    const [images, setImages] = useState([]);
    const [uploadPreviews, setUploadPreviews] = useState([]);
    const {user, setUser} = useContext(UserContext);
    const [changesOccured, setChangesOccured] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect( () => {
        axios
        .get(`<HOSTED_URL>/api/v1/profile/email/${user.email}`)
        .then(res => {
        setImgUrls(res.data.data[0].photos)
        })
        console.log(imgUrls);
    }, []);

    const saveChanges = (e) => {
        const urls = [];
        setLoading(true);
        e.preventDefault();
        // Push all the axios request promise into a single array
        const uploaders = images.map(file => {
          // Initial FormData
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "fun-findrr"); // Replace the preset name with your own
          formData.append("cloud_name", "zepticona"); // Replace API key with your own Cloudinary key
          formData.append("folder", "funFinderTestingImageFolder1");
          formData.append("timestamp", (Date.now() / 1000) | 0);
          
          // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
          return axios.post("https://api.cloudinary.com/v1_1/zepticona/upload", formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" }
          })
          .then(response => {
            const data = response.data;
            const fileURL = data.secure_url // You should store this URL for future references in your app
            // const urls = [...imgUrls, fileURL];
            // console.log(urls);
            const upload = {
              fileURL: fileURL, 
              public_id: data.public_id
            }
            urls.push(upload)
          })
        });
    
        // Once all the files are uploaded 
        axios.all(uploaders).then(() => {
          const photos = [...imgUrls, ...urls]
          console.log(photos);
          
          // ... perform after upload is successful operation
          axios
            .patch(`<HOSTED_URL>/api/v1/profile/email/${user.email}`, {photos: photos})
            .then(res => {
              setImgUrls(photos);
              const newUser = {...user, photos: photos}
              setUser(newUser);
              setUploadPreviews([]);
              setLoading(false);
              toast.success('Images uploaded succesfully...');
            })
            .catch(err => {
              toast.error('An error occured.');
              console.log(err);
            })
        });
      }

    const storeImagesandPreviews = (e) => {
        if (e.target.files) {
            setLoading(true);
            /* Get files in array form */
            const files = Array.from(e.target.files);

            /* Map each file to a promise that resolves to an array of image URI's */ 
            Promise.all(files.map(file => {
              return (new Promise((resolve,reject) => {
                  const reader = new FileReader();
                  reader.addEventListener('load', (ev) => {
                      resolve(ev.target.result);
                  });
                  reader.addEventListener('error', reject);
                  reader.readAsDataURL(file);
              }));
            }))
            .then(images => {

              /* Once all promises are resolved, update state with image URI array */         
              setUploadPreviews(imgURIs => images);

              // Store images for uploading into cloudinary
              setImages(imgs => files);
              setLoading(false);
            }, error => {       
                toast.error('An error occured.');
                setLoading(false); 
                console.error(error);
            });
        }
    }    

    const directlyUploadimages = (e) => {
        e.preventDefault();

        if(!e.target.files) return;
        setLoading(true);
        const urls = [];
        const images = Array.from(e.target.files);
        // Push all the axios request promise into a single array
        const uploaders = images.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "fun-findrr"); // Replace the preset name with your own
            formData.append("cloud_name", "zepticona"); // Replace API key with your own Cloudinary key
            formData.append("folder", "funFinderTestingImageFolder1");
            formData.append("timestamp", (Date.now() / 1000) | 0);
            
            // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
            return axios.post("https://api.cloudinary.com/v1_1/zepticona/upload", formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" }
            })
            .then(response => {
            const data = response.data;
            const fileURL = data.secure_url // You should store this URL for future references in your app
            // const urls = [...imgUrls, fileURL];
            // console.log(urls);
            const upload = {
                fileURL: fileURL, 
                public_id: data.public_id
            }
            urls.push(upload)
            })
        });

        // Once all the files are uploaded 
        axios.all(uploaders).then(() => {
            const photos = [...imgUrls, ...urls]
            console.log(photos);
            
            // ... perform after upload is successful operation
            axios
            .patch(`<HOSTED_URL>/api/v1/profile/email/${user.email}`, {photos: photos})
            .then(res => {
                setImgUrls(photos);
                const newUser = {...user, photos: photos}
                setUser(newUser);
                setUploadPreviews([]);
                setLoading(false);
                toast.success('Upload succecsful!');
            })
            .catch(err => {
                toast.error('An Error Occured!')
                console.log(err);
            })
        });
    }
    
    
  const removeImage = (public_id, i) => {
    console.log(public_id);
    const newPublicId = public_id.split('/').join('-');
    const prevImages = [...imgUrls];
    const newImgs = prevImages.filter((item, indx) => item.public_id !== public_id);
    setLoading(true);
    fetch(`<HOSTED_URL>/api/v1/profile/deletePhoto/${newPublicId}`, {
      method: 'DELETE',
    })
    .then(res => res.text()) // or res.json()
    .then(res => {
      setImgUrls(newImgs);
      axios
        .patch(`<HOSTED_URL>/api/v1/profile/email/${user.email}`, {photos: newImgs})
        .then(res => {
          setImgUrls(newImgs);
          const newUser = {...user, photos: newImgs};
          console.log('newUser'+ newUser);
          setUser(newUser);
          setUploadPreviews([]);
          setLoading(false);
          toast.success('Deleted Succesfully.');
        })
        .catch(err => {
            toast.error('An Error Occured');
          console.log(err);
          setLoading(false);
        })
    })
    .catch( err => {
      console.log(err);
      setLoading(false);
    });
  }

  const findChanges = () => {
    if(!user) return;

    user.photos.length !== img
  }

  const saveImage = () => {

  }

  return {
    storeImagesandPreviews, removeImage, saveChanges, imgUrls, images, user, uploadPreviews, directlyUploadimages, loading
}
    
}