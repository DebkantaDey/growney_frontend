import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


export default function Forgot({ setForgot }) {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const emailRef = useRef();
  const [emailFocus, setEmailFocus] = useState(false)

  //**********Email verification start*************//
  useEffect(() => {
    const result = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    setValidEmail(result)
  }, [email])
  //**********Email verification end***********//


  //***********Form submit start**************//
  const submitHandler = (event) => {
    event.preventDefault()
    console.log(email)
    let emailStatus = false
    // loginRequest()
    if (email !== "") {
      if (email !== "") {
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
          setEmailError('Please enter a valid email')
          return
        }
        else {
          setEmailError('')
          emailStatus = true
        }
      }
      if (emailStatus) {
        setEmailError('')
        fetch('https://rankterminal.com/growney/public/index.php/api/forgot-pass', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })
          .then((r) => r.json())
          .then((r) => {
            toast.success("An email has send.")
            setForgot(false)
            navigate('/')
          })
          .catch((err) => {
            toast.error(err)
          })
      }
    }
  }
  //***********Form submit end**************//



  //******************************//
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


  //***********Dark mode light mode start***********//
  const darkMode = useSelector((state) => state.theme.darkMode);
  //***********Dark mode light mode end***********//

  return (
    <div className={darkMode ? 'w-11/12 sm:w-9/12 md:w-7/12 lg:w-2/5 fixed top-16 left-0 mx-auto z-50 bg-gray-900 rounded-xl shadow-2xl p-4 dark' :
      'w-11/12 sm:w-9/12 md:w-7/12 lg:w-2/5 fixed top-16 left-0 mx-auto z-50 bg-white rounded-xl shadow-2xl p-4'} style={{ left: width > 1023 ? '30%' : width > 768 ? '20%' : width > 640 ? '13%' : '4%' }}>
      <div className='x-icon' onClick={() => setForgot(false)}>
        <i className="fa-solid fa-xmark dark:text-white"></i>
      </div>
      <form className={`form-control signin-form border-0 mb-4 ${darkMode ? 'bg-gray-900' : 'bg-white'} mt-5`} onSubmit={submitHandler}>
        {/* <div>
          <label className='dark:text-white'>Enter your email:</label>
          <br></br>
          <input type='text' placeholder='Your email' className='w-100 mt-3' required onChange={(e) => setEmail(e.target.value)}></input>
          <span className='text-red-800'>
            {
              emailError !== '' ?
                emailError :
                ""
            }
          </span>
        </div> */}
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
        <button disabled={validEmail? false:true} type='submit' className='py-2 px-4 rounded md:text-base text-white text-sm mt-3 font-semibold block mx-auto' style={{backgroundColor:"#f7931a"}}>Send Instruction</button>
      </form>
      <span>
        {
          message !== '' ?
            message :
            ""
        }
      </span>
    </div>
  )
}
