
let nowDateZip = Date.now();
let nowDateUnzip = new Date(nowDateZip);
let currentYear = nowDateUnzip.getFullYear(); //2025
let CurrentMonth = nowDateUnzip.getMonth();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////// DONE!
const _1_2025 = new Date(currentYear, 0, 1); //Начало отчета от года 2025 1 января 
const lastNumberOfMonth = new Date(currentYear, 0 + 1, 0); // ВЫВОДИТ ПОСЛЕДНЕЕ ЧИСЛО МЕСЯЦА (тут 31)
console.log(lastNumberOfMonth);
console.log(lastNumberOfMonth.getDate());

let amountOfDays = [];    //[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
for (let numberOfMonth = 0; numberOfMonth < 12; numberOfMonth++) {
    let lastDayInMonth = new Date(currentYear, numberOfMonth + 1, 0);
        amountOfDays.push(lastDayInMonth.getDate());
};
console.log(amountOfDays);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////// DONE!
let Month = []; ///['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
for (let amountMonth = 0; amountMonth < 12; amountMonth++) {
    let monthName = new Date(currentYear, amountMonth + 1, 0).toLocaleString('en-GB', { month: 'short' });
    Month.push(monthName);
}
console.log(Month);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'San'];
let statistics_body = document.getElementById('statistics_tbody');

function addHeatAndBody() {
    ////////////////thead
    let thead = document.getElementById('statistics_thead');
    let tr = document.createElement('tr');
    tr.classList.add('FullYear');
    tr.appendChild(document.createElement('th'));
    for (let amountOfMonth = 0; amountOfMonth < 12; amountOfMonth++) {
        let th = document.createElement('th');
        th.classList.add(`th_${Month[amountOfMonth]}`);
        th.innerHTML = Month[amountOfMonth];
        tr.appendChild(th);
    }
    thead.appendChild(tr);

    //////////////////tbody
    for (let week = 0; week < 7; week++) {
        let tr = document.createElement('tr');
        tr.classList.add(`${daysOfWeek[week]}`);
        let td = document.createElement('td');
        td.classList.add(`td_${daysOfWeek[week]}`);
        td.innerHTML = daysOfWeek[week];
        tr.appendChild(td);
        statistics_body.appendChild(tr);
    };

};
addHeatAndBody();


// Генерация пустой сетки по дням недели
/*let statistics_body = document.getElementById('statistics_tbody');
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

            let label = document.createElement('label');
            label.innerHTML = `${nowDateUnzip.getDate().toLocaleString("ua-UA")}`;
            cell.appendChild(label);
        }

        // Вставка в соответствующую ячейку таблицы
        const targetRow = dayMap[weekday];
        const targetCell = targetRow.querySelector(`.month-${monthShort}`);
        targetCell.appendChild(cell);

        // Переход к следующему дню
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    }
};

addDaysToTable(currentYear);*/