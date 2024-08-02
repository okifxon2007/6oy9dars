import React, { useRef } from 'react';
import '../register/index.css';
import { Link, useNavigate, } from 'react-router-dom';

function Login() {
  let usernameRef = useRef('');
  let passwordRef = useRef('');
  const navigate = useNavigate('')
  function validate(username, password) {
    let isValid = true;

    if (username.length < 3) {
      alert('Username 3ta harfdan kam');
      usernameRef.current.focus();
      usernameRef.current.style.outlineColor = 'red';
      isValid = false;
    }
    if (password.length < 3) {
      alert('Parolni hato kiritdingiz');
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = 'red';
      isValid = false;
    }

    return isValid;
  }

  function handlelogin(e) {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    let isValid = validate(username, password);
    if (!isValid) {
      return;
    }

    let user = {
    username : usernameRef.current.value,
    password : passwordRef.current.value
    }

    fetch('https://auth-rg69.onrender.com/api/auth/signin',{
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(data =>{
      if (data.message == "User Not found.") {
        alert(data.message)
        usernameRef.current.focus()
        return
      }
      if (data.message == "Invalid Password") {
        alert(data.message)
        usernameRef.current.focus()
      }
      if (data.accessToken) {
        localStorage.setItem('user', JSON.stringify(data))
        localStorage.setItem('Token', data.accessToken)
        navigate('/home')
      }
    })
    .then(error =>{
      console.log(error);
    })
    
  }

  return (
    <div className="container">
      <form>
        <h1>Login Page</h1>
        <input ref={usernameRef} type="text" placeholder="Enter username" />
        <input ref={passwordRef} type="password" placeholder="Enter password" />
        <button onClick={handlelogin}>LOGIN</button>
        <div className="link-container">
          <Link to="/register">REGISTER</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
