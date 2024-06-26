import React, { useState } from 'react'

import axios from 'axios';
import welcomeback from './pics/welcomeBack.PNG';

const Login = ({ errorMsg, setErrorMsg, setDisplay, handleClick, setUserId, userType }) => {

    const [info, setInfo] = useState({
        username: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(info)

        try {
            const response = await axios.post('http://localhost:5000/' + userType + '-login', info);
            console.log(response.data); // Handle backend response
            setErrorMsg(response.data.message)

            if (response.data.message === "Login successful.") {
                console.log("login successful")
                setUserId(response.data.id)
                if (userType === "Doctor") {
                    setDisplay("doctor_page")
                }
                else {
                    setDisplay("patient_page")
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const goBack = async (e) => {
        setDisplay("popup")
    }

    return (
        <div className = "container">
            <div className = "row justify-content-center" style={{marginTop: '8%'}}>
                <div className = "col-md-6">
                    <img src= {welcomeback} alt = "Logo" className="ing-fluid mb-3" style = {{maxWidth: '100%', height:'auto'}}/>
                </div>
            </div>

            <div className = "row justify-content-center"> 
                <div className = "col-md-6 text-center"> 
                    <div className = "fontStyle" >
                        <form onSubmit={handleSubmit}>
                            <h3>{userType} Login</h3>
                            <h2>Username: </h2> <input type="text" name="username" onChange={handleChange} className="insertInp"/>
                            <h2>Password: </h2> <input type="password" name="password" onChange={handleChange} className="insertInp"/>
                            <div className = "logInBut">
                                <button type="submit" className='button1'>Login</button>
                            </div>
                            <p>{errorMsg}</p>
                        </form>
                        <p>Don't have an account? <a href="/#" onClick={handleClick} className='signUp'>Sign up</a></p>
                        <button onClick={goBack} className='button1'>Back</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login
