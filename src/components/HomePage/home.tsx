import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export const Home:React.FC = () => {
    const navigate = useNavigate();

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
    
	const handleSignIn = async (event: React.FormEvent<HTMLFormElement> & {target: HTMLFormElement}) =>{
        event.preventDefault();
        const existingUserData = localStorage.getItem('users');
        const users = existingUserData ? JSON.parse(existingUserData) : [];
        const user = users.find((u:SignInForm) => u.userName === loginData.userName && u.password === loginData.password);

        if (user){
            localStorage.setItem('token', 'mulearn123');
            navigate(`todo-tasks/${user.userName}`, { state: { username: user.userName } });
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
        </div>
    </main>
    )
}