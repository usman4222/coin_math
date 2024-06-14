import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db, storage } from '../components/firebase';
import { SiTicktick } from 'react-icons/si';
import { LuLink } from 'react-icons/lu';
import { FaImage } from 'react-icons/fa';
import banner from '../assets/images/banner.webp';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileDetail = () => {
    const navigate = useNavigate();

    const [Fname, setFname] = useState('');
    const [surName, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [phone, setPhone] = useState('');
    const [refBy, setRefBy] = useState('');
    const [refCode, setRefCode] = useState('');
    const [image, setImage] = useState(null);
    const [chosenImage, setChosenImage] = useState(null);
    const [referralCodeExists, setReferralCodeExists] = useState(false);
    const [referrerID, setReferrerID] = useState(null);

    const handleProfileDetails = async (e) => {
        e.preventDefault();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        try {

            if (!emailPattern.test(email)) {
                throw new Error('Invalid email format.');
            }

            const emailQuerySnapshot = await getDocs(query(collection(db, 'profiles'), where('email', '==', email)));
            if (!emailQuerySnapshot.empty) {
                throw new Error('Email already exists');
            }

            const refCodeQuerySnapshot = await getDocs(query(collection(db, 'profiles'), where('referralCode', '==', refCode)));
            if (!refCodeQuerySnapshot.empty) {
                throw new Error('Referral code already exists');
            }

            if (refBy && !referralCodeExists) {
                alert('Friend Referral code does not exist');
                return;
            }

            const imageRef = await uploadImage();
            await addDoc(collection(db, 'profiles'), {
                email: email,
                firstName: Fname,
                surname: surName,
                pin: pin,
                phone: phone,
                referralByCode: refBy,
                referralCode: refCode,
                imageUrl: imageRef,
                referrerID: referrerID
            });
            console.log("Document successfully written!");

            setFname('');
            setSurname('');
            setEmail('');
            setPin('');
            setPhone('');
            setRefBy('');
            setRefCode('');
            setChosenImage(null);

            navigate('/signin');
        } catch (error) {
            console.error('Error storing profile details:', error);
            if (error.message === 'Email already exists') {
                alert('Email already exists');
            } else if (error.message === 'Referral code already exists') {
                alert('Referral code already exists');
            }
            else if ("Invalid email format.") {
                alert("Invalid email format.")
            } else {
                console.log(error.message, "Other errors");
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setChosenImage(file ? file.name : null);
    };

    const uploadImage = async () => {
        if (!image) return '';

        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        return getDownloadURL(storageRef);
    };

    const checkReferralCode = async () => {
        if (!refBy) return;

        const refCodeQuerySnapshot = await getDocs(query(collection(db, 'profiles'), where('referralCode', '==', refBy)));
        if (refCodeQuerySnapshot.empty) {
            setReferralCodeExists(false);
            setReferrerID(null);
            alert('Friend Referral code does not exist');
        } else {
            setReferralCodeExists(true);
            const doc = refCodeQuerySnapshot.docs[0];
            setReferrerID(doc.id);
        }
    };

    return (
        <div className='px-56'>
            <div className='rounded-b-xl overflow-hidden border border-[#262626]'>
                <div className=''>
                    <img src={banner} className='w-full md:h-56' alt="banner" />
                </div>
                <div className='bg-[#1F1F1F] gap-4 px-10 '>
                    <div className='mt-[-40px] flex justify-center lg:mt-[-60px]'>
                        <div className='overflow-hidden md:rounded-full  md:border border-black'>
                            <img className="md:w-32 w-20" src="https://res.cloudinary.com/glide/image/fetch/f_auto,h_150,c_limit/https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fglide-prod.appspot.com%2Fo%2Ficon-images%252Fanonymous-b8b74b04-83a5-46d6-a2cc-25e0559d33df.png%3Falt%3Dmedia%26token%3D633ff17b-72a8-49f5-8f96-a06e64af4679" alt="logo" />
                        </div>
                    </div>
                    <div className=' pb-9 w-full  mt-2 lg:mt-6'>
                        <div className=''>
                            <h2 className='text-white text-center font-bold text-2xl'>CoinMath</h2>
                            <p className='text-white text-center py-2'>Welcome to CoinMath. Fill out the required details below to complete your onboarding and start generate $COIM!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center gap-6 bg-[#1F1F1F] rounded-xl my-7   border border-[#262626]'>
                <form onSubmit={handleProfileDetails} className='  bg-[#1F1F1F]'>
                    <div className=''>
                        <div className=''>
                            <div className="relative px-6 pt-6 mb-3 flex text-white">
                                <h6 className="font-bold text-[16px]">First Name</h6>
                            </div>
                            <div className="pb-5 px-6">
                                <input
                                    type="text"
                                    onChange={(e) => setFname(e.target.value)}
                                    value={Fname}
                                    required
                                    className="w-full px-3 rounded-lg py-2 text-white bg-[#363636] focus:outline-none focus:ring-2 focus:ring-[#CE9600] hover:ring-2 hover:ring-[#363636]/30 ease-in-out transition-all"
                                />
                            </div>
                        </div>
                        <div className=''>
                            <div className="relative px-6 pt-2 mb-3 flex text-white">
                                <h6 className="font-bold text-[16px]">Surname</h6>
                            </div>
                            <div className="pb-5 px-6">
                                <input
                                    type="text"
                                    onChange={(e) => setSurname(e.target.value)}
                                    value={surName}
                                    required
                                    className="w-full px-3 rounded-lg py-2 text-white bg-[#363636] focus:outline-none focus:ring-2 focus:ring-[#CE9600] hover:ring-2 hover:ring-[#363636]/30 ease-in-out transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="relative px-6 pt-2 mb-3 flex text-white">
                                <h6 className="font-bold text-[16px]">Profile Image</h6>
                            </div>
                            <div className="pb-5 px-6">
                                <div className="flex items-center justify-center">
                                    <label className="w-full flex gap-3 items-center px-3 py-2 bg-[#363636] text-white rounded-lg cursor-pointer hover:bg-[#4a4a4a] focus-within:ring-2 focus-within:ring-[#CE9600] hover:ring-2 hover:ring-[#363636]/30 transition-all ease-in-out">
                                        <FaImage className="text-xl mb-1 text-[#5F5F5F]" />
                                        <span className="text-[#5F5F5F]">
                                            {chosenImage || 'Choose an image...'}
                                        </span>
                                        <input
                                            type="file"
                                            className="opacity-0 w-0 h-0"
                                            onClick={(e) => e.target.value = null}
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <div className="relative px-6 pt-2 mb-3 flex text-white">
                                <h6 className="font-bold text-[16px]">Email</h6>
                            </div>
                            <div className="pb-5 px-6">
                                <input
                                    type="text"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    className="w-full px-3 rounded-lg py-2 text-white bg-[#363636] focus:outline-none focus:ring-2 focus:ring-[#CE9600] hover:ring-2 hover:ring-[#363636]/30 ease-in-out transition-all"
                                />
                            </div>
                        </div>
                        <div className=''>
                            <div className="relative px-6 pt-2 mb-3 flex text-white">
                                <h6 className="font-bold text-[16px]">Pin</h6>
                            </div>
                            <div className="pb-5 px-6">
                                <input
                                    type="password"
                                    onChange={(e) => setPin(e.target.value)}
                                    value={pin}
                                    required
                                    className="w-full px-3 rounded-lg py-2 text-white bg-[#363636] focus:outline-none focus:ring-2 focus:ring-[#CE9600] hover:ring-2 hover:ring-[#363636]/30 ease-in-out transition-all"
                                />
                            </div>
                        </div>
                        <div className=''>
                            <div className="relative px-6 pt-2 mb-3 flex text-white">
                                <h6 className="font-bold text-[16px]">Phone Number</h6>
                            </div>
                            <div className="pb-5 px-6">
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        const enteredValue = e.target.value.replace(/\D/g, '');
                                        setPhone(enteredValue);
                                    }}
                                    value={phone}
                                    required
                                    className="w-full px-3 rounded-lg py-2 text-white bg-[#363636] focus:outline-none focus:ring-2 focus:ring-[#CE9600] hover:ring-2 hover:ring-[#363636]/30 ease-in-out transition-all"
                                    pattern="[0-9]*"
                                />
                            </div>
                        </div>
                        <div className='border-b-2 border-[#262626] mx-5 mb-2'></div>
                        <div>
                            <div className="relative px-6 pt-2 mb-3 flex text-white">
                                <h6 className="font-bold text-[16px]">Referred by a friend? (Optional)</h6>
                            </div>
                            <div className="pb-5 px-6">
                                <input
                                    type="text"
                                    onChange={(e) => setRefBy(e.target.value)}
                                    value={refBy}
                                    placeholder='Enter your referral code here...'
                                    onBlur={checkReferralCode}
                                    className="w-full px-3 rounded-lg py-2 text-white bg-[#363636] focus:outline-none focus:ring-2 focus:ring-[#CE9600] hover:ring-2 hover:ring-[#363636]/30 ease-in-out transition-all"
                                />
                            </div>
                        </div>
                        <div className='border-b-2 border-[#262626] mx-5 '></div>
                        <div className='flex md:items-center gap-5 px-5 mx-4 py-3 my-5 rounded-xl bg-[#443919]'>
                            <div><LuLink /></div>
                            <h6 className='text-white'>Your referral code will be a randomly generated string of characters. If you'd like to create your own unique code instead, please use the text box below.</h6>
                        </div>
                        <div className=''>
                            <div className="relative px-6 pt-2 mb-3 flex text-white">
                                <h6 className="font-bold text-[16px]">My Custom Referral Code</h6>
                            </div>
                            <div className="pb-5 px-6">
                                <input
                                    type="text"
                                    onChange={(e) => setRefCode(e.target.value)}
                                    value={refCode}
                                    required
                                    placeholder='Enter your custom referral code here...'
                                    className="w-full px-3 rounded-lg py-2 text-white bg-[#363636] focus:outline-none focus:ring-2 focus:ring-[#CE9600] hover:ring-2 hover:ring-[#363636]/30 ease-in-out transition-all"
                                />
                            </div>
                        </div>
                        <div className="mb-10 mt-4">
                            <div className="flex items-center justify-center ">
                                <button
                                    className="text-white px-48 bg-[#CE9600] hover:bg-[#CE9600]/90 justify-center mx-5 md:mx-0  my-3 lg:mx-80 rounded-lg cursor-pointer border-solid border-blueGray-200 flex items-center gap-2 background-transparent font-bold  py-2.5 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                    disabled={refBy && !referralCodeExists}
                                    style={{ cursor: refBy && !referralCodeExists ? 'not-allowed' : 'pointer' }}
                                >
                                    <SiTicktick />  Onboard me!
                                </button>
                            </div>
                        </div>
                        <p className='text-[11px] md:text-[13px] text-center mt-2 text-white mb-6'>Already have an account? <Link to="/signin"><span className='text-gray-700 hover:underline cursor-pointer font-bold'>Sign In</span></Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileDetail;
