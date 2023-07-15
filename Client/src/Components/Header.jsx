import React, { useEffect, useState } from 'react'
import Logo from '../assets/340c6add7519212185a08d4205eb1965.png';
import {FaUserCircle} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import { useToast } from '@chakra-ui/toast'

const Header = (props) => {
    const navigate = useNavigate()    
    const {sites} = props;
    const toast = useToast()
    const [userdata, setuserdata] = useState(null);

    useEffect(() => {
        const vals = JSON.parse(localStorage.getItem('Userdata'))
        if(vals){
            setuserdata(vals.message);
        }
        
    }, [])


    const sendtologin = ()=>{
        if(userdata){
            toast({
                title: 'Already LoggedIn user',
                description: "You are Already LoggedIn",
                position: "top-left",
                status: "error",
                duration: 8000,
                isClosable: true
            })
        }
        else{
            navigate('/Login')
        }
    }

  return (
    <div className='fixed bg-neutral-50 w-full z-10'>
        <div className='flex flex-row justify-between items-center shadow-2xl px-10'>
            <div className=' flex '>
                <img className='w-[150px] justify-center' src={Logo} />
            </div>
            <div className=' grid grid-cols-3 items-center w-7/12 bg-[#D50000] h-12 '>
                <div onClick={()=>{navigate('/')}} className={sites==="Home"?"bg-black flex items-center justify-center Nav_property":" flex items-center justify-center Nav_property"  }>
                    Home
                </div >
                <div onClick={()=>{navigate('/order')}} className={sites==="Order"?"bg-black  flex items-center justify-center Nav_property":" flex items-center justify-center Nav_property"  }>
                    Order
                </div>
                <div onClick={()=>{navigate('/cart')}} className={sites==="Cart"?"bg-black  flex items-center justify-center Nav_property":" flex items-center justify-center Nav_property"  }>
                    Cart
                </div>
            </div>
            <div className='3/12 flex flex-col justify-center items-center'>
                <FaUserCircle size={"70px"} onClick={sendtologin} className='cursor-pointer'/>
                <h1>{userdata?userdata.name:"user"}</h1>
            </div>
        </div>
    </div>
  )
}

export default Header