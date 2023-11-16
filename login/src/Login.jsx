import React, { useEffect, useState, useRef } from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'

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
    const [message, setMessage] = useState('')
    const [username, setUsername] = useState('')
    const [pwd, setPwd] = useState('')

    //  Effects
    useEffect(() => {
        userRef.current.focus()
        document.querySelector('.error-message').classList.add('offScreen')
    }, [])

    useEffect(() => {
        message === '' ? document.querySelector('.error-message').classList.add('offScreen') : document.querySelector('.error-message').classList.remove('offScreen')
    }, [message])

    //  Handle Login

    const handleLogin = () => {
        if (!USER_REG.test(username) || !PWD_REG.test(pwd)) { return setMessage('Username and Password Required') }
        try {
            axios.post('http://localhost:5000/login', {
                username: username,
                password: pwd
            })
            .then( function (response) {
                setMessage(response.data.message)
            })
            .catch( function (error) {
                setMessage(error.response.data.message)
            } )
        } catch (error) {
            console.log(error)
        }
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
                        {message}
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
