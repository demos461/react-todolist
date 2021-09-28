import React, {useCallback} from 'react';
import {FilterValueType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Card, IconButton} from '@material-ui/core';
import {Clear} from '@material-ui/icons';
import Task from './Task';

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

const TodoList: React.FC<TodoListProps> = React.memo((props) => {
    console.log('Todolist render')

    const {
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
    } = props

    const addTaskHandler = useCallback((title: string) => {
        addTask(todoListId, title)
    }, [addTask, todoListId])

    const removeTodoListHandler = () => {
        removeTodoList(todoListId)
    }

    const changeTodoListTitleHandler = useCallback((title: string) => {
        changeTodoListTitle(todoListId, title)
    }, [changeTodoListTitle, todoListId])

    let tasksForTodoList = tasks;
    if (filter === 'active') tasksForTodoList = tasks.filter(t => !t.isDone)
    if (filter === 'completed') tasksForTodoList = tasks.filter(t => t.isDone)


    const onAllClickHandler = useCallback(() => changeFilter(todoListId, 'all'), [changeFilter, todoListId])
    const onActiveClickHandler = useCallback(() => changeFilter(todoListId, 'active'), [changeFilter, todoListId])
    const onCompletedClickHandler = useCallback(() => changeFilter(todoListId, 'completed'), [changeFilter, todoListId])


    return (
        <Card style={{padding: '20px 20px'}}>
            <h3><EditableSpan title={title} editItem={changeTodoListTitleHandler}/>
                <IconButton onClick={removeTodoListHandler} size={'small'}>
                    <Clear/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            {tasksForTodoList &&
            tasksForTodoList.map(t =>
                <Task
                    key={t.id}
                    todoListId={todoListId}
                    taskId={t.id}
                    taskTitle={t.title}
                    taskIsDone={t.isDone}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                />
            )}
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
});


export default TodoList;