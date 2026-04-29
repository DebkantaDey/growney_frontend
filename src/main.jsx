import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './context/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="101033587972-up8cdjee3n96qjqa48v29lrusqlae1ql.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
      <ToastContainer />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
