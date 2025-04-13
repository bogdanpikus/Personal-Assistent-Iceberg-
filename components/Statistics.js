
let nowDateZip = Date.now();
let nowDateUnzip = new Date(nowDateZip);
const currentYear = nowDateUnzip.getFullYear();

let Month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let amountOfDays = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];
let daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'San'];


////////////////thead
let thead = document.getElementById('statistics_thead');
let monthNumbers = nowDateUnzip.getMonth(); // 3
let tr = document.createElement('tr');
tr.appendChild(document.createElement('th'));
for (let amountOfMonth = 0; amountOfMonth < 12; amountOfMonth++) {
    let th = document.createElement('th');
    th.innerHTML = Month[amountOfMonth];
    tr.appendChild(th);
}
thead.appendChild(tr);

//////////////////tbody
/*let statistics_body = document.getElementById('statistics_tbody');
for (let week = 0; week < 7; week++) {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.innerHTML = daysOfWeek[week];
    tr.appendChild(td);
    statistics_body.appendChild(tr);
};*/
// Генерация пустой сетки по дням недели
let statistics_body = document.getElementById('statistics_tbody');
const dayMap = {};
daysOfWeek.forEach(weekday => {
    const row = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = weekday;
    row.appendChild(th);

    Month.forEach(MonthIndex => {
        const td = document.createElement('td');
        td.classList.add(`month-${MonthIndex}`);
        row.appendChild(td);
    });

    statistics_body.appendChild(row);
    dayMap[weekday] = row;
});

const addDaysToTable = (year) => {
    let d = new Date(year, 0, 1);

    while (d.getFullYear() === year) {
        const dayOfWeekIndex = (d.getDay() + 6) % 7; // Приведение к Mon–Sun (0–6)
        const weekday = daysOfWeek[dayOfWeekIndex]; // Например 'Mon'
        const monthShort = Month[d.getMonth()]; // Например 'Jan'

        const cell = document.createElement('div');
        cell.className = 'day-cell';

        // Подсветка текущего дня
        if (
            d.getFullYear() === nowDateUnzip.getFullYear() &&
            d.getMonth() === nowDateUnzip.getMonth() &&
            d.getDate() === nowDateUnzip.getDate()
        ) {
            cell.classList.add('today');

            //let label = document.createElement('label');
            //label.innerHTML = `${nowDateUnzip.getDate().toLocaleString("ua-UA")}`;
            //cell.appendChild(label);

        }

        // Вставка в соответствующую ячейку таблицы
        const targetRow = dayMap[weekday];
        const targetCell = targetRow.querySelector(`.month-${monthShort}`);
        targetCell.appendChild(cell);

        // Переход к следующему дню
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    }
};

addDaysToTable(currentYear);