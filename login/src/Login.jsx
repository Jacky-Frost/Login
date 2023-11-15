import React, { useEffect, useState, useRef } from 'react'

import { Link } from 'react-router-dom'

import './Styles/mainlogin.css'
import './Styles/main.css'

function Login() {

    //  Varaibles

    //  Regular Expressions
    const USER_REG = /^[a-zA-Z0-9_-]{4,24}$/
    const PWD_REG = /^([a-zA-Z0-9!@#$%^&*-_=+]{4,15})$/

    //  References
    const userRef = useRef()
    const pwdRef = useRef()

    //  States
    const [errorMsg, setErrorMsg] = useState('')
    const [username, setUsername] = useState('')
    const [pwd, setPwd] = useState('')

    //  Effects
    useEffect(() => {
        userRef.current.focus()
        document.querySelector('.error-message').classList.add('offScreen')
    }, [])

    useEffect(() => {
        errorMsg === '' ? document.querySelector('.error-message').classList.add('offScreen') : document.querySelector('.error-message').classList.remove('offScreen')
    }, [errorMsg])

    //  Handle Login

    const handleLogin = () => {
        (!USER_REG.test(username) || !PWD_REG.test(pwd)) ? setErrorMsg('Username and Password Required') : setErrorMsg(`${username} logged in!`)
    }

    return (
        <div>
            <form action="">
                <div className='mainlogin-div'>
                    <h1>Login</h1>
                    <div className="login-input">
                        <input type="text" autoComplete='off' placeHolder='username' ref={userRef} onChange={(e) => {
                            setUsername(userRef.current.value)
                        }} />
                    </div>
                    <div className="login-input">
                        <input type="password" autoComplete='off' placeHolder='password' ref={pwdRef} onChange={(e) => {
                            setPwd(pwdRef.current.value)
                        }} />
                    </div>
                    <p className="error-message">
                        {errorMsg}
                    </p>
                    <button onClick={(e) => {
                        e.preventDefault()
                        handleLogin()
                    }}>Login</button>
                    <h2>
                        No account? <Link to='/register'>Register</Link>
                    </h2>
                </div>
            </form>
        </div>
    )
}

export default Login
