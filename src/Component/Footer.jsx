import React from 'react'
import logo from '../Component/Header/Growney-logo.png'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className='w-full py-10 relative bottom-0' style={{ backgroundColor: "#f7931a" }}>
            <div className='container-fluid flex items-center justify-center flex-col sm:flex-row sm:justify-between sm:items-start w-11/12 m-auto'>
                <div className='w-fit'>
                    <div className='w-full flex gap-3'>
                        <img src={logo} alt="" className='w-24 h-20' />
                        <b className='text-white text-4xl font-bold'>Rank <br></br>Terminal</b>
                    </div>
                    <div className='w-full mt-3'>
                        <h3 className='text-center text-white text-2xl font-semibold sm:text-start'>Subscribe now</h3>
                        <span className='flex justify-end items-center relative'>
                            <input type="text" placeholder='Enter your email' className='p-2 px-3 rounded-3xl mt-2 w-72' />
                            <span className='absolute right-0 top-2 bg-slate-100 rounded-full h-10 w-10 flex justify-center items-center cursor-pointer' style={{boxShadow: '-1px 0 6px 0 #ccc'}}>
                                <i className="fa-solid fa-paper-plane text-xl cursor-pointer hover:text-orange-400"></i>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='w-fit mt-5 sm:mt-0'>
                    <h3 className='text-white text-2xl font-semibold text-center'>Follow Us</h3>
                    <div className='flex gap-2 items-center mt-2'>
                        <Link to={'https://t.me/Rankterminal'} target='_blank'><span className='bg-white footer-icons'><i className="fa-brands fa-telegram text-xl" style={{ color: "#74C0FC" }}></i></span></Link>
                        <Link to={'https://x.com/rank_terminal?t=fX61zARxudRG_FzKf2DiJA&s=09'} target='_blank'><span className='bg-white footer-icons'><i className="fa-brands fa-x-twitter text-xl"></i></span></Link>
                        <Link to={'https://rankterminal.com/'} target='_blank'><span className='bg-white footer-icons'><i className="fa-solid fa-globe text-xl"></i></span></Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
