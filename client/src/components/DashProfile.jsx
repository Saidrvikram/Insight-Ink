import { useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, TextInput } from 'flowbite-react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Firebase imports
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function DashProfile() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const filePickerRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const maxSizeInBytes = 2 * 1024 * 1024; // 2MB file size limit

        if (file) {
            // Validate file size
            if (file.size > maxSizeInBytes) {
                setImageFileUploadError('File size exceeds 2 MB. Please select a smaller file.');
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                return;
            }
            setImageFileUploadError(null); // Clear any previous error
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file)); // Preview before upload
        }
    };

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        try {
          setImageFileUploadError(null);
            const storage = getStorage(app); // Initialize storage
            const fileName = new Date().getTime() + imageFile.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageFileUploadProgress(progress.toFixed(0)); // Set upload progress
                },
                (error) => {
                    setImageFileUploadError('Could not upload image due to an error.');
                },
                async () => {
                    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    setImageFileUrl(downloadUrl); // Set image URL after upload
                }
            );
        } catch (error) {
            setImageFileUploadError('Could not upload image (unexpected error).');
        }
    };

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='text-white my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />

                <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
                  {imageFileUploadProgress && (
                    <CircularProgressbar value={imageFileUploadProgress || 0} text={ `${imageFileUploadProgress} % `}
                    strokeWidth={5}
                    styles={{
                      root:{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                      },
                      path: {
                        stroke: `rgba(166,90,223, ${imageFileUploadProgress / 100})`,
                      }
                    }}
                    />
                  )}
                    <img src={imageFileUrl || currentUser?.profilePicture} alt='user' className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' />
                </div>

                {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}

                <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser?.username} />
                <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser?.email} />
                <TextInput type='password' id='password' placeholder='password' />
                <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                    Update
                </Button>
            </form>
            <div className='text-red-500 flex justify-between mt-5'>
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
        </div>
    );
}

export default DashProfile;
