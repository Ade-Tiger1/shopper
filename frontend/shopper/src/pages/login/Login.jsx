import {useContext} from 'react'
import {MdOutlineEmail} from "react-icons/md"
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import {IoLockClosedOutline} from "react-icons/io5"
import { Link } from 'react-router-dom'
import { ShopperContext } from '../../context/Context'

const Login = () => {
    const {loginInput, loginChange, loginSubmit} = useContext(ShopperContext)
    


  return (
    <div className='container flex justify-center items-center min-h-screen'>
      <div className="w-120 rounded-md shadow-lg shadow-gray-500 py-8 px-5">
        <div className="header text-center">
            <h2 className='text-3xl'><b>Welcome To</b><b className='text-blue-500 text-3xl'> Shopper</b> </h2>
            <p className='leading-10'>Sign into your account to continue</p>
        </div><br />

        <form className='flex flex-col justify-start' action="" onSubmit={loginSubmit}>
            <div className='relative mb-5'>
                <div>
                    <label htmlFor="email">Email Address</label>
                </div>
                <div className='mt-2'>
                    <input name='email' className='outline-1 outline-blue-500 pl-10 pr-3 py-2.5 w-full rounded' id='email' type="text" placeholder='your@email.com' value={loginInput.email} onChange={loginChange} />
                    <MdOutlineEmail className='absolute top-11 left-1.5 text-gray-300' size={25} />
                </div>
                
            </div>

            <div className='relative'>
                <div>
                    <label htmlFor="email">Password</label>
                </div>
                <div className='mt-2'>
                    <input name='password' className='outline-1 outline-blue-500 pl-10 pr-3 py-2.5 w-full rounded' id='password' type="text" placeholder='Enter your password' value={loginInput.password} onChange={loginChange} />
                    <IoLockClosedOutline className='absolute top-11 left-1.5 text-gray-300' size={25} />
                    <AiOutlineEye className='absolute top-11 right-1.5 text-gray-300' size={25} />
                </div>
            </div>
            <Link className='text-end my-3 text-blue-500 font-semibold'>Forgot Password?</Link>
            <button className="w-full bg-blue-500 text-white py-2.5 rounded-md font-semibold hover:bg-black" type='submit'>Sign In</button>
        </form>
        <div className="text-center mt-5">
            <Link to={'/register'}>Dont have an account? <b className='text-blue-500'>Sign up</b></Link>
        </div>
      </div>
    </div>
  )
}

export default Login
