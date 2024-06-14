import React from 'react'
import bg from '../assets/images/bg.jpg'
import { Link } from 'react-router-dom'

const SignUp = () => {
    return (
        <div className="background">
            <form>
                <div className='flex justify-center rounded-full'>
                    <img className="w-14 rounded-2xl" src="https://res.cloudinary.com/glide/image/fetch/f_auto,h_150,c_limit/https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fglide-prod.appspot.com%2Fo%2Ficon-images%252Fanonymous-b8b74b04-83a5-46d6-a2cc-25e0559d33df.png%3Falt%3Dmedia%26token%3D633ff17b-72a8-49f5-8f96-a06e64af4679" alt="logo" />
                </div>
                <h3 className='text-center pt-7 pb-3 md:py-7 font-bold text-2xl lg:text-2xl'>Sign up to CoinMath</h3>
                <p className='py-6 text-center text-sm'>Please enter your email address</p>
                <input
                    type="text"
                    placeholder='Enter Your Email...'
                    // onChange={(e) => setEmail(e.target.value)}
                    // required
                    className="w-full px-3 rounded-lg py-2 text-white bg-[#363636] focus:outline-none focus:ring-2 focus:ring-[#CE9600] hover:ring-2 hover:ring-[#363636]/30 ease-in-out transition-all"
                />
                <label className="flex items-center mt-3">
                    <div className="inline-flex items-center">
                        <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="green">
                            <input type="checkbox" className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-amber-500 checked:bg-amber-500 checked:before:bg-amber-500 hover:before:opacity-10" id="green" checked />
                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </span>
                        </label>
                    </div>
                    <p className="text-white text-[11px] md:text-[13px]">I have read and agree to the<span className='text-gray-700 hover:underline cursor-pointer font-bold'> Privacy Policy</span></p>
                </label>
                <div className='flex justify-center pb-5 pt-1'>
                    <button className='bg-[#ce9600] px-20 md:px-32 py-2 rounded-lg cursor-pointer text-white flex items-center gap-2 hover:bg-[#ce9600]/90 transition duration-200 ease-in-out'>Continue</button>
                </div>
                <p className='text-[11px] md:text-[13px] text-center mt-2'>Already have an account? <Link to="/signin"><span className='text-gray-700 hover:underline cursor-pointer font-bold'>Customer log in</span></Link></p>
            </form>
        </div>

    )
}

export default SignUp
