import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import axios, { AxiosError } from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';




export const Test : React.FC =() =>{


	const navigate = useNavigate();
    let LOGIN_URL =" https://www.mulearn.org/api/v1/mulearn-task/"
	const notifyUserError = (msg:string) => toast.error(msg);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
	const [token, setToken] =useState('')




	let user ={username:name, password:password}

	// const handleSubmit = async (event: React.FormEvent<HTMLFormElement> & {target: HTMLFormElement}) =>{
	// 	event.preventDefault();
	// 	const BASE_URL = 'https://www.mulearn.org/api/v1/mulearn-task/';
	// 	const LOGIN_ENDPOINT = 'login/';

	// 	const loginData = {
	// 	username: 'test15',
	// 	password: 123,
	// 	};

	// 	fetch(BASE_URL + LOGIN_ENDPOINT, {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify(loginData),
	// 		})
	// 	.then((response) => {
	// 		if (!response.ok) {
	// 		throw new Error('Login failed');
	// 		}
	// 		return response.json();
	// 	})
	// 	.then((data) => {
	// 		// Handle successful login response here
	// 		console.log('Access Token:', data.access);
	// 		console.log('Refresh Token:', data.refresh);
	// 		setToken(data.access)
	
	// 	})
	// 	.catch((error) => {
	// 		// Handle login failure, including invalid username or password
	// 		console.error('Login failed:', error);
	// 	});
	// }





	// const handleSubmit = async (event: React.FormEvent<HTMLFormElement> & {target: HTMLFormElement}) =>{
	// 	event.preventDefault();
	// 	const BASE_URL = 'https://www.mulearn.org/api/v1/mulearn-task/';
	// 	const REGISTER_ENDPOINT = 'register/';

	// 	const registrationData = {
	// 	username: 'irfanpa005',
	// 	password: '12345',
	// 	};

	// 	fetch(BASE_URL + REGISTER_ENDPOINT, {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 	},
	// 	body: JSON.stringify(registrationData),
	// 	})
	// 	.then((response) => {
	// 		if (!response.ok) {
	// 		return response.json().then((errorData) => {
	// 			throw new Error(errorData.username[0]);
	// 		});
	// 		}
	// 		return response.json();
	// 	})
	// 	.then((data) => {
	// 		// Handle successful registration response
	// 		console.log(data.message);
	// 	})
	// 	.catch((error) => {
	// 		// Handle registration failure, including duplicate username
	// 		console.error('Registration failed:', error);
	// 	});

	// 		}


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
	event.preventDefault();
    const BASE_URL = 'https://www.mulearn.org/api/v1/mulearn-task/';
    const REGISTER_ENDPOINT = 'register/';

    const registrationData = {
      username: 'user1',
      password: '12345',
    };

    try {
      const response = await axios.post(BASE_URL + REGISTER_ENDPOINT, registrationData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle successful registration response
      console.log(response.data.message);
    } catch (error:any) {
      // Handle registration failure, including duplicate username
      console.error('Registration failed:', error);

      if (error.response && error.response.data.username) {
        const errorMessage = error.response.data.username[0];
        notifyUserError(errorMessage);
		console.log(errorMessage)
      }
    }
  };










		const handleTodo = async () =>{

		const BASE_URL = 'https://www.mulearn.org/api/v1/mulearn-task/';
		const TODO_ENDPOINT = 'todo/';

		// Assuming you have the user's access token
		const accessToken = `Bearer ${token}`

		fetch(BASE_URL + TODO_ENDPOINT, {
		method: 'GET',
		headers: {
			'Authorization': accessToken,
		},
		})
		.then((response) => {
			if (!response.ok) {
			throw new Error('Failed to fetch todos');
			}
			return response.json();
		})
		.then((data) => {
			// Handle successful response
			console.log('Todos:', data);
		})
		.catch((error) => {
			// Handle the error, including token validity issues
			console.error('Fetching todos failed:', error);
		});

			}




    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" onChange={(e) =>{setName(e.target.value)}} />
                <input type="email" name="email" onChange={(e) =>{setEmail(e.target.value)}} />
                <input type="text" name="password" onChange={(e) =>{setPassword(e.target.value)}} />
                <input type="submit" />
            </form>
			<button onClick={handleTodo}>todo tasks</button>
			<ToastContainer 
				position="top-center"
				theme="colored"
			/>
        </div>
    )
}