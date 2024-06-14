import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailLink } from 'firebase/auth';
import { auth, db } from '../components/firebase'; // Adjust the path as necessary
import { doc, getDoc } from 'firebase/firestore';

const EmailChecker = () => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { userEmail } = location.state || {}; 

    useEffect(() => {
        const verifyOTP = async () => {
            try {
                const profileRef = doc(db, 'profiles', userEmail); 
                const profileDoc = await getDoc(profileRef);
        
                if (!profileDoc.exists()) {
                    throw new Error('Profile not found');
                }
        
                const profileData = profileDoc.data();
        
                if (!profileData.otp) {
                    throw new Error('OTP not found for this email');
                }
        
                if (profileData.otp !== pin) {
                    throw new Error('Invalid OTP');
                }
        
                await signInWithEmailLink(auth, userEmail, window.location.href); 
        
                navigate('/details');
            } catch (error) {
                console.error('Error verifying OTP:', error);
                setError(error.message);
            }
        };
        
        if (emailSent) {
            verifyOTP();
        }
    }, [emailSent, pin, navigate, userEmail]); 

    const handleSignIn = async (e) => {
        e.preventDefault();
    
        try {
            if (!userEmail || !pin) {
                throw new Error('Email and PIN are required');
            }
    
            console.log('Attempting sign in with email:', userEmail);
            console.log('Using email link:', window.location.href);
    
            setEmailSent(true);
        } catch (error) {
            console.error('Error signing in:', error);
            setError(error.message);
        }
    };
    
    return (
        <div className="background">
            <form onSubmit={handleSignIn}>
                <div className='flex justify-center rounded-full'>
                    <img className="w-14 rounded-2xl" src="https://res.cloudinary.com/glide/image/fetch/f_auto,h_150,c_limit/https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fglide-prod.appspot.com%2Fo%2Ficon-images%252Fanonymous-b8b74b04-83a5-46d6-a2cc-25e0559d33df.png%3Falt%3Dmedia%26token%3D633ff17b-72a8-49f5-8f96-a06e64af4679" alt="logo" />
                </div>
                <h3 className='text-center pt-7 pb-3 md:pt-7 mt:pb-5 font-bold text-2xl lg:text-2xl'>Check your email</h3>
                <p className='py-6 mb-2 text-center text-sm'>We've sent a pin to {userEmail}</p>
                <div className='mx-2'>
                    <input
                        type="text"
                        placeholder='0000'
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="w-full px-3 rounded-lg py-2 text-white bg-[#363636] focus:outline-none focus:ring-2 focus:ring-[#CE9600] hover:ring-2 hover:ring-[#363636]/30 ease-in-out transition-all"
                    />
                </div>
                <div className='flex justify-center pb-5 pt-6'>
                    <button type="submit" className='bg-[#ce9600] px-20 md:px-32 py-2 rounded-lg cursor-pointer text-white flex items-center gap-2 hover:bg-[#ce9600]/90 transition duration-200 ease-in-out'>Sign In</button>
                </div>
                <p className="text-[#ce9600] font-semibold  text-[11px] md:text-[15px] text-center mt-3 mb-7 cursor-pointer">I need another pin</p>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <p className='text-[11px] md:text-[13px] text-center mt-2'>Don't have an account yet? <span className='text-gray-700 hover:underline cursor-pointer font-bold'>Sign Up</span></p>
            </form>
        </div>
    );
};

export default EmailChecker;
