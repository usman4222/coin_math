import React from 'react'
import banner from '../assets/images/banner.webp'
import { FaArrowRight } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { RiYoutubeFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { TbArrowGuide } from "react-icons/tb";
import { Link } from 'react-router-dom';



const Main = () => {
    return (
        <>
            <div className='px-3 lg:px-20 mt-5'>
                <div className='rounded-b-xl overflow-hidden border border-[#262626]'>
                    <div className=''>
                        <img src={banner} className='w-full md:h-56' alt="banner" />
                    </div>
                    <div className='bg-[#1F1F1F] flex flex-col md:flex md:flex-row gap-4 px-10 '>
                        <div className='mt-[-40px] lg:mt-[-60px]'>
                            <div className='overflow-hidden md:rounded-2xl  md:border border-black'>
                                <img className="md:w-32 w-20" src="https://res.cloudinary.com/glide/image/fetch/f_auto,h_150,c_limit/https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fglide-prod.appspot.com%2Fo%2Ficon-images%252Fanonymous-b8b74b04-83a5-46d6-a2cc-25e0559d33df.png%3Falt%3Dmedia%26token%3D633ff17b-72a8-49f5-8f96-a06e64af4679" alt="logo" />
                            </div>
                        </div>
                        <div className='flex flex-col md:flex md:flex-row justify-between pb-9 w-full  mt-2 lg:mt-6'>
                            <div className=''>
                                <h2 className='text-white font-bold text-2xl'>CoinMath</h2>
                            </div>
                            <div className='mt-5 md:mt-0'>
                                <div className='flex gap-2 md:mt-2'>
                                    <button className='bg-[#ce9600] px-3 py-2 rounded-lg cursor-pointer text-white flex items-center gap-2 hover:bg-[#ce9600]/90 transition duration-200 ease-in-out'><AiOutlineQuestionCircle className='text-xl' />About</button>
                                    <button className='bg-transparent border border-gray-500 px-3 py-1 rounded-lg flex items-center gap-2 text-white cursor-pointer hover:bg-white/10 transition duration-200 ease-in-out'><TbArrowGuide className='text-xl' />
                                        Guide
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-6 bg-[#1F1F1F] rounded-xl my-7 py-8 px-10 border border-[#262626]'>
                    <div className='overflow-hidden rounded-full '>
                        <img className="w-20 h-20" src="https://res.cloudinary.com/glide/image/fetch/f_auto,h_150,c_limit/https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fglide-prod.appspot.com%2Fo%2Ficon-images%252Fanonymous-b8b74b04-83a5-46d6-a2cc-25e0559d33df.png%3Falt%3Dmedia%26token%3D633ff17b-72a8-49f5-8f96-a06e64af4679" alt="logo" />
                    </div>
                    <div>
                        <span className='text-[12px] text-[#ce9600]'>WALLET BALANCE</span>
                        <h3 className='text-2xl font-bold text-[#fff]'>0.009</h3>
                        <p className='text-sm text-gray-800'>COIM</p>
                    </div>
                </div>
                <div className=' bg-[#1F1F1F] text-[#ce9600] rounded-xl mt-7 mb-5 py-8 px-10 border border-[#262626]'>
                    <Link to="/token">
                        <div className='flex items-center justify-between hover:bg-[#262626] cursor-pointer pr-1 pl-2 py-1 rounded-lg transition-colors duration-100'>
                            <h6 className='text-white'>COIM Generation</h6>
                            <div className=' bg-[#2c281d] rounded-2xl px-2 py-2  flex gap-2 items-center'>
                                <div><FaArrowRight /></div>
                                <span>Minnnig</span>
                            </div>
                        </div>
                    </Link>
                    <Link to="/wallet">
                        <div className='flex items-center text-[#ce9600] justify-between mt-7  hover:bg-[#262626] pr-1 pl-2 py-1 cursor-pointer rounded-lg transition-colors duration-100'>
                            <h6 className='text-white'>Wallet</h6>
                            <div className=' bg-[#2c281d] rounded-2xl px-2 py-2  flex gap-2 items-center'>
                                <div><FaArrowRight /></div>
                                <span>Wallet</span>
                            </div>
                        </div>
                    </Link>
                    <Link to="/ref">
                        <div className='flex items-center text-[#ce9600] justify-between mt-7  hover:bg-[#262626] pr-1 pl-2 py-1 cursor-pointer rounded-lg transition-colors duration-100'>
                            <h6 className='text-white'>Refferals</h6>
                            <div className=' bg-[#2c281d] rounded-2xl px-2 py-2  flex gap-2 items-center'>
                                <div><FaArrowRight /></div>
                                <span>Refferals</span>
                            </div>
                        </div>
                    </Link>
                    <Link to="/news">
                        <div className='flex items-center text-[#ce9600] justify-between mt-7  hover:bg-[#262626] pr-1 pl-2 py-1 cursor-pointer rounded-lg transition-colors duration-100'>
                            <h6 className='text-white'>News</h6>
                            <div className=' bg-[#2c281d] rounded-2xl px-2 py-2  flex gap-2 items-center'>
                                <div><FaArrowRight /></div>
                                <span>News</span>
                            </div>
                        </div>
                    </Link>
                    <Link to="/profile">
                        <div className='flex items-center text-[#ce9600] justify-between mt-7  hover:bg-[#262626] pr-1 pl-2 py-1 cursor-pointer rounded-lg transition-colors duration-100'>
                            <h6 className='text-white'>My Profile</h6>
                            <div className=' bg-[#2c281d] rounded-2xl px-2 py-2  flex gap-2 items-center'>
                                <div><FaArrowRight /></div>
                                <span>My Profile</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div>
                    <div className='flex items-center justify-center gap-5 pb-20'>
                        <div className='bg-[#2c281d] rounded-2xl cursor-pointer pl-2 pr-2 md:pr-6 py-1 text-[#ce9600]'><FaTwitter /></div>
                        <div className='bg-[#2c281d] rounded-2xl cursor-pointer pl-2 pr-2 md:pr-6 py-1 text-[#ce9600]'><FaFacebookF /></div>
                        <div className='bg-[#2c281d] rounded-2xl cursor-pointer pl-2 pr-2 md:pr-6 py-1 text-[#ce9600]'><AiFillInstagram /></div>
                        <div className='bg-[#2c281d] rounded-2xl cursor-pointer pl-2 pr-2 md:pr-6 py-1 text-[#ce9600]'><SiGmail /></div>
                        <div className='bg-[#2c281d] rounded-2xl cursor-pointer pl-2 pr-2 md:pr-6 py-1 text-[#ce9600]'> <RiYoutubeFill /></div>
                        <div className='bg-[#2c281d] rounded-2xl cursor-pointer pl-2 pr-2 md:pr-6 py-1 text-[#ce9600] flex  items-center gap-2'><FaTelegramPlane /><span className='hidden md:block'>Telegram</span></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main
