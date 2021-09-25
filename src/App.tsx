import React from 'react';
import TodoList, {TaskType} from './TodoList';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC, changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from './redux/reducers/todolists-reducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,

} from './redux/reducers/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './redux/store';

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksType = {
    [key: string]: TaskType[]
}

function App() {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, TodoListsType[]>((state) => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksType>((state) => state.tasks)

    const removeTask = (todoListId: string, taskId: string) => {
        dispatch(removeTaskAC(todoListId, taskId))
    }

    const addTask = (todoListId: string, title: string) => {
        dispatch(addTaskAC(todoListId, title))
    }

    const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todoListId, taskId, title))
    }

    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoListId, taskId, isDone))
    }

    const addTodoList = (title: string) => {
        dispatch(addTodoListAC(title))

    }

    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }

    const changeTodoListTitle = (todoListId: string, title: string) => {
        dispatch(changeTodoListTitleAC(todoListId, title))
    }

    const changeFilter = (todoListId: string, filter: FilterValueType) => {
        dispatch(changeTodoListFilterAC(todoListId, filter))
    }


    return (
        <div>
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TODOLISTS
                    </Typography>
                    <Button
                        variant={'outlined'}
                        color="inherit"
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'xl'}>
                <Grid container spacing={3} style={{padding: '20px'}}>

                    {todoLists.map(tl => {

                        let tasksForTodoList = tasks[tl.id];

                        if (tl.filter === 'active') tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
                        if (tl.filter === 'completed') tasksForTodoList = tasks[tl.id].filter(t => t.isDone)

                        return (
                            <Grid item key={tl.id}>
                                <TodoList
                                    todoListId={tl.id}
                                    filter={tl.filter}
                                    title={tl.title}
                                    tasks={tasksForTodoList}
                                    removeTask={removeTask}
                                    addTask={addTask}
                                    changeTaskTitle={changeTaskTitle}
                                    removeTodoList={removeTodoList}
                                    changeTodoListTitle={changeTodoListTitle}
                                    changeFilter={changeFilter}
                                    changeTaskStatus={changeTaskStatus}
                                />
                            </  Grid>
                        )
                    })}
                    <Grid item>
                        <AddItemForm addItem={addTodoList}/>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
