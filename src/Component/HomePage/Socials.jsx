import React from 'react'
import { Link } from "react-router-dom";
export default function Socials({ socials }) {
    return (
        <div className='flex gap-2 items-center icons_div'>
            <Link to={socials?.telegram} target='_blank'><i className="fa-brands fa-telegram text-xl cursor-pointer hover:text-orange-400"></i></Link>
            <Link to={socials?.twitter} target='_blank'><i className="fa-brands fa-x-twitter text-xl cursor-pointer hover:text-orange-400"></i></Link>
            <Link to={socials?.website} target='_blank'><i className="fa-solid fa-globe text-xl cursor-pointer hover:text-orange-400"></i></Link>
        </div>
    )
}