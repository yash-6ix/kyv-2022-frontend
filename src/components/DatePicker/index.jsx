import { ArrowSVG } from '../SVG';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { OutsideClick } from '../OutsideClick';

const chunkArray = (array, chunk_size) => {
    let index = 0;
    const arrayLength = array.length;
    const tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
        const myChunk = array.slice(index, index + chunk_size);
        tempArray.push(myChunk);
    }

    return tempArray;
};

const DatePicker = ({ onDateChange, label, id, selectedDate }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [calendarDate, setCalendarDate] = useState(
        new Date(new Date().setHours(0, 0, 0, 0))
    );

    //animating the label
    const controls = useAnimation();
    const variants = {
        focus: { y: 0, scale: 0.8 },
        blur: { y: 24, scale: 1 },
    };

    const onCloseDropdown = () => {
        setShowDropdown(false);
    };

    useEffect(() => {
        if (!showDropdown && !selectedDate) {
            controls.start('blur');
        } else {
            controls.start('focus');
        }
    }, [showDropdown, selectedDate, controls]);

    const onClickDate = useCallback(
        (e, day) => {
            e.preventDefault();
            const date = new Date(day);
            setShowDropdown(false);
            onDateChange(date);
        },
        [onDateChange]
    );
    const decreaseMonth = (e) => {
        e.preventDefault();
        setCalendarDate(
            new Date(calendarDate.setMonth(calendarDate.getMonth() - 1))
        );
    };
    const increaseMonth = (e) => {
        e.preventDefault();
        setCalendarDate(
            new Date(calendarDate.setMonth(calendarDate.getMonth() + 1))
        );
    };

    const dateElements = useMemo(() => {
        const month = calendarDate.getMonth(); //get the month of the calendar date

        const date = new Date(calendarDate.setDate(1)); //initialize to start date of month

        const startDay = date.getDay(); //get the month day

        //fill the array with dates
        let days = [];
        while (month === date.getMonth()) {
            days.push(new Date(date));
            date.setDate(new Date(date.getDate() + 1));
        }

        //populate the array with leading/trailing null days (if a month starts/ends in the middle of a week)
        days = [
            ...Array(startDay).fill(null),
            ...days,
            ...Array(date.getDay() !== 0 ? 7 - date.getDay() : 0).fill(null),
        ];

        //chunk the days into rows
        const chunkedDays = chunkArray(days, 7);

        //create week row elements for the calendar
        const dateElements = [];
        for (const week of chunkedDays) {
            dateElements.push(
                <div
                    className="flex flex-row justify-between w-full h-10 "
                    key={week}
                >
                    {week.map((day, index) => {
                        const date = new Date(day);

                        let isSelected = false;

                        if (!!selectedDate && selectedDate !== '')
                            isSelected =
                                date.getTime() ===
                                new Date(selectedDate).getTime();

                        const selectedClassName =
                            ' text-brand-white bg-brand-olive-900 cursor-default';
                        const unselectedClassName =
                            'hover:bg-brand-neutral-50 text-brand-neutral-600 active:bg-brand-neutral-100 ';

                        return (
                            <>
                                {!!day ? (
                                    <button
                                        key={day}
                                        onClick={(e) => onClickDate(e, day)}
                                        className={`flex flex-row items-center justify-center w-10 h-full font-body text-sm rounded-lg ${
                                            isSelected
                                                ? selectedClassName
                                                : unselectedClassName
                                        }  `}
                                    >
                                        {!!day &&
                                            day.toLocaleString('default', {
                                                day: 'numeric',
                                            })}
                                    </button>
                                ) : (
                                    <div key={index} className="w-10 h-full" />
                                )}
                            </>
                        );
                    })}
                </div>
            );
        }

        return dateElements;
    }, [calendarDate, selectedDate, onClickDate]);

    return (
        <OutsideClick
            key={id}
            onClickOutside={onCloseDropdown}
            show={showDropdown}
            className="relative max-w-sm"
        >
            <motion.h3
                initial="blur"
                animate={controls}
                variants={variants}
                transition={{ duration: 0.16 }}
                style={{ originX: 0 }}
                className="text-sm pointer-events-none text-brand-neutral-400 font-body"
            >
                {label}
            </motion.h3>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    setShowDropdown(true);
                }}
                className="flex flex-row items-center w-full h-8 border-b border-brand-neutral-100 hover:border-brand-neutral-200"
            >
                <h3 className="font-body text-brand-neutral-600">
                    {selectedDate && new Date(selectedDate).toDateString()}
                </h3>
            </button>
            {showDropdown && (
                <div className="absolute z-10 flex flex-col w-full p-1 mt-1 space-y-1 rounded-lg shadow-lg top-full bg-brand-white">
                    <div className="flex flex-row items-center">
                        <button
                            onClick={decreaseMonth}
                            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-brand-neutral-50 active:bg-brand-neutral-100"
                        >
                            <ArrowSVG className="w-3 h-3 transform rotate-90 fill-current text-brand-neutral-400" />
                        </button>
                        <div className="flex justify-center flex-1 font-body">
                            {calendarDate.toLocaleString('default', {
                                month: 'long',
                                year: 'numeric',
                            })}
                        </div>
                        <button
                            onClick={increaseMonth}
                            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-brand-neutral-50 active:bg-brand-neutral-100"
                        >
                            <ArrowSVG className="w-3 h-3 transform -rotate-90 fill-current text-brand-neutral-400" />
                        </button>
                    </div>
                    <div className="flex flex-col justify-center w-full space-y-1">
                        {dateElements}
                    </div>
                </div>
            )}
        </OutsideClick>
    );
};

export default DatePicker;
