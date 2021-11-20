import {useState} from 'react';

const Signup = ({handleUserSignUp, toggleError, errorMsg}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signUpRequest = (event) => {
        event.preventDefault();
        let newUser = {
            username: username,
            password: password
        }
        handleUserSignUp(newUser);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={signUpRequest}>
                <label htmlFor='username'>Username: </label>
                <input type='text' name='username' onChange={handleUsernameChange}/>
                <label htmlFor='password'>Password: </label>
                <input type='password' name='password' onChange={handlePasswordChange}/>
                <input type='submit'/>
            </form>
        </div>
    )
}

export default Signup;
