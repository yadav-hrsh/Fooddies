import React, { useEffect } from 'react'
import { useToast } from '@chakra-ui/toast'
import Logo from '../assets/Logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const toast = useToast()

    const [data, setdata] = useState({ name: null, phone: null, email: null, username: null, password: null })
    
    const setting_values = (e) => {
        console.log(e)
        let value = e.target.value;
        let name = e.target.name;
        if (name === "email") {
            setdata({ ...data, email: value });
        }
        else if (name === "username") {
            setdata({ ...data, username: value });
        }
        else if (name === "name") {
            setdata({ ...data, name: value });
        }
        else if (name === "phone") {
            setdata({ ...data, phone: value });
        }
        else {
            setdata({ ...data, password: value });
        }
    }

    const senddata = async (e) => {
        e.preventDefault();
        if (data.email == null || data.username == null || data.password == null) {
            toast({
                title: 'Incomplete Data',
                description: "Please Provide Complete Data",
                position: "top-left",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        else if (String(data.password).length < 4) {
            toast({
                title: 'Weak Password',
                description: "Password length Must be greater than 3",
                position: "top-left",
                status: "error",
                duration: 8000,
                isClosable: true
            })
        }

        else {
            const { name, username, email, phone, password } = data;

            try {
                const res = await fetch('/api/register', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name, username: username, email: email, phone: phone, password: password, cpassword: password
                    })
                });
                const message = await res.json();

                if (res.status === 422 || res.status === 522 || !message) {
                    toast({
                        title: 'Already Existing user',
                        description: "this email is already in use",
                        position: "top-left",
                        status: "error",
                        duration: 8000,
                        isClosable: true
                    })
                } else {
                    toast({
                        title: 'Success',
                        description: "Registered successfully",
                        position: "top-left",
                        status: "success",
                        duration: 8000,
                        isClosable: true
                    })
                    navigate('/login')
                }
            } catch (error) {
                console.error(error);
            }
        };
    }



    return (
        <div className='flex h-[100vh] justify-center items-center'>
            <div className='flex justify-center  items-center bg-black text-slate-200 rounded-lg'>
                <div className='p-3 m-5 flex flex-col items-center'>
                    <div className='flex justify-center items-center space-x-5'>
                        <img className='w-[80px] justify-center rounded-full' src={Logo} alt="" />
                        <h1 className='text-2xl font-bold'>Register</h1>
                    </div>
                    <form className='flex flex-col p-3 my-5 space-y-6'>
                        <input onChange={setting_values} name='name' className='input-btn' type="text" placeholder='Name' />
                        <input onChange={setting_values} name='email' className='input-btn' type="email" placeholder='Email' />
                        <input onChange={setting_values} name='phone' className='input-btn' type="number" placeholder='Phone' />
                        <input onChange={setting_values} name='username' className='input-btn' type="text" placeholder='Username' />
                        <input onChange={setting_values} name='password' className='input-btn' type="password" placeholder='Password' />
                    </form>
                    <button className='btn mb-4'
                        onClick={senddata}
                    >
                        Register
                    </button>
                    <h1>Already have an Account? <a className='text-[#F80101]' href="/Login">Login</a></h1>
                </div>
            </div>
        </div>
    )
}

export default Register
