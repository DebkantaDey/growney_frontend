import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSignin, signout } from '../../context/themeSlice'


export default function ProfileValidation({ signinHandler }) {


    const name = useSelector((state) => state.theme.userName)
    const dispatch = useDispatch()
    const modalRef = useRef(null);

    //********** User login checking start**********//
    const [isLogin, setIsLogin] = useState('')
    useEffect(() => {
        if (localStorage.getItem("authToken") > 0 || localStorage.getItem("authToken") != null) {
            setIsLogin(true)
        }
        else {
            setIsLogin(false)

        }
    }, [localStorage.getItem("authToken") > 0 || localStorage.getItem("authToken") != null])
    //********** User login checking end**********//


    //************Profile handling start************//
    const [isProfile, setProfile] = useState(false)
    //************Profile handling end************//



    //*********Logout handling start*********//
    const handleLogout = () => {
        dispatch(signout());
        setIsLogin(false)
    }
    //*********Logout handling end*********//


    //***********Close modal on clicking outside of it.************//
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setProfile(false)
            }
        };

        if (isProfile) {
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isProfile]);
    //***********Close modal on clicking outside of it.************//

    return (
        <div>
            {isLogin ?
                <div className='w-7 h-7 sm:w-7 sm:h-7 rounded-full bg-slate-50 flex justify-center items-center sm:mr-2 cursor-pointer' onClick={() => setProfile(!isProfile)}>
                    <i className="fa-solid fa-user text-base sm:text-lg" style={{ color: "#f7931a" }}></i>
                </div>
                :
                <button type="button" className="border-2 py-2 px-2 md:py-2 md:px-5 text-white hover rounded-lg signin-button" onClick={() => dispatch(toggleSignin(true))
                }>Signin</button>
            }
            {isProfile && isLogin ?
                <div className='w-44 absolute top-16 sm:right-6 right-2 shadow-md rounded p-2 shadow-orange-400 z-10 bg-white'  ref={modalRef}>
                    <p className='text-black'>{name}</p>
                    <button onClick={handleLogout} className='cursor-pointer bg-orange-400 px-10 py-2 rounded-md mt-2'>
                        <i className="fas fa-sign-out" style={{ color: '#fff' }}></i>
                        <span className='text-white'> Log out</span>
                    </button>
                </div>
                :
                ""
            }
        </div>
    )
}
