import './tasks.css'
import { BsFillTrash3Fill} from "react-icons/bs";

type taskProps = {
    id:string
    task: string,
    isCompleted: boolean
}

type taskItems ={
    tasks :taskProps[],
    onDelete: (taskId: string) => void;
    onComplete :(taskId: string,completed:boolean) => void;
    // activeTasks:() => void;
    // completedTasks:() => void;
    clearCompleted:() => void;
    filterTasks:(filName:string) => void;
    filteredTasks:taskProps[]

}


export function TasksList ({tasks, onDelete, onComplete, filterTasks, filteredTasks, clearCompleted}: taskItems) {

    let pendind_tasks = tasks.filter(task => task.isCompleted === false)
    const displayTasks = filteredTasks.length > 0 ? filteredTasks : tasks;

    return (
        <div className="task-list mx-auto">
            <ul className='w-100'>
                <div>
                    {displayTasks.map(todo => {
                        return(
                        <li key={todo.id}>
                            <input type="checkbox" className="rounded-checkbox" name="completed" checked={todo.isCompleted} onChange={(e) => onComplete(todo.id,e.target.checked) }/>
                            <h6 className={todo.isCompleted ? 'task-striked my-auto':'my-auto'}>{todo.task}</h6>
                            <BsFillTrash3Fill className="trash-icon" size={20} onClick={() => onDelete(todo.id)} />
                        </li>
                        )
                    })}
                </div>
                <li className='task-filter-menu'>
                    <a>{pendind_tasks.length} items left</a>
                    <a onClick={() => filterTasks('all')}>All</a>
                    <a onClick={() => filterTasks('active')}>Active</a>
                    <a onClick={() => filterTasks('completed')}>Completed</a>
                    <a onClick={clearCompleted}>Clear Completed</a>
                </li>
            </ul>
        </div>
    )
}

