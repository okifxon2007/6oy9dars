import React, { useRef} from 'react';
import '../register/index.css';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  
  let usernameRef = useRef(null);
  let emailRef = useRef(null);
  let passwordRef = useRef(null);
  let repasswordRef = useRef(null);

  const navigate = useNavigate('')
  function validate(username, email, password, repassword) {
    let isValid = true;


    if (username.length < 3) {
      alert('Username 3ta harfdan kam');
      usernameRef.current.focus();
      usernameRef.current.style.outlineColor = 'red';
      isValid = false;
    }
    if (!email.includes('@gmail.com')) {
      alert('Bu yerda gmailni hato yozdingiz');
      emailRef.current.focus();
      emailRef.current.style.outlineColor = 'red';
      isValid = false;
    }
    if (password.length < 3) {
      alert('Parolni hato kiritdingiz');
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = 'red';
      isValid = false;
    }
    if (repassword !== password) {
      alert('Birinchi qoygan parolingiz bilan bir xil emas');
      repasswordRef.current.focus();
      repasswordRef.current.style.outlineColor = 'red';
      isValid = false;
    }
    return isValid;
  }

  function handleRegister(e) {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const repassword = repasswordRef.current.value;

    let isValid = validate(username, email, password, repassword);
    if (!isValid) {
      return;
    }
    const user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch('https://auth-rg69.onrender.com/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Failed! Email is already in use!") {
        alert(data.message)
        emailRef.current.focus()
        return
      }
      if (data.message === "Failed! Username is already in use!") {
        alert(data.message)
        usernameRef.current.focus()
        return
      }
      if (data.message === "User registered successfully!") {
        navigate('/login')
      }
      
    })
    .catch(error => {
      console.log(error);
    })
    
  }

  return (
    <div className="register-container">
      <form>
        <h1>Register Page</h1>
        <input ref={usernameRef} type="text" placeholder="Enter username" />
        <input ref={emailRef} type="email" placeholder="Enter email" />
        <input ref={passwordRef} type="password" placeholder="Enter password" />
        <input ref={repasswordRef} type="password" placeholder="Re-enter password" />
        <button onClick={handleRegister}>REGISTER</button>
        <div className="link-container">
          <Link to="/login">LOGIN</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
