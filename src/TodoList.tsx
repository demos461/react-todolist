import React, {ChangeEvent} from 'react';
import {FilterValueType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Card, Checkbox, IconButton} from '@material-ui/core';
import {Clear} from '@material-ui/icons';

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
        <Card style={{padding: '20px 20px'}}>
            <h3><EditableSpan title={title} editItem={changeTodoListTitleHandler}/>
                <IconButton onClick={removeTodoListHandler} size={'small'}>
                    <Clear/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            {tasks.map(t => {

                const onClickHandler = () => removeTask(todoListId, t.id)
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
                    changeTaskStatus(todoListId, t.id, e.currentTarget.checked)
                const changeTaskTitleHandler = (title: string) => changeTaskTitle(todoListId, t.id, title)

                return (
                    <div key={t.id}>
                        <Checkbox color={'primary'} checked={t.isDone} onChange={onChangeHandler}/>
                        <EditableSpan title={t.title} editItem={changeTaskTitleHandler}/>
                        <IconButton onClick={onClickHandler} size={'small'}>
                            <Clear/>
                        </IconButton>
                    </div>
                )
            })}
            <div>
                <Button
                    color={filter === 'all' ? 'secondary' : 'primary'}
                    onClick={onAllClickHandler}
                    variant={'contained'}
                    size={'small'}
                    style={{margin: '0 2px'}}
                >
                    All
                </Button>
                <Button
                    color={filter === 'active' ? 'secondary' : 'primary'}
                    onClick={onActiveClickHandler}
                    variant={'contained'}
                    size={'small'}
                    style={{margin: '0 2px'}}
                >
                    Active
                </Button>
                <Button
                    color={filter === 'completed' ? 'secondary' : 'primary'}
                    onClick={onCompletedClickHandler}
                    variant={'contained'}
                    size={'small'}
                    style={{margin: '0 2px'}}
                >
                    Completed
                </Button>
            </div>
        </Card>
    );
};

export default TodoList;