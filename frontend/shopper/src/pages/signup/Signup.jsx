import React from 'react'
import {MdOutlineEmail} from "react-icons/md"
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser } from 'react-icons/ai'
import {IoLockClosedOutline} from "react-icons/io5"
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='container my-8 flex justify-center items-center min-h-screen'>
      <div className="w-120 rounded-md shadow-lg shadow-gray-500 py-8 px-5">
        <div className="header text-center">
            <h2 className='text-3xl'>Create An<b className='text-blue-500 text-3xl'> Account</b> </h2>
            <p className='leading-10'>Sign up to start shopping</p>
        </div><br />

        <form className='flex flex-col justify-start' action="">
            <div className='relative mb-5'>
                <div>
                    <label htmlFor="name">Full Name</label>
                </div>
                <div className='mt-2'>
                    <input className='outline-1 outline-blue-500 pl-10 pr-3 py-2.5 w-full rounded' id='name' type="text" placeholder='Ade Tiger'  />
                    <AiOutlineUser className='absolute top-10.5 left-1.5 text-gray-300' size={25} />
                </div>
                
            </div>

            <div className='relative mb-5'>
                <div>
                    <label htmlFor="email">Email Address</label>
                </div>
                <div className='mt-2'>
                    <input className='outline-1 outline-blue-500 pl-10 pr-3 py-2.5 w-full rounded' id='email' type="text" placeholder='your@email.com'  />
                    <MdOutlineEmail className='absolute top-11 left-1.5 text-gray-300' size={25} />
                </div>
                
            </div>

            <div className='relative mb-5'>
                <div>
                    <label htmlFor="email">Password</label>
                </div>
                <div className='mt-2'>
                    <input className='outline-1 outline-blue-500 pl-10 pr-3 py-2.5 w-full rounded' id='email' type="text" placeholder='Enter your password'  />
                    <IoLockClosedOutline className='absolute top-11 left-1.5 text-gray-300' size={25} />
                    <AiOutlineEye className='absolute top-11 right-1.5 text-gray-300' size={25} />
                </div>
            </div>

            <div className='relative'>
                <div>
                    <label htmlFor="password">Confirm Password</label>
                </div>
                <div className='mt-2'>
                    <input className='outline-1 outline-blue-500 pl-10 pr-3 py-2.5 w-full rounded' id='password' type="text" placeholder='Confirm your password'  />
                    <IoLockClosedOutline className='absolute top-11 left-1.5 text-gray-300' size={25} />
                    <AiOutlineEye className='absolute top-11 right-1.5 text-gray-300' size={25} />
                </div>
            </div>
            <div className='flex items-center text-sm space-x-2 my-5'>
                <input className='w-4 h-4 accent-blue-500' type="checkbox" />
                <span>I agree to the <b className='text-blue-500 font-semibold'>Terms of Service</b> and <b className='text-blue-500 font-semibold'>Privacy Policy</b></span>
            </div>
            <button className="w-full bg-blue-500 text-white py-2.5 rounded-md font-semibold hover:bg-black" type='submit'>Create Account</button>
        </form>
        <div className="text-center mt-5">
            <Link to={'/login'}>Already have an account? <b className='text-blue-500'>Sign In</b></Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
