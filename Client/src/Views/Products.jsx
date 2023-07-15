import React, { useState, useEffect } from 'react'
import burgers from '../assets/burgers.webp';
import axios from "axios";
import { useToast } from '@chakra-ui/toast'

import Loading_gif from '../assets/Loading_gif.gif';
const Products = (props) => {
    const toast = useToast()

    const { setPage_signal, Page_signal } = props;
    const [FoodDATA, setfoodDATA] = useState([])
    

    useEffect(() => {
        const getdata = async () => {
            let headersList = {
                "Accept": "*/*",
            }
            let reqOptions = {
                url: `https://free-food-menus-api-production.up.railway.app/${Page_signal}`,
                method: "GET",
                headers: headersList,
            }

            let response = await axios.request(reqOptions);
            setfoodDATA(response.data);

        }
        getdata();
    }, [])

    const sendcartdata = async (items)=>{
        try {
            const userdata = JSON.parse(localStorage.getItem('Userdata'));
            console.log(userdata.message.email)
            const res = await fetch('/api/addTocart', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email:userdata.message.email,
                    item:items
                })
            });
            const message = await res.json();
    
            if (res.status === 422 || res.status === 500 || !message) {
                toast({
                    title: 'Already There In cart',
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
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div className='bg-white w-[95vw]'>
            {
                FoodDATA.length>0 ?
                    <>
                        <div className='fixed flex pb-1 w-[100vw] justify-end'>
                            <button onClick={() => { setPage_signal(null) }} className='mx-10 mt-2 font-medium text-white lg:text-lg bg-[#F80101] sm:text-xs md:text-md sm:w-[50px] md:w-[80px] lg:w-[120px] shadow-sm hover:scale-110 shadow-slate-700 p-2 rounded-lg'>Main Menu</button>
                        </div>
                        <div className='mx-[10vw] my-3  grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
                            {
                                FoodDATA.map((item, index) => (
                                    <div key={index} className='p-2 shadow-2xl'>
                                        <div className='flex justify-center'>
                                            <img className='w-11/12 rounded-lg' src={item.img == null ? burgers : item.img} alt="" />
                                        </div>
                                        <div className='flex flex-col mx-4 mt-1'>
                                            <h1 className='text-xl font-bold'>{item.name}</h1>
                                            <h1 className='mt-1'>{item.dsc}</h1>
                                        </div>
                                        <hr />
                                        <div className='flex justify-between mx-4'>
                                            <div>
                                                <h1>{item.rate}⭐</h1>
                                            </div>
                                            <div className='font-bold textblackwhite text-2xl'>
                                                ₹{item.price}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='flex justify-end px-3 py-2'>
                                            <button onClick={()=>sendcartdata(item)} className={`font-medium text-white text-lg bg-[#F80101] w-[120px] shadow-sm hover:scale-110 shadow-slate-700 p-2 rounded-lg`}>Add To Cart</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </> :
                    <div className='flex items-center justify-center'>
                        <img src={Loading_gif} alt="" />
                    </div>
            }
        </div>
    )
}

export default Products