import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner'
import { useAuth } from '../../context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSignin, toggleSignup } from '../../context/themeSlice';


export default function Registration() {

  const navigate = useNavigate()
  //const { loginAuth } = useAuth();


  const nameRef = useRef();
  const emailRef = useRef();
  const errRef = useRef()

  const [name, setName] = useState('')
  const [nameFocus, setNameFocus] = useState(false)

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false)


  //Email verification start
  useEffect(() => {
    const result = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    setValidEmail(result)
  }, [email])
  //Email verification end

  //password verification start
  useEffect(() => {
    const result = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})").test(password)
    setValidPassword(result)
  }, [password])
  //Password verification end

  useEffect(() => {
    setErrMsg('')
  }, [name, email, password])

  //Form submit start
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!validEmail && !validPassword) {
      setErrMsg("Invalid entry")
      return;
    }
    try {
      fetch('https://rankterminal.com/growney/public/index.php/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.status) {
            toast.success("Registration successfull")
            //setSignup(false)
            dispatch(toggleSignup(false))
            setLoading(false)
            const url=String(r.data.user.name)
            const user=url.split(" ")
            const name=user[0].trim().toLocaleLowerCase();
            localStorage.setItem('authToken', r.data.access_token);
            //window.localStorage.setItem("userName", r.data.user.name)
            // window.location.href = `/${name}`
          } else {
            setErrMsg("User email already exist")
            toast.error('Wrong email or password')
            setLoading(false)
          }
          setSuccess(true)
          //setSignup(false)
          dispatch(toggleSignup(false))
        })

    }
    catch (e) {
      if (!e?.response) {
        setErrMsg('No server response')
        setLoading(false)
      }
      else if (e.response?.status === 409) {
        setErrMsg('Email has already taken')
        setLoading(false)
      }
      else {
        setErrMsg('Registration failed')
        setLoading(false)
      }
      errRef.current.focus()
    }
  }
  //Form submit end

  //Window width code start
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  //Window width code end

  //Password View Code start
  const [passwordView, setPasswordView] = useState(false);
  //Password View Code end


  //*********** Dark mode light mode start ***********//
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch=useDispatch()
  //*********** Dark mode light mode end ***********//


  //**********Sign In handler***********//
  const signInHandler=(e)=>{
    e.preventDefault()
    dispatch(toggleSignin(true))

  }

  return (
    <>
      {loading ?
        <div className='w-full absolute right-2/4 left-2/4 top-96'>
          <TailSpin
            visible={true}
            height="50"
            width="50"
            color="#facb92"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
        :

        <div className={darkMode?'w-11/12 sm:w-9/12 md:w-7/12 lg:w-2/5 fixed top-16 left-0 mx-auto z-50 bg-gray-900 rounded-xl shadow-2xl p-4 dark':
          'w-11/12 sm:w-9/12 md:w-7/12 lg:w-2/5 fixed top-16 left-0 mx-auto z-50 bg-white rounded-xl shadow-2xl p-4'} style={{ left: width > 1023 ? '30%' : width > 768 ? '20%' : width > 640 ? '13%' : '4%' }}>
          <p ref={errRef} className={errMsg ? 'text-red-800 bg-red-300 py-2 mt-4 pl-2' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
          <div className='x-icon'>
            <i className="fa-solid fa-xmark dark:text-white" onClick={() => dispatch(toggleSignup(false))}></i>
          </div>
          <form className={`form-control signin-form border-0 mb-4 ${darkMode? 'bg-gray-900':'bg-white'} mt-2`} onSubmit={submitHandler}>
            <div>
              <label className='dark:text-white'>Enter your name</label>
              <br></br>
              <input type="text"
                id='name'
                ref={nameRef}
                autoComplete='off'
                onChange={(e) => setName(e.target.value)}
                required
                onFocus={() => setNameFocus(true)}
                onBlur={() => setNameFocus(false)}
                placeholder='Your name'
                className='w-100 mt-3'
              />
            </div>
            <div>
              <label className='dark:text-white'>Enter your email</label>
              <br></br>
              <input type='email'
                id='email'
                ref={emailRef}
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby='uidnote'
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                placeholder='Your email'
                className='w-100 mt-3'
              />
              <span className='text-red-800'>
                {!validEmail && emailFocus && email !== '' ? "Please enter a valid email" : ""}
              </span>
            </div>
            <div className='relative'>
              <label className='mt-2 dark:text-white'>Enter your password</label>
              <br></br>
              <input type={passwordView ? 'text' : 'password'}
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby='uidnote'
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                placeholder='Your password'
                className='w-100 mt-3'
              />
              <i className={`fa-solid ${passwordView ? 'fa-eye' : 'fa-eye-slash'} absolute top-16 right-3`} onClick={() => setPasswordView(!passwordView)}></i>

              <span className='text-red-800'>
                {password.length < 8 && password !== '' ? "Password length should be 8 character and above" : !validPassword && passwordFocus && password !== '' ? "The password should contain atleast one lowercase, one uppercase, one digit and one special character" : ""}
              </span>
            </div>
            <button disabled={!validEmail || !validPassword ? true : false} type='submit' className='btn w-25 mt-3 sign-button'>Sign up</button>
          </form>
          <p className='text-center sign-up-link dark:text-white'>Already have an account? <a href="" className='sign-up-in-link' onClick={signInHandler}>Sign in</a></p>
        </div>
      }
    </>
  )
}
