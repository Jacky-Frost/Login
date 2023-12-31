import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Styles/mainlogin.css'
import './Styles/main.css'

function Register() {

    //  Variables

    // Regular Expressions

    // eslint-disable-next-line
    const EMAIL_REG = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    const USER_REG = /^[a-zA-Z0-9_-]{4,24}$/
    const PWD_REG = /^([a-zA-Z0-9!@#$%^&*-_=+]{4,15})$/

    //  References
    const emailRef = useRef()
    const userRef = useRef()
    const pwdRef = useRef()
    const confirmPwdRef = useRef()

    //  States
    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [pwd, setPwd] = useState(null)
    const [confirmPwd, setConfirmPwd] = useState(null)
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(false)

    // Effects

    //  Initial Setup

    useEffect(() => {
        //  Hide text prompts
        document.querySelectorAll('.text-info').forEach((text) => text.classList.add('offScreen'))

        //  Focus on Email
        emailRef.current.focus()

        //  Hide message
        document.querySelectorAll('.error-message').forEach((item) => item.classList.add('offScreen'))
    }, [])

    useEffect(() => {
        if (email !== null) {
            EMAIL_REG.test(email) ? document.getElementById('emailInf').classList.add('offScreen') : document.getElementById('emailInf').classList.remove('offScreen')
        }
        // eslint-disable-next-line
    }, [email])

    useEffect(() => {
        if (username !== null) {
            USER_REG.test(username) ? document.getElementById('userInf').classList.add('offScreen') : document.getElementById('userInf').classList.remove('offScreen')
        }
        // eslint-disable-next-line
    }, [username])

    useEffect(() => {
        if (pwd !== null) {
            PWD_REG.test(pwd) ? document.getElementById('pwdInf').classList.add('offScreen') : document.getElementById('pwdInf').classList.remove('offScreen')
            if (confirmPwd !== null) {
                pwd === confirmPwd ? document.getElementById('confirmPwdInf').classList.add('offScreen') : document.getElementById('confirmPwdInf').classList.remove('offScreen')
            }
        }
        // eslint-disable-next-line
    }, [pwd, confirmPwd])

    useEffect(() => {
        message === '' ? document.querySelectorAll('.error-message').forEach((item) => item.classList.add('offScreen')) : document.querySelectorAll('.error-message').forEach((item) => item.classList.remove('offScreen'))
    }, [message])

    // Handle Submit Function

    const handleSumbit = async (e) => {
        e.preventDefault()
        //  Check Fields
        const validEmail = EMAIL_REG.test(email)
        const validUser = USER_REG.test(username)
        const validPwd = PWD_REG.test(pwd)
        const matchPwd = pwd === confirmPwd

        if (validEmail && validUser && validPwd && matchPwd) {
            try {
                axios.post('http://localhost:5000/register', {
                    email: email,
                    username: username,
                    password: pwd
                })
                    .then(function (response) {
                        setMessage(response.data.message)
                        setSuccess(true)
                    })
                    .catch(function (error) {
                        setMessage(error.response.data.message)
                    })
            } catch (error) {
                console.log(error)
            }
        } else {
            setMessage('Something is not quite right')
        }

    }

    return (
        <div>
            {success ? <Success /> : <form action="">
                <div className='mainlogin-div'>
                    <h1>Register</h1>
                    <div className="login-input">
                        <input type="email" placeholder='Email' required ref={emailRef} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                        <p id='emailInf' className='text-info'>
                            Email invalid
                        </p>
                    </div>
                    <div className="login-input">
                        <input type="text" placeholder='Username' required ref={userRef} onChange={(e) => {
                            setUsername(e.target.value)

                        }} />
                        <p id='userInf' className='text-info'>
                            Username between 4 and 24 characters, letters, numbers and _ and - are allowed, no other special characters.
                        </p>
                    </div>
                    <div className="login-input">
                        <input type="password" placeholder='Password' required ref={pwdRef} onChange={(e) => {
                            setPwd(e.target.value)
                        }} />
                        <p id='pwdInf' className='text-info'>
                            Anything between 4 to 24 characters, letters, numbers, ! @ # $ % ^ & * - _ = + are all allowed
                        </p>
                    </div>
                    <div className="login-input">
                        <input type="password" placeholder='Confirm Password' required ref={confirmPwdRef} onChange={(e) => {
                            setConfirmPwd(e.target.value)
                        }} />
                        <p id='confirmPwdInf' className='text-info'>
                            Passwords must match!
                        </p>
                    </div>
                    <p className="error-message">
                        {message}
                    </p>
                    <button onClick={(e) => {
                        handleSumbit(e)
                    }}>Register</button>
                    <h2>
                        Have an account? <Link to='/login'>Login</Link>
                    </h2>
                </div>
            </form>}
        </div>
    )
}

//  Success Screem

function Success() {
    return (
        <div className='success-div'>
            <h1>
                Success!
            </h1>
            <p>
                New User has been Created! Now you can login with your account! <br />
                <Link to='/login'>Login</Link>
            </p>
        </div>
    )
}

export default Register
