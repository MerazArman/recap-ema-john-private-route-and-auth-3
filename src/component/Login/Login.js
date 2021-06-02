import React, { useContext, useState } from 'react';
import {firebaseConfigInitializeApp, handleGoogleSignIn, handleFbSignIn, handleSignOut, signUpWithEmailAndPassword, signInPasswordWithEmail} from './LoginManagger'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });
  const [userLogged, setUserLogged] = useContext(UserContext)
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


  firebaseConfigInitializeApp()

  const responseHandler = (res, redirect) =>{
    setUser(res)
    setUserLogged(res)
    if (redirect) {
      history.replace(from)
    }
    
  }

  const googleSignIn = () =>{
    handleGoogleSignIn()
    .then((res) =>{
      responseHandler(res, true)
    })
   
  };
//---------------
  const fbSignIn = () =>{
    handleFbSignIn()
    .then(res =>{
      setUser(res)
      setUserLogged(res)
      history.replace(from)
    })
  
  }
  //-----------------------

  const signOut = () =>{
    handleSignOut()
    .then(res =>{
      setUser(res)
      setUserLogged(res)
    })   
  }
// ------------------------------

  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber =  /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  //--------------------------------


  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      signUpWithEmailAndPassword(user.name, user.email, user.password)
      .then(res =>{
        setUser(res)
        setUserLogged(res)
        history.replace(from)
      })   
    }
    if(!newUser && user.email && user.password){
      signInPasswordWithEmail(user.email, user.password)
      .then(res =>{
        setUser(res)
        setUserLogged(res)
        history.replace(from)
      })     
    }

    e.preventDefault();
  }


  return (
    <div className="">
      { user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
        <button onClick={googleSignIn}>Sign In</button>
      }
      <br/>
      <button onClick={fbSignIn}>Sign in using Facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}!</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }

      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your name"/>}
        <br/>
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required/>
        <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required/>
        <br/>
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      { user.success && <p style={{color: 'green'}}>User { newUser ? 'created' : 'Logged In'} successfully</p>}
    </div>
  );
}

export default Login;