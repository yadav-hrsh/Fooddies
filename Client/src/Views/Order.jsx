import React, { useEffect, useState } from 'react'
import Header from '../Components/Header';
import Order_card from '../Components/Order_card';
import Order_Timeline from '../Components/Order_Timeline';
import Footer from '../Components/Footer';
import Empty_order from '../assets/empty_order.png';
const Order = () => {
    const [Order_data, setOrder_data] = useState([]);

    async function getdata(){
        const userdata = JSON.parse(localStorage.getItem('Userdata'));
        try {
            const res = await fetch(`/api/getorderdata:${userdata.message.email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const message = await res.json();
            setOrder_data(message.data);

        } catch (error) {
            console.error(error);
        }
    }

    const getdeleteorder = async(item) => {
        console.log(item)
        try {
            const res = await fetch(`/api/deleteorderdata`, {
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

    useEffect(() => {
        getdata();
    }, [])

    return (
        <div>
            <div className='h-[20vh]'>
                <Header sites={"Order"} />
            </div>
            {
                Order_data && Order_data.length > 0 ?
                    <div className='space-y-10 flex flex-col-reverse'>
                        {
                            Order_data.map((item,index) => (
                                <div key={index} className='mx-[10vw]  mb-5 flex z-0 justify-between h-[80vh]'>
                                    <Order_card items={item.item} counter={item.counter} getdeleteorder={getdeleteorder}/>
                                    <Order_Timeline />
                                </div>
                            ))
                        }
                    </div> : 
                    <div className='flex h-[72vh] justify-center items-center'>
                        <img src={Empty_order} alt="" />
                        <h1 className='font-bold text-3xl'>Nothing is ordered</h1>
                    </div>
            }
            <div>
                <Footer />
            </div>

        </div>
    )
}

export default Order