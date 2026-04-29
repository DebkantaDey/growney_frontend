import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function Reset() {

  //   const navigate = useNavigate()
  // const [username, setUsername] = useState('')

  // const usernameHandler = (event) => {
  //   setUsername(event.target.value)
  // }

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const query = useQuery();
  // const history = useHistory();


  //Password View Code start
  const [passwordView, setPasswordView] = useState(false);
  const [CornPasswordView, setCornPasswordView] = useState(false);
  //Password View Code end

  const resetPassword = (e, type) => {
    switch (type) {
      case "password":
        setPassword(e.target.value);
        break;
      case "confirm":
        setConfirm(e.target.value);
      default:
    }
  }

  // async function resetRequest() {
  //   try {
  //     await fetch('http://localhost/hs-login-system/api/reset', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         username: username,
  //       }),
  //     })
  //       .then((respose) => {
  //         if (respose.ok) {
  //           return respose.json()
  //         }
  //         throw new Error('error')
  //       })
  //       .then((data) => {
  //         if (data.status) {
  //           navigate('/')
  //         } else {
  //           //set error
  //         }
  //       })
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validPassword && validConfirm){
    try {
      const token = query.get('token');
      const response = await axios.post('https://rankterminal.com/growney/public/index.php/api/reset-pass', { token, password });
      setMessage(response.data.message);
      if (response.data.success) {
        //history.push('/login');
      }
    } catch (error) {
      setMessage('Error resetting password.');
    }
  }
  else{
    toast.error("Please check password and confirm password and try again")
  }
  };

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
  //Window code end

  //Password verification start
  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)
  const [passwordVerificationMsg, setPasswordVerificationMsg]=useState(false)

  useEffect(() => {
    const result = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (result.test(password) && password.length > 7) {
      setValidPassword(result)
    }
    else{
      setValidPassword(false)
    }
  }, [password])
  //Password verification end


  //Confirm password verification start
  const confirmRef = useRef();
  const [validConfirm, setValidConfirm] = useState(false)
  const [confirmFocus, setConfirmFocus] = useState(false)

  useEffect(()=>{
      if(password === confirm){
        setValidConfirm(true)
      }
      else{
        setValidConfirm(false)
      }
  },[confirm])
  //Confirm password verification end

  return (
    <div className='w-11/12 sm:w-9/12 md:w-7/12 lg:w-2/5 fixed top-16 left-0 mx-auto z-50 bg-white rounded-xl shadow-2xl p-4' style={{ left: width > 1023 ? '30%' : width > 768 ? '20%' : width > 640 ? '13%' : '4%' }}>
      <form className='form-control signin-form border-0 mb-4 bg-white mt-5' onSubmit={handleSubmit}>
        <div className='relative'>
          <label>Your password</label>
          <br></br>
          <input type={passwordView ? 'text' : 'password'}
            placeholder='Your password'
            className='w-100 mt-3'
            onChange={(e) => resetPassword(e, "password")}
            aria-invalid={validPassword ? "false" : "true"}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          ></input>
          <i className={`fa-solid ${passwordView ? 'fa-eye' : 'fa-eye-slash'} absolute top-14 right-3`} onClick={() => setPasswordView(!passwordView)}></i>
          <span className='text-red-800'>
            {password.length < 7 && password !== '' ? "Password length should be 8 character and above" : !validPassword && passwordFocus && password !== '' ? "The password should contain atleast one lowercase, one uppercase, one digit and one special character" : ""}
          </span>
        </div>
        <div className='relative'>
          <label>Confirm password</label>
          <br></br>
          <input type={CornPasswordView ? 'text' : 'password'}
            placeholder='Confirm password'
            className='w-100 mt-3'
            onChange={(e) => resetPassword(e, "confirm")}
            id='confirm'
            ref={confirmRef}
            autoComplete='off'
            required
            aria-invalid={validConfirm ? "false" : "true"}
            aria-describedby='uidnote'
            onFocus={() => setConfirmFocus(true)}
            onBlur={() => setConfirmFocus(false)}
          ></input>
          <i className={`fa-solid ${CornPasswordView ? 'fa-eye' : 'fa-eye-slash'} absolute top-14 right-3`} onClick={() => setCornPasswordView(!CornPasswordView)}></i>
          <span className='text-red-800'>
            {!validConfirm && confirm !== '' && password !== confirm ? "Password does not match" : ""}
          </span>
        </div>
        <button type='submit' className='sign-button py-2 px-4 rounded'>Change Password</button>
      </form>
    </div>
  )
}
