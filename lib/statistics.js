import { useEffect, useRef, useState } from "react";
export default function Table() {
    const tableRef = useRef(null);
    const tbodyRef = useRef(null);
    const [dateCellMap, setDateCellMap] = useState(new Map());

    useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();

        const daysInMonth = Array.from({ length: 12 }, (_, month) => new Date(year, month + 1, 0).getDate());
        const totalDays = daysInMonth.reduce((a, b) => a + b, 0);

        const months = Array.from({ length: 12 }, (_, month) =>
            new Date(year, month + 1, 0).toLocaleString('en-GB', { month: 'short' })
        );

        const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'San'];

        const map = new Map();

        // Render thead
        const thead = tableRef.current.querySelector("thead");
        const tr = document.createElement("tr");
        tr.className = "FullYear";

        const colSpans = [4, 4, 5, 4, 4, 4, 4, 4, 5, 5, 4, 5];

        months.forEach((month, index) => {
            const th = document.createElement("th");
            th.className = `th_${month}`;
            th.colSpan = colSpans[index];
            th.innerHTML = month;
            tr.appendChild(th);
        });
        thead.appendChild(tr);

        // Render tbody
        const startDate = new Date(year, 0, 0);
        daysOfWeek.forEach((dayName, dayIndex) => {
            let day = 0;
            const tr = document.createElement("tr");
            tr.className = dayName;
            for (let i = 0; i < 52; i++) {
                if (day < totalDays) {
                    const td = document.createElement("td");
                    const currentDate = new Date(
                        startDate.getFullYear(),
                        startDate.getMonth(),
                        startDate.getDate() + (i + 1) * 7 + dayIndex
                    );
                    const dateStr = currentDate.toISOString().split("T")[0];
                    td.setAttribute("data-date", dateStr);
                    td.className = `day-cell:${day}`;
                    map.set(dateStr, td);
                    tr.appendChild(td);
                    day++;
                }
            }
            tbodyRef.current.appendChild(tr);
        });

        setDateCellMap(map);
    }, []);

    return (
        <table className="table_statictics" id="statistics_table" ref={tableRef}>
            <thead id="statistics_thead"></thead>
            <tbody id="statistics_tbody" ref={tbodyRef}></tbody>
        </table>
    );
}
