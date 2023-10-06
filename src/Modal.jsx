import { useState, useRef, useEffect } from 'react';
import { blobToBase64 } from './utils';

import closeBtn from './assets/media/close-btn.svg'
import retakeBtn from './assets/media/retake-btn.svg'
import shutterBtn from './assets/media/shutter-btn.svg'


export default function Modal({ setIsVisible, usrData, setUsrData }) {
  const [isValidName, setIsValidName] = useState(true);
  const [nameTemp, setNameTemp]=useState(null);
  const videoRef = useRef(null);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error opening camera:', error);
    }
  };

  const handleCaptureImage = async () => {
    try {
      console.log('hello');
      const imageCapture = new ImageCapture(videoRef.current.srcObject.getVideoTracks()[0]);
      const blob = await imageCapture.takePhoto();
      const base64Image = await blobToBase64(blob);
      setUsrData(prev => ({ ...prev, img: base64Image }));
      console.log(blob)
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  };

  const handleRecapture = () => {
    setUsrData(prev => ({ ...prev, img: null }))
    openCamera();
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    const isValid = /^[a-zA-Z\s]*$/.test(newName) && newName.length <= 30;
    if (isValid) {
      setNameTemp(newName)
      setUsrData(prev => ({ ...prev, name: newName }));
    }
    setIsValidName(isValid);
  };

  const handleSave = () => {
    if(!isValidName){
      return alert("Enter characters only and maximum of 30 characters allowed.")
    }
    localStorage.setItem('name', usrData?.name);
    localStorage.setItem('capturedImage', usrData?.img);
    setIsVisible(prev => !prev);
  }

  const handleClose=()=>{
    if(!isValidName){
      return alert("Enter characters only and maximum of 30 characters allowed.")
    }
    setIsVisible(prev => !prev)
  }

  useEffect(() => {
    openCamera();

    let nme = localStorage.getItem('name');
    let capImg = localStorage.getItem('capturedImage');
    setUsrData({ name: nme, img: capImg })
  }, []);

  return (
    <div className='modal'>
      <div className='frame'>
        {usrData?.img ? (
          <img src={usrData?.img} alt="Captured" style={{ width: '100%', height: '100%', objectFit: 'fill', margin: 0 }} />
        ) : (
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}

        {!usrData?.img && (
          <img src={shutterBtn} onClick={handleCaptureImage} className='retake-btn' />
        )}

        {usrData?.img && (
          <img src={retakeBtn} onClick={handleRecapture} className='retake-btn' />
        )}

        <img src={closeBtn} className='close-btn' onClick={handleClose} />

      </div>

      <input
        type="text"
        placeholder="Enter your first name"
        value={usrData?.name}
        onChange={handleNameChange}
        className={isValidName ? 'name-input' : 'name-input invalid'}
      />

      <button className='save-btn' onClick={handleSave}>Save</button>

    </div>
  );
}