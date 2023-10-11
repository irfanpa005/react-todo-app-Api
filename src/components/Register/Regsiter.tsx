import { Link ,useNavigate} from "react-router-dom"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Register: React.FC = () =>{
    const navigate = useNavigate();

    {/* Error Messages */}
    const notifUserError = () => toast.error('Username already exists.');
    const notifEmailError = () => toast.error('Account with email already exists.');
    const notifPasswordError = () => toast.error('Passwords Missmatch.');
    const notifRegSuccess = () => toast.success('User Created Successfully.');
    const notifEmptyFields = () => toast.error('Please enter valid details.');


    {/* Registration Form fields */}
    type userProps = {
        userName: string;
        email: string;
        password: string;
        confPassword: string
      }

    const [newUserData, setUser] = useState<userProps> ({
        userName: '',
        email: '',
        password: '',
        confPassword: ''
      })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value} = e.target;
        setUser(prevData => ({...prevData, [name]: value}))
      }
    
    const handleRegistration = (e:React.ChangeEvent<HTMLFormElement> & {target: HTMLFormElement}) =>{
        e.preventDefault();
        const existingUserData = localStorage.getItem('users');
        const users: userProps[] = existingUserData ? JSON.parse(existingUserData) : [];

        const existingUserName = users.find((user) => user.userName === newUserData.userName);
        const existingUserEmail = users.find((user) => user.email === newUserData.email);

        if (newUserData.userName.trim() === '' || newUserData.email.trim() === '' ||
            newUserData.password === '') {
              notifEmptyFields();
            }
    
        if (existingUserName) {
          notifUserError();
        } else if (existingUserEmail) {
          notifEmailError();
        } else if (newUserData.password != newUserData.confPassword){
          notifPasswordError();
        } else {
          users.push(newUserData);
          localStorage.setItem('users', JSON.stringify(users));
          navigate('/')
          notifRegSuccess();
        }
    }

    return (
    <main>
        <div className='login'>
            <form onSubmit={handleRegistration}>
                <h4>Register Here!</h4>
                <input className='form-control' type='text' placeholder='username' name="userName" value={newUserData.userName} onChange={handleChange} required/>
                <input className='form-control' type='email' placeholder='email' name="email" value={newUserData.email} onChange={handleChange} required/>
                <input className='form-control' type='password' placeholder='password' name="password" value={newUserData.password} onChange={handleChange} required />
                <input className='form-control' type='password' placeholder='confirm password' name="confPassword" value={newUserData.confPassword} onChange={handleChange} required />
                <input className='form-control btn btn-info' type='submit' value='Register' />
                <ToastContainer 
                    position="top-center"
                    theme="colored"
                />
            </form>
            <span><p className="text-white">Have Account?</p><Link to="/" className="btn btn-dark">Sign In Here</Link></span>
        </div>
    </main>
    )
}