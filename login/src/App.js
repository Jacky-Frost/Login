import React from 'react'

import { Link } from 'react-router-dom'

import './Styles/main.css'
import './Styles/mainlogin.css'

function App() {
  return (
    <div>
      <div className='mainlogin-div'>
        <div className="login--button">
          <Link to='login'>Login</Link>
        </div>
        <div className="login--button">
          <Link to='register'>Register</Link>
        </div>
      </div>
    </div>
  )
}

export default App
