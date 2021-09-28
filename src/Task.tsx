import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import EditableSpan from './EditableSpan';
import {Clear} from '@material-ui/icons';

type TaskProps = {
    todoListId: string
    taskId: string
    taskTitle: string,
    taskIsDone: boolean
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

const Task: React.FC<TaskProps> = React.memo((props) => {
    const {
        todoListId,
        taskId,
        taskTitle,
        taskIsDone,
        removeTask,
        changeTaskStatus,
        changeTaskTitle
    } = props

    const onClickHandler = () => removeTask(todoListId, taskId)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
        changeTaskStatus(todoListId, taskId, e.currentTarget.checked)

    const changeTaskTitleHandler = useCallback((title: string) =>
        changeTaskTitle(todoListId, taskId, title), [todoListId, taskId, changeTaskTitle])

    return (
        <div key={taskId}>
            <Checkbox color={'primary'} checked={taskIsDone} onChange={onChangeHandler}/>

            <EditableSpan title={taskTitle} editItem={changeTaskTitleHandler}/>

            <IconButton onClick={onClickHandler} size={'small'}>
                <Clear/>
            </IconButton>
        </div>
    )
});

export default Task;