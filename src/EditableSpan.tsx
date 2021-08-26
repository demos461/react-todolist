import React, {ChangeEvent, useState} from 'react';

type EditableSpanProps = {
    title: string
    editItem: (title: string) => void
}

const EditableSpan: React.FC<EditableSpanProps> = ({title, editItem}) => {
    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const onBlurHandler = () => {
        offEditMode()
    }

    const onEditMode = () => {
        setInputValue(title)
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        if (inputValue.trim()) {
            editItem(inputValue.trim())
        }
    }

    return (
        editMode ?
            <div style={{display: 'inline-block'}}>
                <input
                    value={inputValue}
                    onChange={onChangeInputHandler}
                    onBlur={onBlurHandler}
                    autoFocus
                />
            </div>
            :
            <span onDoubleClick={onEditMode}>{title}</span>
    );
};

export default EditableSpan;