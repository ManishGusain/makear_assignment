import { useState, useEffect } from 'react';
import Modal from './Modal';

import milkybarlogo from './assets/media/milkybar-logo.svg'
import homeIcon from './assets/media/home-icon.svg'
import sourvenirIcon from './assets/media/sourvenirs.svg'
import passportIcon from './assets/media/passport.svg'
import editIcon from './assets/media/edit-icon.svg'
import profileIcon from './assets/media/profile-icon.svg'
import worldMap from './assets/media/world-map.svg'
import bg from './assets/media/bg.svg';
import downloadIcon from './assets/media/download-icon.svg';


export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [usrData, setUsrData] = useState({ name: null, img: null });

  const handleDownload = () => {
    if (usrData.img) {
      const downloadLink = document.createElement('a');
      downloadLink.href = usrData.img;
      downloadLink.download = 'profile.png';
      downloadLink.click();
    }
  };

  useEffect(() => {
    try {
      let nme = localStorage.getItem('name');
      let capImg = localStorage.getItem('capturedImage');
      if (nme !== null && capImg !== null) {
        setUsrData({ name: nme, img: capImg });
      } else {
        console.error('Missing data in localStorage');
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);


  return (
    <div>
      <div className='container'>

        <img src={bg} className='bg' />

        {isVisible ?
          <Modal setIsVisible={setIsVisible} usrData={usrData} setUsrData={setUsrData} />
          : null
        }

        <div className='branding-container'>
          <img src={milkybarlogo} />

          <div className='branding-rhs'>
            <img src={sourvenirIcon} />
            <img src={homeIcon} />
          </div>
        </div>

        <img src={passportIcon} style={{ paddingLeft: '10px' }} />

        <div className='passport-container'>
          <div className='p-top'>
            <div className='profile-icon-wrapper'>
              <img src={usrData?.img !== null ? usrData?.img : profileIcon} className='profile-img' onClick={usrData?.img !== '' ? () => setIsVisible(prev => !prev) : null} />
              <img src={editIcon} className='edit-icon' onClick={() => setIsVisible(prev => !prev)} />
            </div>

            <div className='usr-name-wrapper'>
              <p>NAME</p>
              <p>{usrData?.name !== '' ? usrData?.name : 'NAME'}</p>
              <p>I'M READY TO DISCOVER THE WORLD!</p>
            </div>
          </div>

          <div className='p-bottom'>
            <p>Continents Explored</p>
            <img src={worldMap} />
          </div>
        </div>

        <div className='download-btn-wrapper'>
          <button className='download-btn' onClick={handleDownload}><img src={downloadIcon} className='download-icon' />Download</button>
        </div>
      </div>

    </div>
  );
}