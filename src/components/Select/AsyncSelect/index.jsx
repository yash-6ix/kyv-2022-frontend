import Select from 'react-select';
import { selectStyles } from '../selectStyles';
import AsyncSelect from 'react-select/async';

const CustomAsyncSelect = ({ label, ...selectProps }) => {
    return (
        <div className="flex flex-col">
            <h3
                className="text-sm transform pointer-events-none text-brand-neutral-400 font-body "
                style={{ transform: 'scale(0.8)', transformOrigin: '0' }}
            >
                {label}
            </h3>
            <AsyncSelect styles={selectStyles} {...selectProps}></AsyncSelect>
        </div>
    );
};

export default CustomAsyncSelect;
