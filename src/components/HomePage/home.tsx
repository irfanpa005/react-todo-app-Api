import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


export const Home:React.FC = () => {
    const navigate = useNavigate();

    const BASE_URL = 'https://www.mulearn.org/api/v1/mulearn-task/';
    const LOGIN_ENDPOINT = 'login/';

    {/* Error / success notification */}
    const notifyError = (msg:string) => toast.error(msg);
    const notifySuccess = (msg:string) => toast.success(msg);

    type SignInForm = {
        userName:string;
        password:string;
    }

    const [loginData, setLoginData] = useState<SignInForm>({
        userName : '',
        password: ''
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
       const {name ,value} = e.target
       setLoginData(prevData => ({...prevData, [name]:value}))
    }

    const loginUser = {
        username: loginData.userName,
        password: loginData.password,
    };
    
	const handleSignIn = async (event: React.FormEvent<HTMLFormElement> & {target: HTMLFormElement}) =>{
        event.preventDefault();

        try {
            const response = await axios.post(BASE_URL + LOGIN_ENDPOINT, loginUser, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            //Handle successful registration response
            notifySuccess('User logged in successfully');
            console.log('Access Token:', response.data.access);
            console.log('Refresh Token:', response.data.refresh);
            localStorage.setItem('access token', response.data.access);
            localStorage.setItem('refresh token', response.data.refresh);
            navigate(`/todo-tasks/${loginData.userName}`, {
                state: { access: response.data.access, refresh: response.data.refresh, username: loginData.userName },
            });

        } catch (error :any)  {
            // Handle login failure, including invalid username or password
           console.error('Login failed:', error);
           notifyError('No active account found with the given credentials');
        }
      } 
  
    return (
    <main>
        <div className='login'>
            <form onSubmit={handleSignIn}>
                <h4>Login</h4>
                <input className='form-control' type='text' placeholder='username' name="userName" onChange={handleChange} required />
                <input className='form-control' type='password' placeholder='password' name="password" onChange={handleChange} required/>
                <input className='form-control btn btn-info' type='submit' value='Sign In' />
            </form>
            <Link to="/register" className="btn btn-danger">Create New Account</Link>
            <ToastContainer 
                position="top-center"
                theme="colored"
            />
        </div>
    </main>
    )
}