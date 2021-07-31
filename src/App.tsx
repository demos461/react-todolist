import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JavaScript', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'REST API', isDone: false},
        {id: 5, title: 'GraphQL', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValueType>('all')

    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    let tasksForTodoList = tasks;

    if (filter === 'active') tasksForTodoList = tasks.filter(t => !t.isDone)
    if (filter === 'completed') tasksForTodoList = tasks.filter(t => t.isDone)
    // if (filter==='all') tasksForTodoList = tasks.filter(t => t)

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <TodoList
                title={'Technology'}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
