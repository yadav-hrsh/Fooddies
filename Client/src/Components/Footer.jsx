import React from 'react'
import Logo from '../assets/Logo.png';
import {MdEmail} from 'react-icons/md';
import {IoCallSharp} from 'react-icons/io5';
import {FaUserCircle} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='w-full z-10'>
        <div className='bg-black flex justify-between '>
            <div className='text-black flex flex-col mx-[10vw] my-2'>
                <h1 className='my-1 text-white text-[35px] font-bold'>Contact</h1>
                <form className='flex flex-col space-y-5'>
                    <input type="email" placeholder='Email' className='rounded-[6px] p-3'/>
                    <textarea className='w-[20vw] rounded-[6px] p-3' placeholder='Feedback'/>
                    <button className='font-bold text-xl bg-[#F80101] w-[150px] shadow-sm hover:scale-110 shadow-slate-700 p-2 rounded-lg text-white'>Submit</button>
                </form>
            </div>
            <div className='mt-9 items-center text-white flex flex-col mx-[10vw]'>
                <img className='w-[100px] justify-center rounded-full' src={Logo} alt="" />
                <div className='text-white flex flex-row items-center space-x-2'><IoCallSharp color='white' /> <h1>9136359699</h1></div>
                <div className='text-white flex flex-row items-center space-x-2'><MdEmail color='white'/> <h1>Princeyadav1692@gmail.com</h1></div>
            </div>
        </div>
        <div className='bg-[#F80101] w-full'>
            <h1 className='p-3 text-lg text-white font-bold text-center'>Copyright by the Homefoods Hotels.</h1>
        </div>
    </div>
  )
}

export default Footer