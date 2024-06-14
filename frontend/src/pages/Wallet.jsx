import React from 'react'
import banner from '../assets/images/banner.webp'
import rate from '../assets/images/rate.png'


const Wallet = () => {
    return (
        <>
            <div className='px-3 lg:px-20 mt-5'>
                <div className='rounded-b-xl overflow-hidden border border-[#262626]'>
                    <div className=''>
                        <img src={banner} className='md:w-full md:h-56' alt="banner" />
                    </div>
                    <div className='bg-[#1F1F1F] flex gap-4 px-10 h-24'>
                        <div className='mt-[-40px] lg:mt-[-45px]'>
                            <div className='overflow-hidden rounded-2xl  border border-black'>
                                <img className="w-32 " src="https://res.cloudinary.com/glide/image/fetch/f_auto,h_150,c_limit/https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fglide-prod.appspot.com%2Fo%2Ficon-images%252Fanonymous-b8b74b04-83a5-46d6-a2cc-25e0559d33df.png%3Falt%3Dmedia%26token%3D633ff17b-72a8-49f5-8f96-a06e64af4679" alt="logo" />
                            </div>
                        </div>
                        <div className='flex justify-between  w-full  mt-2 '>
                            <div className=''>
                                <h2 className='text-white font-bold md:text-2xl'>My Wallet</h2>
                                <p className='text-white md:text-[12px] text-[14px] mt-1'>Check your $COIM balance.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col bg-[#1F1F1F] rounded-xl mt-8 mb-16 py-8 px-10 border border-[#262626]'>
                    <div className='flex  gap-6 items-center  mb-5'>
                        <div className='overflow-hidden rounded-full '>
                            <img className="w-20 h-20" src="https://res.cloudinary.com/glide/image/fetch/f_auto,h_150,c_limit/https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fglide-prod.appspot.com%2Fo%2Ficon-images%252Fanonymous-b8b74b04-83a5-46d6-a2cc-25e0559d33df.png%3Falt%3Dmedia%26token%3D633ff17b-72a8-49f5-8f96-a06e64af4679" alt="logo" />
                        </div>
                        <div>
                            <span className='text-[12px] text-[#ce9600]'>TOTAL OF</span>
                            <h3 className='text-2xl font-bold text-[#fff]'>3.360</h3>
                            <p className='text-sm text-gray-800'>COIM</p>
                        </div>
                    </div>
                    <div className='  border-t-2 border-[#262626]'>
                        <div className='flex  gap-6 items-center mt-5'>
                            <div className='overflow-hidden rounded-md '>
                                <img className="w-20 h-20" src={rate} alt="logo" />
                            </div>
                            <div>
                                <span className='text-[12px] text-[#ce9600]'>CURRENT RATE</span>
                                <h3 className='text-2xl font-bold text-[#fff]'>0.14</h3>
                                <p className='text-sm text-gray-800'>COIM per hour</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Wallet
