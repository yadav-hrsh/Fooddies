import React from 'react'
import Header from '../Components/Header';
import Products from './Products';

import Burger_hero from '../assets/Burger_hero.webp';
import barbeque from '../assets/barbeque.webp';
import burgers from '../assets/burgers.webp';
import chocolate from '../assets/chocolate.jpg';
import desserts from '../assets/desserts.jpeg';
import coketail from '../assets/coketail.jpeg';
import Fried_chicken from '../assets/Fried_chicken.jpeg';
import Ice_cream from '../assets/Ice_cream.webp';
import Pizza from '../assets/pizza.jpeg';
import SandWiches from '../assets/SandWiches.jpeg';
import Sausages from '../assets/Sausages.jpeg';
import biryani from '../assets/biryani.jpeg';
import Chicken_tikka from '../assets/ckicken_tikka_masala.webp';
import Aviation from '../assets/Aviation.jpeg';
import Footer from '../Components/Footer';
import { useState } from 'react';

const Home = () => {
    const [Page_signal, setPage_signal] = useState(null)

    const Regular_food = [
        {
            name: "Barbeques",
            img: barbeque,
            id: "bbqs"
        },
        {
            name: "Burger",
            img: burgers,
            id: "burgers"
        },
        {
            name: "Chocolate",
            img: chocolate,
            id: "chocolates"
        },
        {
            name: "Desserts",
            img: desserts,
            id:"desserts"
        },
        {
            name: "Drinks",
            img: coketail,
            id:"drinks"
        },
        {
            name: "Fried chicken",
            img: Fried_chicken,
            id:"fried-chicken"
        },
        {
            name: "Icecream",
            img: Ice_cream,
            id:'ice-cream'
        },
        {
            name: "Pizza",
            img: Pizza,
            id:"pizzas"
        },
        {
            name: "SandWiches",
            img: SandWiches,
            id:"sandwiches"
        },
        {
            name: "Sausages",
            img: Sausages,
            id:"sausages"
        },
    ]
    const speciality = [
        {
            name: "Biryani",
            img: biryani
        },
        {
            name: "Chicken Tikka Masala",
            img: Chicken_tikka
        }
    ]

    return (
        <>
            <div className='h-[20vh]'>
                <Header sites={"Home"}/>
            </div>
            {/* Main */}
            {
                Page_signal ? <Products Page_signal={Page_signal} setPage_signal={setPage_signal} /> :
                    <div className='px-[10vw]'>
                        <div className="items-center bg-no-repeat h-[85vh]" style={{ backgroundImage: `url(${Burger_hero})`, backgroundSize: 'cover' }}>
                            <div className='flex flex-col text-6xl font-bold font-serif items-end p-[7vw] text-[#f0e8e8d0]'>
                                <h1>Fresh</h1>
                                <h1>Food</h1>
                                <h1>Fast</h1>
                            </div>
                        </div>


                        <div className=''>
                            <h1 className='my-5 text-[45px] font-bold'>What’s your mood? </h1>
                            <div className='h-[45vh] overflow-x-auto whitespace-nowrap space-x-8 shadow-2xl px-4 scrollbar-thumb-[#030303] scrollbar-thin'>
                                {
                                    Regular_food.map((item, index) => (
                                        <div onClick={() => { setPage_signal(item.id)}} key={index} className='cursor-pointer hover:scale-110 duration-300 transition-all flex-col w-3/12 inline-flex items-center mt-3'>
                                            <img className='rounded-[13px]' src={item.img} alt="" />
                                            <h1 className='text-2xl font-bold mt-3'>{item.name}</h1>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className=''>
                            <h1 className='my-5 text-[45px] font-bold'>Our Speciality</h1>
                            <div className='h-[47vh] overflow-x-auto whitespace-nowrap space-x-8 shadow-2xl px-4 scrollbar-thumb-neutral-900 scrollbar-thin'>
                                {
                                    speciality.map((item, index) => (
                                        <div className='cursor-pointer hover:scale-110 duration-500 flex-col w-4/12 inline-flex items-center mt-3' key={index}>
                                            <img className='rounded-[13px]' src={item.img} alt="" />
                                            <h1 className='text-2xl font-bold mt-3'>{item.name}</h1>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className='sm:mb-4'>
                            <h1 className='my-5 text-[45px] font-bold'>
                                Today's Offer
                            </h1>
                            <div className='flex'>
                                <div>
                                    <img className='w-[600px]' src={Aviation} alt="" />
                                </div>
                                <div className='ml-16'>
                                    <h1 className='font-medium text-2xl'>
                                        Ingredients - Gin, lemon juice,
                                        Maraschino liqueur
                                    </h1>
                                    <h1 className='font-semibold text-4xl lg:mt-20 md:mt-15 sm:mt-2 flex-wrap'>
                                        Get Amazing 50% off on any Aviation Drinks.
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
            }

            {/* Main ended */}
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Home