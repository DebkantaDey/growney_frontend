// themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the theme
const initialState = {
  darkMode: false, // false represents light mode; true represents dark mode
  isLogin: false,
  isSignup: false,
  userName: "",
  authData: localStorage.getItem("authToken") || null,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode; // toggle the theme between light and dark mode
    },
    toggleSignin:(state, action)=>{
      state.isLogin=action.payload;
      state.isSignup=false
    },
    toggleSignup:(state, action)=>{
      state.isSignup=action.payload;
      state.isLogin=false
    },
    setUserName:(state, action)=>{
      state.userName=action.payload
    },
    removeName:(state, action)=>{
      state.userName=null
    },
    signin: (state, action) => {
      const token = action.payload;
      localStorage.setItem("authToken", token);
      state.authData = token;
    },
    signout: (state) => {
      localStorage.removeItem("authToken");
      state.authData = null;
    },
  },
});

export const { toggleDarkMode, toggleSignin, toggleSignup, setUserName, removeName, signin, signout } = themeSlice.actions;

export default themeSlice.reducer;
