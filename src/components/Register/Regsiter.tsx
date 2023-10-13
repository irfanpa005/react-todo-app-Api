import { Link ,useNavigate} from "react-router-dom"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


export const Register: React.FC = () =>{
    const navigate = useNavigate();
    const BASE_URL = 'https://www.mulearn.org/api/v1/mulearn-task/';
    const REGISTER_ENDPOINT = 'register/';

    {/* Error / success notification */}
    const notifyError = (msg:string) => toast.error(msg);
    const notifySuccess = (msg:string) => toast.success(msg);

    {/* Registration Form fields */}
    type userProps = {
        userName: string;
        password: string;
        confPassword: string
      }

    const [newUserData, setUser] = useState<userProps> ({
        userName: '',
        password: '',
        confPassword: ''
      })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value} = e.target;
        setUser(prevData => ({...prevData, [name]: value}))
      }
    
    const handleRegistration = async (e:React.ChangeEvent<HTMLFormElement> & {target: HTMLFormElement}) =>{
        e.preventDefault();
   
        const registrationData = {
          username: newUserData.userName,
          password: newUserData.password,
        };
    
        if (newUserData.password === newUserData.confPassword){
            try {
              const response = await axios.post(BASE_URL + REGISTER_ENDPOINT, registrationData, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
        
              // Handle successful registration response
              console.log(response.data.message);
              notifySuccess('Registration Success')
              navigate('/')
            } catch (error:any) {
              // Handle registration failure, including duplicate username
              console.error('Registration failed:', error);
        
              if (error.response && error.response.data.username) {
                const errorMessage = error.response.data.username[0];
                notifyError(errorMessage);
              }
            }
        } else{
          notifyError('Password Mismatch')
        }
    }

    return (
    <main>
        <div className='login'>
            <form onSubmit={handleRegistration}>
                <h4>Register Here!</h4>
                <input className='form-control' type='text' placeholder='username' name="userName" value={newUserData.userName} onChange={handleChange} required/>
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