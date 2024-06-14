import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../components/firebase';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const q = query(collection(db, 'profiles'), where('email', '==', email), where('pin', '==', pin));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                const userId = doc.id;
                localStorage.setItem('userId', userId);
                navigate('/profile');
            } else {
                setError('Invalid email or pin.');
            }
        } catch (error) {
            console.error('Error verifying user:', error);
            setError('Error verifying user. Please try again later.');
        }
    };


    return (
        <div className="background">
            <form className='signinform' onSubmit={handleSignIn}>
                <div className='flex justify-center rounded-full'>
                    {/* Your logo image */}
                </div>
                <h3 className='text-center py-7 font-bold text-2xl lg:text-2xl'>Log in to CoinMath</h3>
                <p className='py-6 text-center text-sm'>Please enter your email address</p>
                <input
                    type="text"
                    placeholder='Enter Your Email...'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 mt-3 rounded-lg py-2 text-white bg-[#363636] focus:outline-none focus:ring-2 focus:ring-[#CE9600] hover:ring-2 hover:ring-[#363636]/30 ease-in-out transition-all"
                />
                <input
                    type="password"
                    placeholder='Enter Your Pin...'
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full mt-6 px-3 rounded-lg py-2 text-white bg-[#363636] focus:outline-none focus:ring-2 focus:ring-[#CE9600] hover:ring-2 hover:ring-[#363636]/30 ease-in-out transition-all"
                />
                {error && <p className='text-red-500 text-center mt-2'>{error}</p>}
                <label className="flex items-center mt-3">
                    {/* Checkbox for privacy policy */}
                </label>
                <div className='flex justify-center pb-5 pt-1'>
                    <button type="submit" className='bg-[#ce9600] px-20 mt-4 md:px-32 py-2 rounded-lg cursor-pointer text-white flex items-center gap-2 hover:bg-[#ce9600]/90 transition duration-200 ease-in-out'>Continue</button>
                </div>
                <p className='text-[11px] md:text-[13px] text-center mt-2'>Don't have an account yet? <Link to="/signup"><span className='text-gray-700 hover:underline cursor-pointer font-bold'>Sign Up</span></Link></p>
            </form>
        </div>
    );
};

export default SignIn;



