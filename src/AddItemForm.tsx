import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {Add} from '@material-ui/icons';

type AddItemFormProps = {
    addItem: (title: string) => void
}

const AddItemForm: React.FC<AddItemFormProps> = React.memo(({addItem}) => {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState(false)

    console.log('Additemform render')
    const addItemHandler = () => {
        if (inputValue.trim()) {
            addItem(inputValue.trim())
            setInputValue('')
        } else {
            setError(true)
        }

    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(false)
        if (e.key === 'Enter') addItemHandler()
    }
    return (
        <div>
            <TextField
                size={'small'}
                variant={'outlined'}
                error={error}
                value={inputValue}
                onChange={onChangeInputHandler}
                onKeyPress={onKeyPressInputHandler}
                helperText={error && 'Title is required'}
            />
            <IconButton color={'primary'} size={'small'} onClick={addItemHandler}>
                <Add fontSize={'large'}/>
            </IconButton>
        </div>
    );
});

export default AddItemForm;