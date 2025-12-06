import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser } from "react-icons/ai";
import { IoLockClosedOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  let BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // update form fields
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // basic validation
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Signup failed");
        return;
      }

      toast.success("Signup Successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Network error, please try again");
      console.log(error);
    }
  };

  return (
    <div className='container my-8 flex justify-center items-center min-h-screen'>
      <div className="w-120 rounded-md shadow-lg shadow-gray-500 py-8 px-5">

        <div className="header text-center">
          <h2 className='text-3xl'>Create An<b className='text-blue-500 text-3xl'> Account</b></h2>
          <p className='leading-10'>Sign up to start shopping</p>
        </div>

        <form className='flex flex-col justify-start mt-7' onSubmit={handleSignup}>
          
          {/* FULL NAME */}
          <div className='relative mb-5'>
            <label>Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Ade Tiger"
              className='outline-1 outline-blue-500 pl-10 pr-3 py-2.5 w-full rounded mt-2'
              value={form.name}
              onChange={handleChange}
            />
            <AiOutlineUser size={25} className='absolute top-11 left-1.5 text-gray-300' />
          </div>

          {/* EMAIL */}
          <div className='relative mb-5'>
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="your@email.com"
              className='outline-1 outline-blue-500 pl-10 pr-3 py-2.5 w-full rounded mt-2'
              value={form.email}
              onChange={handleChange}
            />
            <MdOutlineEmail size={25} className='absolute top-11 left-1.5 text-gray-300' />
          </div>

          {/* PASSWORD */}
          <div className='relative mb-5'>
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className='outline-1 outline-blue-500 pl-10 pr-3 py-2.5 w-full rounded mt-2'
              value={form.password}
              onChange={handleChange}
            />
            <IoLockClosedOutline size={25} className='absolute top-11 left-1.5 text-gray-300' />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className='relative mb-5'>
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className='outline-1 outline-blue-500 pl-10 pr-3 py-2.5 w-full rounded mt-2'
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <IoLockClosedOutline size={25} className='absolute top-11 left-1.5 text-gray-300' />
          </div>

          {/* TERMS */}
          <div className='flex items-center text-sm space-x-2 my-5'>
            <input className='w-4 h-4 accent-blue-500' type="checkbox" />
            <span>I agree to the <b className='text-blue-500'>Terms</b> and <b className='text-blue-500'>Privacy Policy</b></span>
          </div>

          <button className="w-full bg-blue-500 text-white py-2.5 rounded-md font-semibold hover:bg-black" type='submit'>
            Create Account
          </button>
        </form>

        <div className="text-center mt-5">
          <Link to="/login">Already have an account? <b className='text-blue-500'>Sign In</b></Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
