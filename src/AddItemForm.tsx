import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './App.module.css';

type AddItemFormProps = {
    addItem: (title: string) => void
}

const AddItemForm: React.FC<AddItemFormProps> = ({addItem}) => {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState(false)

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
        setError(false)
        if (e.key === 'Enter') addItemHandler()
    }
    return (
        <div>
            <input
                className={error ? s.error : ''}
                value={inputValue}
                onChange={onChangeInputHandler}
                onKeyPress={onKeyPressInputHandler}
            />
            <button onClick={addItemHandler}>+</button>

            {error && <div className={s.errorMessage}>Title is required</div>}
        </div>
    );
};

export default AddItemForm;