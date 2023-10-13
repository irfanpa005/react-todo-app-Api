import React, { useState } from 'react';
import './tasks.css'

type taskProps = {
    id:number
    task: string,
    isCompleted: boolean
}

type funProps = {
    addTask : (newTitle:string) => void;
}


export function NewTask({addTask}:funProps){

    const [newtask, setNewTask] = useState<taskProps>({
        id:0,
        task: "",
        isCompleted: false
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target; 
        setNewTask((prevData) => ({...prevData, [name] : type === 'checkbox' ? checked : value}))
    }

    const handleAddTask = () => {
        addTask(newtask.task)
        setNewTask({
            id:0,
            task: "",
            isCompleted: false,
        })

    }

    return (
        <div className="new-task-div mx-auto">
            <input type="checkbox" id="roundedCheckbox" className="rounded-checkbox" name="isCompleted" onChange={handleChange} checked={newtask.isCompleted}/>
            <input type="text" className="new-task" placeholder="Add Task" name="task" onChange={handleChange} value={newtask.task} required />
            { newtask.task.trim() ? <i className="fa-solid fa-plus fa-xl" onClick={handleAddTask}></i> : "" }
        </div>
    )
}