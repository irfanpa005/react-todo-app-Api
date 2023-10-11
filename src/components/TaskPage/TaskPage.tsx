import { useEffect, useState } from 'react';
import './tasks.css'
import { useNavigate } from 'react-router-dom';
import  {TasksList}  from './TasksList'
import { NewTask } from './NewTask';
import { useLocation } from 'react-router-dom';


export const Tasks: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state && location.state.username;

    type taskProps = {
        id:string
        task: string,
        isCompleted: boolean,
        user:string
    }

    const [todos, setTodos] = useState<taskProps[]>(() => {
        const localTasks = localStorage.getItem(`${username}-tasks`)
        if (localTasks == null){
            return []
        }else {
            return JSON.parse(localTasks);
          }
    });

    useEffect(() => {
        localStorage.setItem(`${username}-tasks`,JSON.stringify(todos));
    },[todos])


    function addNewTask(newTask:taskProps){
        setTodos(prevTodos => {
            return [...prevTodos,newTask]
        })
    }



    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/')
      }


    function deleteTask (taskId:string){
        const newtodos = todos.filter(todo => todo.id != taskId)
        setTodos(newtodos)
    }


    function completedTaskToggle(taskId:string,isCompleted:boolean) {
        const newtodos = todos.map(todo => {
            if (todo.id === taskId) {
                return {
                    ...todo,
                    isCompleted
                };
            }
            return todo;
        });
        setTodos(newtodos)
    }

    const [filteredTasks, setFilteredTasks] = useState<taskProps[]>([]);
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
    }, [filter, todos]);
  
    function clearCompleted(){
        const incompleteTasks= todos.filter(todo => todo.isCompleted === false)
        setTodos(incompleteTasks)
    }

    return (
        <>
            <div>
                <h5 className='text-white'>Welcome,{username}</h5>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <NewTask addTask={addNewTask} user={username}/>

            {todos && todos.length > 0 && 
                <TasksList
                    tasks={todos}
                    onDelete={deleteTask}
                    onComplete={completedTaskToggle}
                    // activeTasks={activeTasks}
                    // completedTasks={completedTasks}
                    filterTasks={setFilter}
                    filteredTasks={filteredTasks}
                    clearCompleted={clearCompleted}

                />
            }

        </>
    )
}


