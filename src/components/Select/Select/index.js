import { useState } from 'react';
import Select from 'react-select';
import { selectStyles } from '../selectStyles';

const CustomSelect = ({
    label,
    options,
    onInputChange = () => {},
    ...selectProps
}) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (string, { action }) => {
        if (action === 'input-change' || action === 'set-value') {
            setInputValue(string);
            onInputChange(string);
        }

        // else if (action === 'input-blur' || 'menu-close') newInputValue = '';
    };

    return (
        <div className="relative flex flex-col ">
            <h3
                className="text-sm transform pointer-events-none text-brand-neutral-400 font-body "
                style={{ transform: 'scale(0.8)', transformOrigin: '0' }}
            >
                {label}
            </h3>
            <Select
                inputValue={inputValue}
                onMenuOpen={() => setMenuIsOpen(true)}
                onMenuClose={() => setMenuIsOpen(false)}
                onInputChange={handleInputChange}
                menuIsOpen={menuIsOpen}
                styles={selectStyles}
                options={options}
                {...selectProps}
            ></Select>
        </div>
    );
};

export default CustomSelect;
