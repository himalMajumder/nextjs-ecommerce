import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'

// AiOutlineShoppingCart

const Navbar = () => {
  return (
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center mb-1 py-2 shadow-xl'>
      <div className="logo mx-5">
        <Link href={`/`}> <Image src="/logo.png" width={200} height={40} alt='Logo' /></Link>
      </div>
      <div className="nav">
        <ul className='flex flex-items-center space-x-6 font-bold md:text-md'>
          <Link href={`/tshirts`}>  <li>Tshirts </li>  </Link>
          <Link href={`/hoodies`}>  <li>Hoodies </li>  </Link>
          <Link href={`/stickers`}>  <li>Stickers </li>  </Link>
          <Link href={`/mugs`}>  <li>Mugs </li>  </Link>
        </ul>
      </div>
      <div className="cart absolute right-0 top-4 mx-5">
          <AiOutlineShoppingCart  className='text-xl md:text-2xl' />
      </div>
    </div>
  )
}

export default Navbar