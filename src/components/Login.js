import {useState} from 'react';

const Login = ({handleLogin, toggleError, errorMsg}) => { //alt way to access props
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginRequest = (event) => {
        event.preventDefault();
        let userCredentials = {
            username: username,
            password: password
        }
        handleLogin(userCredentials);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={loginRequest}>
                <label htmlFor='username'>Username: </label>
                <input type='text' name='username' onChange={handleUsernameChange}/>
                <label htmlFor='password'>Password: </label>
                <input type='password' name='password' onChange={handlePasswordChange}/>
                <input type='submit'/>
                {toggleError && <h5>{errorMsg}</h5>}
            </form>
        </div>
    )
}

export default Login;
