import {useState} from 'react';

export const InlineEdit = ({value, setValue}) => {
    const [editingValue, setEditingValue] = useState(value);

    const onChange = (event) => setEditingValue(event.target.value);


    const onKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
            event.target.blur();
        }
    }

    const onBlur = (event) => {
        if (event.target.value.trim() === "") {
            setValue(value);
        } else {
            setValue(event.target.value);
        }
    }

    return (
        <input
            type="text"
            value={editingValue}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            placeholder={`Enter ${value}`}
        />
    )
}