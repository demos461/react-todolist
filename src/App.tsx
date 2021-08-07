import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JavaScript', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'REST API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValueType>('all')

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const addTask = (title: string) => {
        setTasks([...tasks, {id: v1(), title, isDone: false}])
    }

    let tasksForTodoList = tasks;

    if (filter === 'active') tasksForTodoList = tasks.filter(t => !t.isDone)
    if (filter === 'completed') tasksForTodoList = tasks.filter(t => t.isDone)

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <TodoList
                title={'Technology'}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
