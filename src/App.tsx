import React from 'react';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC, changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from './reducers/todolists-reducer';
import {useReducer} from 'react';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './reducers/tasks-reducer';

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

    let todolistID1 = v1();
    let todolistID2 = v1();

    const initialTodoListsState: TodoListsType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
    const initialTasksState: TasksType = {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Fish', isDone: true},
            {id: v1(), title: 'Meat', isDone: false},
        ]
    };

    const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, initialTodoListsState);
    const [tasks, dispatchTasks] = useReducer(tasksReducer, initialTasksState)


    const removeTask = (todoListId: string, taskId: string) => {
        dispatchTasks(removeTaskAC(todoListId, taskId))
    }

    const addTask = (todoListId: string, title: string) => {
        dispatchTasks(addTaskAC(todoListId, title))
    }

    const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
        dispatchTasks(changeTaskTitleAC(todoListId, taskId, title))
    }

    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(todoListId, taskId, isDone))
    }

    const addTodoList = (title: string) => {
        let newAction = addTodoListAC(title)
        dispatchTodoLists(newAction)
        dispatchTasks(newAction)
    }

    const removeTodoList = (todoListId: string) => {
        dispatchTodoLists(removeTodoListAC(todoListId))
        dispatchTasks(removeTodoListAC(todoListId))
    }

    const changeTodoListTitle = (todoListId: string, title: string) => {
        dispatchTodoLists(changeTodoListTitleAC(todoListId, title))
    }

    const changeFilter = (todoListId: string, filter: FilterValueType) => {
        dispatchTodoLists(changeTodoListFilterAC(todoListId, filter))
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
                            <Grid item>
                                <TodoList
                                    key={tl.id}
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
