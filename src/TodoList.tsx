import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListProps = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterValueType) => void
}

const TodoList: React.FC<TodoListProps> = ({title, tasks, removeTask, addTask, changeFilter}) => {

    const [inputValue, setInputValue] = useState('')

    const addTaskHandler = () => {
        if (inputValue.trim()) {
            addTask(inputValue)
            setInputValue('')
        }

    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTaskHandler()
    }

    const onAllClickHandler = () => changeFilter('all')
    const onActiveClickHandler = () => changeFilter('active')
    const onCompletedClickHandler = () => changeFilter('completed')


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={inputValue}
                    onChange={onChangeInputHandler}
                    onKeyPress={onKeyPressInputHandler}
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {tasks.map(t => {
                    const onClickHandler = () => removeTask(t.id)
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                            <button onClick={onClickHandler}>X</button>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;