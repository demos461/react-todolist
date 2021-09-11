import React, {useState} from 'react';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC, changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListReducer
} from './reducers/todolists-reducer';
import {useReducer} from 'react';

export type FilterValueType = 'all' | 'active' | 'completed'


export type TodoListsType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    const initialState: TodoListsType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const [todoLists, dispatch] = useReducer(todoListReducer, initialState);

    let [tasks, setTasks] = useState<TasksType>({
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
    });


    const removeTask = (todoListId: string, taskID: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskID)})
    }

    const addTask = (todoListId: string, title: string) => {
        setTasks({...tasks, [todoListId]: [...tasks[todoListId], {id: v1(), title, isDone: false}]})
    }

    const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title} : t)})
    }

    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    const addTodoList = (title: string) => {
        const todoListId = v1()
        dispatch(addTodoListAC(title))
        setTasks({...tasks, [todoListId]: []})
    }

    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
        delete tasks[todoListId]
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
