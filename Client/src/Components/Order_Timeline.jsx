import React, { useState } from 'react'

import { GiCook } from 'react-icons/gi';
import { GiCampCookingPot } from 'react-icons/gi';
import { BiFoodMenu } from 'react-icons/bi';
import { MdDoneOutline } from 'react-icons/md';

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const Order_Timeline = () => {
    const [toast, settoast] = useState(false)
    const status = [
        {
            name: "Order",
            icon: <BiFoodMenu />,
            signal: "no"

        },
        {
            name: "Receive",
            icon: <GiCook />,
            signal: "no"
        },
        {
            name: "Cooking",
            icon: <GiCampCookingPot />,
            signal: "yes"
        },
        {
            name: "Done",
            icon: <MdDoneOutline />,
            signal: "no"

        },
    ]
    return (
        <div className='w-[55vw] h-[60vh]'>
            <VerticalTimeline lineColor='red' className='z-0'>
                {
                    status.map((item, index) => (
                        <VerticalTimelineElement key={index}
                            iconOnClick={() => settoast(prev => !prev)}
                            className={`vertical-timeline-element--work hover:scale-110 hover:duration-300 mt-0`}
                            iconStyle={item.signal == "yes" ? { background: 'black', color: '#fff' } : { background: '#F80101', color: '#fff' }}
                            icon={item.icon}
                            contentArrowStyle={item.signal == "yes" ? { borderRight: '7px solid black' } : { borderRight: '7px solid #F80101' }}
                            contentStyle={index % 2 == 0 ? { display: "flex", justifyContent: "end", marginTop: "0px", padding: "10px", } : { display: "flex", justifyContent: "start", marginTop: "0px", padding: "10px", }}
                        >
                            <div>
                                <h1 className='font-bold'>{item.name}</h1>
                                {
                                    item.signal == "yes" ? <div><h1 className='text-xs'>Current Status</h1></div> : null
                                }
                            </div>

                        </VerticalTimelineElement>
                    ))
                }
            </VerticalTimeline>
        </div>
    )
}

export default Order_Timeline