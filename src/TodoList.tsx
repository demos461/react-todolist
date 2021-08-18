import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from './App';
import s from './App.module.css'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListProps = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (todoListId: string, taskID: string) => void
    addTask: (todoListId: string, title: string) => void
    changeFilter: (todoListId: string, filter: FilterValueType) => void
    removeTodolist: (todoListId: string) => void
    changeTaskStatus: (todoListId: string, taskID: string, isDone: boolean) => void
}

const TodoList: React.FC<TodoListProps> = ({
                                               todoListId,
                                               title,
                                               tasks,
                                               filter,
                                               removeTask,
                                               addTask,
                                               changeFilter,
                                               removeTodolist,
                                               changeTaskStatus
                                           }) => {

    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState(false)

    const addTaskHandler = () => {
        if (inputValue.trim()) {
            addTask(todoListId,inputValue.trim())
            setInputValue('')
        } else {
            setError(true)
        }

    }

    const removeTodolistHandler = () => {
        removeTodolist(todoListId)
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === 'Enter') addTaskHandler()
    }

    const onAllClickHandler = () => changeFilter(todoListId,'all')
    const onActiveClickHandler = () => changeFilter(todoListId,'active')
    const onCompletedClickHandler = () => changeFilter(todoListId,'completed')


    return (
        <div>
            <h3>{title} <button onClick={removeTodolistHandler}>x</button></h3>
            <div>
                <input
                    className={error ? s.error : ''}
                    value={inputValue}
                    onChange={onChangeInputHandler}
                    onKeyPress={onKeyPressInputHandler}
                />
                <button onClick={addTaskHandler}>+</button>

                {error && <div className={s.errorMessage}>Title is required</div>}
            </div>
            <ul>
                {tasks.map(t => {

                    const onClickHandler = () => removeTask(todoListId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
                        changeTaskStatus(todoListId, t.id, e.currentTarget.checked)
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                            <span className={t.isDone ? s.isDone : ''}>{t.title}</span>
                            <button onClick={onClickHandler}>X</button>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button className={filter === 'all' ? s.activeFilter : ''} onClick={onAllClickHandler}>All</button>
                <button className={filter === 'active' ? s.activeFilter : ''} onClick={onActiveClickHandler}>Active
                </button>
                <button className={filter === 'completed' ? s.activeFilter : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;