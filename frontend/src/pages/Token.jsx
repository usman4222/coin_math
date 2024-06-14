import React, { useEffect, useState } from 'react';
import banner from '../assets/images/banner.webp';
import { LuCoins } from 'react-icons/lu';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../components/firebase';

const Token = () => {
  const [isMining, setIsMining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (isMining) {
      const interval = setInterval(() => {
        const now = new Date();
        const elapsed = now - startTime;
        // const percentage = (elapsed / (24 * 60 * 60 * 1000)) * 100;
        const percentage = (elapsed / (60 * 1000)) * 100; 
        setProgress(percentage);

        if (percentage >= 100) {
          clearInterval(interval);
          setIsMining(false);
          setProgress(100);
          updateUserCoins(1); 
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isMining, startTime]);

  const startMining = () => {
    const now = new Date();
    // const end = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const end = new Date(now.getTime() + 60 * 1000);
    setStartTime(now);
    setEndTime(end);
    setIsMining(true);
  };

  const fetchUserProfile = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const docRef = doc(db, 'profiles', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfileData(docSnap.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const updateUserCoins = async (coins) => {
    try {
      const userId = localStorage.getItem('userId');
      const docRef = doc(db, 'profiles', userId);
      await updateDoc(docRef, {
        coins: (profileData.coins || 0) + coins,
      });
      fetchUserProfile(); 
    } catch (error) {
      console.error('Error updating coins:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile(); 
  }, []);

  return (
    <>
      <div className='px-3 lg:px-20 mt-5'>
        <div className='rounded-b-xl overflow-hidden border border-[#262626]'>
          <div className=''>
            <img src={banner} className='md:w-full md:h-56' alt='banner' />
          </div>
          <div className='bg-[#1F1F1F] flex gap-4 px-10 h-24'>
            <div className='mt-[-40px] lg:mt-[-45px]'>
              <div className='overflow-hidden rounded-2xl border border-black'>
                <img
                  className='w-32'
                  src='https://res.cloudinary.com/glide/image/fetch/f_auto,h_150,c_limit/https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fglide-prod.appspot.com%2Fo%2Ficon-images%252Fanonymous-b8b74b04-83a5-46d6-a2cc-25e0559d33df.png%3Falt%3Dmedia%26token%3D633ff17b-72a8-49f5-8f96-a06e64af4679'
                  alt='logo'
                />
              </div>
            </div>
            <div className='flex justify-between w-full mt-2'>
              <div className=''>
                <h2 className='text-white font-bold md:text-2xl'>COIM Generate</h2>
                <p className='text-white md:text-[12px] text-[14px] mt-1'>
                  Generate COIM Tokens!
                </p>
              </div>
            </div>
          </div>
        </div>
        {!isMining && (
          <button className='w-full' onClick={startMining}>
            <div className='bg-[#1F1F1F] text-[#ce9600] rounded-xl mt-7 py-4 p-3 px-3 md:px-10 border border-[#262626]'>
              <div className='flex items-center text-[#ce9600] justify-between hover:bg-[#262626] pr-1 pl-2 py-1.5 cursor-pointer rounded-lg transition-colors duration-100'>
                <h6 className='text-white text-[14px]'>Start Generation!</h6>
                <div className='bg-[#2c281d] rounded-2xl px-3 py-1.5 flex gap-2 items-center'>
                  <div>
                    <LuCoins />
                  </div>
                  <span className='text-[12px]'>Start Mining</span>
                </div>
              </div>
            </div>
          </button>
        )}
        <div className='bg-[#1F1F1F] rounded-xl mt-8 mb-16 py-4 px-10 border border-[#262626]'>
          <div className='flex justify-between w-full text-white'>
            <p className='text-[12px]'>Generation Progress</p>
            <span className='text-[12px]'>{progress.toFixed(2)}%</span>
          </div>
          <div className='mt-4'>
            <div className='bg-[#2c281d] overflow-hidden rounded-md h-2'>
              <div
                className='bg-[#ce9600] h-2'
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className='flex flex-col gap-8 md:flex md:flex-row lg:items-center mt-7'>
            <div className='lg:pr-40'>
              <span className='text-[13px] text-white'>Session Start</span>
              <p className='text-[14px] text-white'>
                {startTime ? startTime.toLocaleString() : 'N/A'}
              </p>
            </div>
            <div className='lg:pr-40'>
              <span className='text-[13px] text-white'>Session End</span>
              <p className='text-[14px] text-white'>
                {endTime ? endTime.toLocaleString() : 'N/A'}
              </p>
            </div>
            <div className='lg:pr-40'>
              <span className='text-[13px] text-white'>COIM Generated</span>
              <p className='text-[14px] text-white'>
                {progress >= 100 ? '1 COIM' : '0 COIM'}
              </p>
            </div>
          </div>
          <div className='flex items-center mt-4'>
            <div className='lg:pr-40'>
              <span className='text-[13px] text-white'>Hourly Rate</span>
              <p className='text-[14px] text-white'>0.140 COIM</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Token;
