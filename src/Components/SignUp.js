import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const navigate = useNavigate();

    const handleReset = ()=>{
        setUsername('');
        setPassword('');
        setContact('');
    }

    const handleRegister =()=>{
        if(!username || !password || !contact){
            alert('Fill all fields to proceed');
        }

        const user = {
            username,
            password,
            contact
        };

        const userKey = `user_${Date.now()}`;

        localStorage.setItem(userKey, JSON.stringify(user));

        handleReset();
        alert('User registered successfully');
        navigate("/login");
    }

    return (
        <div className='registeration'>
            <h1>Sign Up Page</h1>
            <div>
                <label>Username : </label>
                <input type='text' value={username} onChange={(e) => {
                    setUsername(e.target.value);
                }} placeholder='Enter username'>
                </input>
            </div>
            <div>
                <label>Password : </label>
                <input type='password' value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} placeholder='Enter password'>
                </input>
            </div>
            <div>
                <label >Contact : </label>
                <input style={{marginLeft : '30px'}} type='text' value={contact} onChange={(e) => {
                    setContact(e.target.value);
                }} placeholder='Enter contact no.'>
                </input>
            </div>
            <button className='registerbtn' onClick={handleRegister}>Register</button>
            <div>
                <p style={{marginLeft : '30px'}}>Already a member? </p>
                <Link to="/login">Login</Link>
            </div>
        </div>
    )
}

export default SignUp;