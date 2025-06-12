import React, { useEffect, useState } from 'react';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const nameOfMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function Calendar({ currentDate = new Date() }) {
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [calendarMatrix, setCalendarMatrix] = useState([]);

    useEffect(() => {
        generateCalendar(currentMonth, currentYear);
    }, [currentMonth, currentYear]);

    function generateCalendar(month, year) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

        const matrix = [];
        let row = new Array(adjustedFirstDay).fill(null);

        for (let day = 1; day <= daysInMonth; day++) {
            row.push(day);
            if (row.length === 7) {
                matrix.push(row);
                row = [];
            }
        }

        if (row.length > 0) {
            while (row.length < 7) row.push(null);
            matrix.push(row);
        }

        setCalendarMatrix(matrix);
    }

    function handlePrevMonth() {
        setCurrentMonth((prev) => {
            if (prev === 0) {
                setCurrentYear((y) => y - 1);
                return 11;
            }
            return prev - 1;
        });
    }

    function handleNextMonth() {
        setCurrentMonth((prev) => {
            if (prev === 11) {
                setCurrentYear((y) => y + 1);
                return 0;
            }
            return prev + 1;
        });
    }

    const today = new Date();
    const isToday = (day) => {
        return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
    };

    return (
        <table className="table" id="calendar_table">
            <thead>
                <tr>
                    <th><button id="button_back_calendar" onClick={handlePrevMonth}>&lt;</button></th>
                    <th colSpan="5">{`${nameOfMonth[currentMonth]} ${currentYear}`}</th>
                    <th><button id="button_forward_calendar" onClick={handleNextMonth}>&gt;</button></th>
                </tr>
                <tr>
                    {weekDays.map((day) => (
                        <th key={day}>{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {calendarMatrix.map((week, rowIndex) => (
                    <tr key={rowIndex}>
                        {week.map((day, colIndex) => (
                            <td key={colIndex} className={day && isToday(day) ? 'today' : ''}>{day || ''}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Calendar;