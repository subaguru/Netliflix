import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/validate';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from '../utils/firebase';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice'
const Login = () => {
  const email = useRef(null)
  const password = useRef(null)
  const name = useRef(null)
  const [isSignInForm, setIsSignInForm]  = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleButtonClick = ()=>{
    //Validate the form data
    const message = checkValidateData(email.current.value,password.current.value)
    seterrorMessage(message);
    if(message) return;

    //SignIn/SignUp
    if(!isSignInForm)
    {
      //SignUp Logic
      createUserWithEmailAndPassword(auth , email.current.value , password.current.value)
    .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName:name.current.value ,
      photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj71agPYnfFtK-H5CrWBlWgUQ7zSWXd6bIfw&s"
   }).then(() => {
    const {uid, email, displayName, photoURL} = auth.currentUser;
     dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL})) 
     navigate('/browse')
   }).catch((error) => {
     seterrorMessage(error.message)
   });
    console.log(user);
   })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrorMessage(errorCode + "-" + errorMessage)
    
    });

    }
    else
    {
      //SignIn Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigate('/browse')
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Sign-in error:', errorCode, errorMessage);
        seterrorMessage(errorCode + "-" + errorMessage)
      });
    }


  

  }
  const toggleSignInForm = ()=> {setIsSignInForm(!isSignInForm)}
  return (
    <div>
        <Header />
        <div className='absolute'>
            <img 
            src='https://assets.nflxext.com/ffe/siteui/vlv3/7c0e18aa-2c95-474d-802e-7f30e75dcca4/web/IN-en-20241014-TRIFECTA-perspective_e7121311-c11e-4809-a3e6-22abffa33569_large.jpg'
            alt = 'logo'
            />
        </div>
        <form onSubmit={(e)=> e.preventDefault()} className='absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
          <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
          {!isSignInForm && (<input ref={name}  type='text' placeholder='Full Name' className='p-4 my-3 w-full bg-gray-600 rounded-md' />)}
          <input ref ={email} type='text' placeholder='Email' className='p-4 my-3 w-full bg-gray-600 rounded-md' />
          <input ref = {password} type='password' placeholder='Password' className='p-4 my-3 w-full  bg-gray-600 rounded-md' />
          <p className='text-red-500 font-bold py-2'>{errorMessage}</p>
          <button className='p-4 my-6 bg-red-600 w-full rounded-md' onClick={handleButtonClick}>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className='py-4 cursor-pointer'onClick={toggleSignInForm}>
            {isSignInForm ? "New to Netflix? Sign Up Now !" : "Already a user? Sign In Now !"}
          </p>
        </form>
    </div>
  )
}

export default Login