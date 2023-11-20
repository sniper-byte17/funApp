import { useRef } from 'react';
import Img from './Img';
import { Button } from 'antd';
import useMediaUpload from '../hooks/useMediaUpload';
import LoadingSpinner from '../components/LadingSpinner';

const UploadMedia = ({}) => {
  const {
    storeImagesandPreviews, removeImage, saveChanges, imgUrls, images, user, uploadPreviews, loading
  } = useMediaUpload();
  const inputFile = useRef(null);

  return (
    <>
    <h2>New Uploads:</h2>
    <div className='settings-media-wrapper'>
      {
        loading 
        ? <LoadingSpinner />
        :  uploadPreviews.length > 0 && (
          uploadPreviews.map( (img, i) => <Img key={i} src={img} alt="thumbnail" style={{}} className="thumbnail" data-fancybox="gallery" data-src={img} />)
        )
      }
    </div> 
    <form onSubmit={saveChanges}>
      <Button onClick={() => inputFile.current.click()}>Click to Upload</Button>      
      <input
        type="file"
        multiple
        onChange={storeImagesandPreviews}
        className="media-upload-button"
        style={{display: 'none'}}
        ref={inputFile}
      />
      <input type="submit" value="Save" className="form-submit-btn" />
      </form>
      <h2>Already Uploaded:</h2>
      <div className='settings-media-wrapper'>
        {
          loading 
          ? <LoadingSpinner />
          : imgUrls?.length > 0 && (
            imgUrls.map( (img, i) => {
              return (
                <div style={{position: 'relative'}} key={i}>
                  <Img  src={img.fileURL} alt="thumbnail" style={{}} className="thumbnail uploaded-media-thumbnail "/>
                  <button onClick={() => removeImage(img?.public_id, i)} className="thumbnail-remove-icon">X</button>
                </div>
              )
            })
          )
        }
      </div>
    </>
  );
};

export default UploadMedia;
