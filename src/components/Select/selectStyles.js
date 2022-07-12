export const selectStyles = {
    menu: (provided, state) => ({
        ...provided,
        borderRadius: '8px',
        paddingRight: '4px',
        paddingLeft: '4px',
    }),
    menuPortal: (provided, state) => ({
        ...provided,
    }),
    menuList: (provided, state) => ({
        ...provided,
        paddingTop: '4px',
        paddingBottom: '0',
    }),
    container: (provided, state) => {
        return {
            ...provided,
            borderBottom: '1px solid #E5E5E5 ',
            fontFamily: 'Pragmatica',
            color: '#4D4D4D',
        };
    },
    control: (provided, state) => {
        return {
            ...provided,
            background: 'none',
            border: 'none',
            alignItems: 'flex-end',
            minHeight: '0',
            height: 'auto',
            boxShadow: 'none',
            cursor: 'pointer',
        };
    },
    indicatorSeparator: (provided, state) => ({
        display: 'hidden',
    }),
    valueContainer: (provided, state) => {
        return {
            ...provided,
            fontFamily: 'Pragmatica',
            padding: '0',
        };
    },
    placeholder: (provided, state) => ({
        ...provided,
        color: '#999999',
        fontSize: '14px',
    }),
    input: (provided, state) => ({
        ...provided,
        padding: '0',
        margin: '0',
    }),
    singleValue: (provided, state) => ({
        ...provided,
        padding: '0',
        margin: '0',
        color: '#4D4D4D',
    }),
    dropdownIndicator: (provided, state) => {
        return {
            ...provided,
            padding: '0',
            paddingLeft: '3px',
            paddingRight: '3px',
            margin: '0',
        };
    },
    clearIndicator: (provided, state) => {
        return {
            ...provided,
            padding: '0',
            paddingLeft: '3px',
            paddingRight: '3px',
            margin: '0',
        };
    },
    option: (provided, state) => {
        return {
            ...provided,
            marginBottom: '4px',
            cursor: 'pointer',
            ':active': {
                backgroundColor: state.isSelected ? '#195A02' : '#F2F2F2',
            },
            backgroundColor: state.isSelected ? '#0B2801' : '#fff',
            color: state.isSelected ? '#fff' : '#1A1A1A',
            borderRadius: '8px',
        };
    },
    multiValue: (provided, state) => {
        return {
            ...provided,
            margin: '0',
            backgroundColor: '#0B2801',
            borderRadius: '8px',
            marginRight: '2px',
            marginBottom: '2px',
            paddingLeft: '4px',
            paddingRight: '4px',
        };
    },
    multiValueLabel: (provided, state) => {
        return {
            ...provided,
            margin: '0',
            color: '#fff',
            padding: '0',
            paddingRight: '4px',
            paddingBottom: '0px',
            paddingTop: '0px',
            fontSize: '14px',
        };
    },
    multiValueRemove: (provided, state) => {
        return {
            ...provided,
            margin: '0',
            ':hover': {
                color: '#fff',
                cursor: 'pointer',
            },
            color: '#fff',
            fontSize: '14px',
        };
    },
};
