import { React, useState } from 'react'
import { useToast } from '@chakra-ui/toast'
import { Navigate, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const Login = () => {
    const toast = useToast()
    const [data, setdata] = useState({ email: null, password: null })
    const navigate = useNavigate();
    const setting_values = (e) => {
        console.log(e)
        let value = e.target.value;
        let name = e.target.name;
        if (name === "email") {
            setdata({ ...data, email: value });
        }
        else {
            setdata({ ...data, password: value });
        }
    }

    const senddata = async (e) => {
        e.preventDefault();
        if (data.email == null || data.password == null) {
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
        else if (JSON.parse(localStorage.getItem('Userdata')) && JSON.parse(localStorage.getItem('Userdata')).email === email) {
            toast({
                title: 'Already LoggedIn user',
                description: "this email is already in use",
                position: "top-left",
                status: "error",
                duration: 8000,
                isClosable: true
            })
        }

        else {
            const { email, password } = data;

            try {
                const res = await fetch('/api/login', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email, password
                    })
                });
                const message = await res.json();

                if (res.status === 422 || res.status === 522 || !message) {
                    toast({
                        title: 'Invalid Credential',
                        description: "Please provide correct data",
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
                    localStorage.setItem('Userdata', JSON.stringify(message));
                    navigate('/')
                }
            } catch (error) {
                console.error(error);
            }
        };
    }


    return (
        <div className='flex h-[100vh] justify-center items-center'>
            <div className='flex justify-center items-center bg-black text-slate-200 rounded-lg'>
                <div className='p-3 m-5 flex flex-col items-center'>
                    <div className='flex justify-center items-center space-x-5'>
                        <img className='w-[80px] justify-center rounded-full' src={Logo} alt="" />
                        <h1 className='text-2xl font-bold'>Login</h1>
                    </div>
                    <form className='flex flex-col p-3 my-5 space-y-6'>
                        <input onChange={setting_values} name='email' className='input-btn' type="text" placeholder='Email' />
                        <input onChange={setting_values} name='password' className='input-btn' type="password" placeholder='Password' />
                    </form>
                    <button className='btn mb-4'
                        onClick={senddata}
                    >
                        Login
                    </button>
                    <h1>Already have an Account? <a className='text-[#F80101]' href="/register">Register</a></h1>
                </div>
            </div>
        </div>
    )
}

export default Login
