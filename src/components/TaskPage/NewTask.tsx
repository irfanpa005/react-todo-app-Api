import React, { useState } from 'react';
import './tasks.css'

type taskProps = {
    id:string
    task: string,
    isCompleted: boolean,
    user:string
}

type funProps = {
    user:string,
    addTask : (newTask:taskProps) =>void;
}


export function NewTask({addTask, user }:funProps){

    const [newtask, setNewTask] = useState<taskProps>({
        id:crypto.randomUUID(),
        task: "",
        isCompleted: false,
        user:user

    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target; 
        setNewTask((prevData) => ({...prevData, [name] : type === 'checkbox' ? checked : value}))
    }

    const handleAddTask = () => {
        addTask(newtask)
        setNewTask(({
            id:crypto.randomUUID(),
            task: "",
            isCompleted: false,
            user:user
        }))

    }

    return (
        <div className="new-task-div mx-auto">
            <input type="checkbox" id="roundedCheckbox" className="rounded-checkbox" name="isCompleted" onChange={handleChange} checked={newtask.isCompleted}/>
            <input type="text" className="new-task" placeholder="Add Task" name="task" onChange={handleChange} value={newtask.task} required />
            { newtask.task.trim() ? <i className="fa-solid fa-plus fa-xl" onClick={handleAddTask}></i> : "" }
        </div>
    )
}