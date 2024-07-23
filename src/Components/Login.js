import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import userContext from './UserContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setLoginUser} = useContext(userContext);
    const navigate = useNavigate();

    const handleReset = () => {
        setUsername('');
        setPassword('');
    }

    const handleLogin = () => {
        for (var i = 0; i < localStorage.length; i++) {
            var data = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if (data.username === username && data.password === password) {
                console.log(data);
                setLoginUser(data);
                handleReset();
                alert('Login Succesful');
                navigate('/posts');
                return;
            }
        }
        alert('Incorrect username or password');
    }

    return (
        <div className='registeration'>
            <h1>Login Page</h1>
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
            <button className='registerbtn' onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login;