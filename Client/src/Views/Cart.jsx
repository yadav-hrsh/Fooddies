import React, { useEffect, useState } from 'react'
import Loading_gif from '../assets/Loading_gif.gif';
import burgers from '../assets/burgers.webp';
import { AiFillDelete } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

import { useToast } from '@chakra-ui/toast'
import Empty_cart from '../assets/Empty_cart.png';
const Cart = () => {
    const toast = useToast()
    const [Cart_data, setCart_data] = useState([]);
    const [counter, setcounter] = useState(1)

    const increase = () => {
        setcounter(counter => counter + 1)
    }

    const decrease = () => {
        if (counter > 0) {
            setcounter(counter => counter - 1)
        }
    }

    async function getdata(){
        const userdata = JSON.parse(localStorage.getItem('Userdata'));
        try {
            const res = await fetch(`/api/getCartdata:${userdata.message.email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const message = await res.json();
            setCart_data(message.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const giveOrder = async(item, counter) => {
        const userdata = JSON.parse(localStorage.getItem('Userdata'));
        try {
            const res = await fetch('/api/orderProduct', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email:userdata.message.email,
                    item:item,
                    counter:counter
                })
            });

            const message =await res.json();
            if (res.status === 500) {
                toast({
                    title: 'Invalid Credential',
                    description: message.error,
                    position: "top-left",
                    status: "error",
                    duration: 3000,
                    isClosable: true
                })
            } else {
                toast({
                    title: 'Success',
                    description: message.message,
                    position: "top-left",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                })
                getdeleteCart(item)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getdeleteCart = async(item) => {
        console.log(item)
        try {
            const res = await fetch('/api/deletecartdata', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    ...item
                })
            });
            const message = await res.json();
            console.log(message)
            getdata()
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div>
            <div className='h-[20vh]'>
                <Header sites={"Cart"} />
            </div>

            <div className='mx-[10vw] mb-5'>
                {
                    (Cart_data.length == 0) ?
                        <div className='flex justify-center items-center'>
                            <img className='h-[70vh]' src={Empty_cart} alt="" />
                        </div>
                        :
                        Cart_data.map((item, index) => (
                            <div key={index} className='flex flex-rows p-3 shadow-2xl justify-between h-[30vh]'>
                                <div className='flex justify-center'>
                                    <img className='w-11/12 rounded-lg' src={item.item.img} alt="this is an Image" />
                                </div>
                                <div className='flex flex-col w-[45vw] mx-4 justify-center'>
                                    <div className='flex flex-col justify-between'>
                                        <h1 className='text-xl font-bold'>{item.item.name}</h1>
                                        <h1 className='mt-1'>{item.item.dsc}</h1>
                                    </div>
                                    <div className='flex justify-between mt-3'>
                                        <div className='flex flex-row justify-between bg-[#E4E4E7] p-2 space-x-4 rounded-lg'>
                                            <button onClick={() => decrease()} className='hover:scale-110'><AiFillDelete size={"25px"} /></button>
                                            <h1 className='text-2xl px-4 border-x-2 border-gray-500'>{counter}</h1>
                                            <button className='hover:scale-110' onClick={() => increase()}><GrAdd size={"25px"} /></button>
                                        </div>
                                        <div className='flex items-center'>
                                            <h1 className='text-2xl font-bold'>₹{counter * item.item.price}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col space-y-5 justify-center '>
                                    <button onClick={() => giveOrder(item.item, counter)} className='font-medium text-white text-lg bg-[#F80101] w-[120px] shadow-sm hover:scale-110 shadow-slate-700 p-2 rounded-lg'>Order</button>
                                    <button onClick={() => getdeleteCart(item.item)} className='font-medium text-white text-lg bg-[#F80101] w-[120px] shadow-sm hover:scale-110 shadow-slate-700 p-2 rounded-lg'>Delete</button>
                                </div>
                            </div>
                        ))
                }
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Cart