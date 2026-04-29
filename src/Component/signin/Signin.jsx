
import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, generatePath } from 'react-router-dom'
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner'
import { useSelector, useDispatch } from 'react-redux';
import { toggleSignup, toggleSignin, setUserName, signin } from '../../context/themeSlice';


export default function Signin({ forgotForm }) {


  const navigate = useNavigate()

  const nameRef = useRef();
  const emailRef = useRef();
  const errRef = useRef()

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false)


  const dispatch = useDispatch();

  //Password View Code start
  const [passwordView, setPasswordView] = useState(false);
  //Password View Code end

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
  }, [email, password])

  //**********************Form submit start**********************//
  const [loginName, setLoginName] = useState('')
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!validEmail && !validPassword) {
      setErrMsg("Invalid entry")
      return;
    }
    try {
      fetch('https://rankterminal.com/growney/public/index.php/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.status) {
            toast.success("Login successfull")
            dispatch(toggleSignin(false))
            setLoading(false)
            dispatch(setUserName(r.data.user.name))
            dispatch(signin(r.data.access_token));
            //localStorage.setItem('authToken', r.data.access_token);
          }
          else if (r.message == 'Unauthorized') {
            setErrMsg("Email and password does not exist")
            setLoading(false)
          }
          else {
            setErrMsg('Wrong email or password')
            setLoading(false)
          }
        })

    }
    catch (e) {
      if (!e?.response) {
        setErrMsg('No server response')
      }
      else if (e.response?.status === 409) {
        setErrMsg('Email does not match')
      }
      else {
        setErrMsg('Login failed')
      }
      errRef.current.focus()
    }
  }
  //**********************Form submit end**********************//


  //****************Google Login start*****************//
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => toast.error('Login failed', error)
  });

  useEffect(
    () => {
      if (user.length != 0) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfile(res.data);
            //setSignin(false)
            dispatch(toggleSignin(false))
            setEmail(res.data.email)
            let name = res.data.given_name+" "+res.data.family_name
            dispatch(setUserName(name))
            localStorage.setItem('authToken', user.access_token);
            //localStorage.setItem('userName', name);
          })
          .catch((err) => {
            toast.error(err)
          });
      }
    },
    [user]
  );

  useEffect(
    () => {
      if (user && email !== '') {
        fetch('https://rankterminal.com/growney/public/index.php/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })
          .then((r) => r.json())
          .then((r) => {
            if (r.status) {
              let name = res.data.given_name
              let urlName = name.toLowerCase()
              toast.success("Login successfull")
              //window.location.href = `/${urlName}`;
              //setSignin(false)
              dispatch(toggleSignin(false))
              localStorage.setItem('authToken', user.access_token);
              localStorage.setItem('userName', name);
            }
            else if (r.message == 'Unauthorized') {
              setErrMsg("Email and password does not exist")
            }
            else {
              toast.error('Wrong email or password')
            }

            


          })
          .catch((err) => {
            toast.error(err)
          })
      }
    },

    [user]
  );

  //****************Google Login end*****************//

  //****************Widow width start*****************//
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
  //****************Widow width end*****************//


  //***********Dark mode light mode***********//
  const darkMode = useSelector((state) => state.theme.darkMode);

  //************Sign up handler**********//
  const signupHandler=(e)=>{
    e.preventDefault()
    dispatch(toggleSignup(true))

  }

  return (
    <>
      {
        loading ?
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

          <div className={darkMode ? 'w-11/12 sm:w-9/12 md:w-7/12 lg:w-2/5 fixed left-auto right-auto z-50 bg-gray-900 rounded-xl shadow-2xl p-4 mx-auto dark' :
            'w-11/12 sm:w-9/12 md:w-7/12 lg:w-2/5 fixed left-auto right-auto z-50 bg-white rounded-xl shadow-2xl p-4 mx-auto'
          } style={{ left: width > 1023 ? '30%' : width > 768 ? '20%' : width > 640 ? '13%' : '4%' }}>
            <div className='x-icon' onClick={() => dispatch(toggleSignin(false))}>
              <i className="fa-solid fa-xmark dark:text-white"></i>
            </div>
            <p ref={errRef} className={errMsg ? 'text-red-800 bg-red-300 py-2 mt-4 pl-2' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
            <form className={`form-control signin-form border-0 mb-3 ${darkMode ? 'bg-gray-900' : 'bg-white'} mt-5`} onSubmit={submitHandler}>
              <div>
                <label className='dark:text-white'>Enter your email</label>
                <br></br>
                <input type='text' placeholder='Your email'
                  className={`w-100 mt-3`}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  id='email'
                  ref={emailRef}
                  autoComplete='off'
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby='uidnote'
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                ></input>
                <span className='text-red-800'>
                  {!validEmail && emailFocus && email !== '' ? "Please enter a valid email" : ""}
                </span>
              </div>
              <div className='relative'>
                <label className='mt-2 dark:text-white'>Enter your password</label>
                <br></br>
                <input type={passwordView ? 'text' : 'password'}
                  placeholder='Your password'
                  className='w-100 mt-3'
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  id='password'
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby='uidnote'
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                ></input>
                <i className={`fa-solid ${passwordView ? 'fa-eye' : 'fa-eye-slash'} absolute top-16 right-3`} onClick={() => setPasswordView(!passwordView)}></i>

                <span className='text-red-800'>
                  {password.length < 8 && password !== '' ? "Password length should be 8 character and above" : !validPassword && passwordFocus && password !== '' ? "The password should contain atleast one lowercase, one uppercase, one digit and one special character" : ""}
                </span>
              </div>
              <div className='d-flex justify-end mt-3'>
                <p><a href='' onClick={forgotForm} className='hover:text-orange-400 dark:text-white'>Forgot password?</a></p>
              </div>
              <button className='btn w-25 mt-2 sign-button' type='submit' disabled={!validEmail || !validPassword ? true : false}>Sign in</button>
            </form>
            <div className=' sign-with-logo mb-3 mt-4'>
              <div className='flex justify-evenly mt-2'>
                <button onClick={login} className='w-1/5 border-2 flex justify-center items-center py-2 hover:bg-orange-200 hover:rounded'><img src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png' className=' w-5 h-5 m-0 self-center'></img></button>
                <button className='w-1/5 border-2 justify-center items-center py-2 px-2 hover:bg-orange-200 hover:rounded'><i className="fa-brands fa-x-twitter w-5 h-5 dark:text-white"></i></button>
              </div>
            </div>
            <p className='text-center dark:text-white'>Don't have an account? <a href="" className='sign-up-in-link' onClick={signupHandler}>Sign up</a></p>
          </div>
      }
    </>
  )
}

