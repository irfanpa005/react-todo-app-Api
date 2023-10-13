import { useEffect, useState } from 'react';
import './tasks.css'
import { useNavigate } from 'react-router-dom';
import  {TasksList}  from './TasksList'
import { NewTask } from './NewTask';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export const Tasks: React.FC = () => {

  type taskProps = {
    id:number
    title: string,
    isCompleted: boolean
  }
  
  
  interface Tokens {
      access: string;
      refresh: string;
      username:string;
    }


    const navigate = useNavigate();
    const location = useLocation();
    const { access, refresh, username } = location.state as Tokens;

    const notifyError = (msg:string) => toast.error(msg);
    const notifySuccess = (msg:string) => toast.success(msg);

    const BASE_URL = 'https://www.mulearn.org/api/v1/mulearn-task/';
    const TODO_ENDPOINT = 'todo/';


    const [todos, setTodos] = useState<taskProps[]>([])
    
    
    // Get all todos from server
    const getToDo = async () => {
      try 
      {
        const response = await axios.get(BASE_URL+TODO_ENDPOINT,
            {
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access
              }
            }
        );
        const todo:any = (response?.data)
        console.log(todo)
        setTodos(todo);
      
      } 
      catch (error:any) {
        console.error('Data fetch failed:', error);
  
        if (error.response && error.response.data.code) {
          const errorMessage = error.response.data.code[0];
          console.log(errorMessage);
        }
      }
    }
  
    useEffect(() => {
        getToDo();
    },[])



    // Add New Todo task
    const addNewTask = async (task_title:string) => {
      try{
        const response = await axios.post(BASE_URL+TODO_ENDPOINT,{title: task_title},
          {
            headers:
            {
              'Content-Type' : 'application/json',
              'Authorization': 'Bearer ' + access
            },

          });

        console.log('Todo created:', response.data);
      }
      catch(error){
      console.error('Error:', error);
      }
    }

    const handleLogout = () => {
        localStorage.removeItem('acess token');
        navigate('/')
      }

    
      
    // Delete Todo Task
    const deleteTask = async (taskId:number) => {
      try {
        const response = await axios.delete(
          `${BASE_URL}${TODO_ENDPOINT}${taskId}/`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access}`,
            },
          }
        );
        getToDo();

      } catch (error) {
        console.error('Error:', error);
      }
    };


    // Todo Status Update
    const completedTaskToggle = async (taskId:number,isCompleted:boolean) => {
      try {
        const response = await axios.put(
          `${BASE_URL}${TODO_ENDPOINT}${taskId}/`,
          { isCompleted }, // Updated status
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access}`,
            },
          }
        );
        getToDo();

      } catch (error) {
        // Handle errors here
        console.error('Error:', error);
      }
    };




    // Clear all completed Todos
      const clearCompleted = async () => {
      const completedTasks= todos.filter(todo => todo.isCompleted === true)
      for (const todo of completedTasks){
        await deleteTask(todo.id)
        }
      }



    // Functions to filter the tasks based on bottom menu
    const [filteredTasks, setFilteredTasks] = useState<taskProps[] | []>([]);
    const [filter, setFilter] = useState<string>('all');
  
    const filterTasks = () => {
      if (filter === 'active') {
        setFilteredTasks(todos.filter(todo => !todo.isCompleted));
      } else if (filter === 'completed') {
        setFilteredTasks(todos.filter(todo => todo.isCompleted));
      } else {
        setFilteredTasks(todos);
      }
    };
  
    useEffect(() => {
      filterTasks();
    }, [filter,todos]);




    return (
        <>
            <div>
                <h5 className='text-white'>Welcome,{username}</h5>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <NewTask addTask={addNewTask}/>

            {todos && todos.length > 0 && 
                <TasksList
                    tasks={todos}
                    onDelete={deleteTask}
                    onComplete={completedTaskToggle}
                    filterTasks={setFilter}
                    filteredTasks={filteredTasks}
                    clearCompleted={clearCompleted}

                />
            }

        </>
    )
}


