import React, {ChangeEvent} from 'react';
import {FilterValueType} from './App';
import s from './App.module.css'
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

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
    removeTask: (todoListId: string, taskId: string) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, title: string) => void
    changeFilter: (todoListId: string, filter: FilterValueType) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskID: string, isDone: boolean) => void
}

const TodoList: React.FC<TodoListProps> = ({
                                               todoListId,
                                               title,
                                               tasks,
                                               filter,
                                               removeTask,
                                               addTask,
                                               changeTaskTitle,
                                               changeFilter,
                                               removeTodoList,
                                               changeTodoListTitle,
                                               changeTaskStatus
                                           }) => {

    const addTaskHandler = (title: string) => {
        addTask(todoListId, title)
    }

    const removeTodoListHandler = () => {
        removeTodoList(todoListId)
    }

    const changeTodoListTitleHandler = (title: string) => {
        changeTodoListTitle(todoListId, title)
    }


    const onAllClickHandler = () => changeFilter(todoListId, 'all')
    const onActiveClickHandler = () => changeFilter(todoListId, 'active')
    const onCompletedClickHandler = () => changeFilter(todoListId, 'completed')


    return (
        <div>
            <h3><EditableSpan title={title} editItem={changeTodoListTitleHandler}/>
                <button onClick={removeTodoListHandler}>x</button>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {tasks.map(t => {

                    const onClickHandler = () => removeTask(todoListId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
                        changeTaskStatus(todoListId, t.id, e.currentTarget.checked)
                    const changeTaskTitleHandler = (title: string) => changeTaskTitle(todoListId, t.id, title)
                    return (
                        <li key={t.id} className={t.isDone ? s.isDone : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                            <EditableSpan title={t.title} editItem={changeTaskTitleHandler}/>
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