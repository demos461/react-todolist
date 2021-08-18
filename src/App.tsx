import React, {useState} from 'react';
import s from './App.module.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';

export type FilterValueType = 'all' | 'active' | 'completed'

type TodoListsType = {
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

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

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

    const changeTaskStatus = (todoListId: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskID ? {...t, isDone} : t)})
    }

    const removeTodolist = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    const changeFilter = (todoListId: string, filter: FilterValueType) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter} : tl))
    }


    return (
        <div className={s.App}>

            {todoLists.map(tl => {

                let tasksForTodoList = tasks[tl.id];

                if (tl.filter === 'active') tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
                if (tl.filter === 'completed') tasksForTodoList = tasks[tl.id].filter(t => t.isDone)

                return (
                    <TodoList
                        key={tl.id}
                        todoListId={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        addTask={addTask}
                        removeTodolist={removeTodolist}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                    />
                )
            })}


        </div>
    );
}

export default App;
