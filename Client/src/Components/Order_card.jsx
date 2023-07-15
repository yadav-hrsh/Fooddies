import React,{useEffect} from 'react'
import burgers from '../assets/burgers.webp';

const Order_card = (props) => {
  const {items,counter,getdeleteorder} = props;

  const viacallingdelete = () =>{
    getdeleteorder(items)
  }
  
// useEffect(() => {
    
//     const prevdata = JSON.parse(localStorage.getItem('cart_items'));
//     const updatecart = prevdata.filter((obj, index, self) => {
//         return index === self.findIndex((o) =>
//           o.id === obj.id
//         );
//       });
//     localStorage.setItem('cart_items', JSON.stringify(updatecart));
// }, [])



  return (
    <div className=''>
        <div className='p-2 shadow-2xl w-[25vw]'>
          <div className='flex justify-center'>
            <img className='w-11/12 rounded-lg' src={items.img} alt="" />
          </div>
          <div className='flex flex-col mx-4 mt-1'>
            <h1 className='text-xl font-bold'>{items.name} {counter}X</h1>
            <h1 className='mt-1'>{items.dsc}</h1>
          </div>
          <hr />
          <div className='flex items-center justify-between mx-4'>
            <div>
              <h1>{Math.random()*items.price}</h1>
            </div>
            <div className='font-bold textblackwhite text-2xl'>
              ₹{items.price}
            </div>
          </div>
          <hr />
          <div className='flex justify-between items-center px-3 py-2'>
            {/* <h1>{hours>12?`${hours-12}:${minutes} PM`:`${hours}:${minutes} AM`}</h1> */}
          <button onClick={()=>viacallingdelete(items)} className={`font-medium text-white text-lg bg-[#F80101] w-[100px] shadow-sm hover:scale-110 shadow-slate-700 p-2 rounded-lg`}>Cancel</button>
          </div>
        </div>
      </div>
  )
}

export default Order_card