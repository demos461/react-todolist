import React from 'react';
import {FilterValueType} from './App';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListProps = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValueType) => void
}

const TodoList: React.FC<TodoListProps> = ({title, tasks, removeTask, changeFilter}) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(t =>
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                        <button onClick={() => removeTask(t.id)}>X</button>
                    </li>)}
            </ul>
            <div>
                <button onClick={() => changeFilter('all')}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;