
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

let amountOfDaysInCurrentYear = 0;
amountOfDays.map((item) => amountOfDaysInCurrentYear += item);
console.log(amountOfDaysInCurrentYear);
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
    for (let amountOfMonth = 0; amountOfMonth < 12; amountOfMonth++) {
        let th = document.createElement('th');
        th.classList.add(`th_${Month[amountOfMonth]}`);
        switch (amountOfMonth) {
            case 0: th.colSpan = 4; break;
            case 1: th.colSpan = 4; break;
            case 2: th.colSpan = 5; break;
            case 3: th.colSpan = 4; break;
            case 4: th.colSpan = 4; break;
            case 5: th.colSpan = 4; break;
            case 6: th.colSpan = 4; break;
            case 7: th.colSpan = 4; break;
            case 8: th.colSpan = 5; break;
            case 9: th.colSpan = 5; break;
            case 10: th.colSpan = 4; break;
            case 11: th.colSpan = 5; break;
        }
        th.innerHTML = Month[amountOfMonth];
        tr.appendChild(th);
    }
    thead.appendChild(tr);

    //////////////////tbody
    /*for (let week = 0; week < 7; week++) {
        let tr = document.createElement('tr');
        tr.classList.add(`${daysOfWeek[week]}`);
        let td = document.createElement('td');
        td.classList.add(`td_${daysOfWeek[week]}`);
        td.innerHTML = daysOfWeek[week];
        tr.appendChild(td);
        statistics_body.appendChild(tr);
    };*/
}; 

let bd;
function markCompletedDays(dateCellMap) {
    let openRequest = indexedDB.open('Tasks');

    openRequest.onsuccess = function () {
        let db = openRequest.result;
        let store = db.transaction('TaskDB', 'readonly').objectStore('TaskDB');
        let request = store.getAll();

        request.onsuccess = function () {
            let tasks = request.result;

            tasks.forEach(task => {
                if (task.doneAt) {
                    const td = dateCellMap.get(task.doneAt);
                    if (td) {
                        td.style.background = 'green';
                        td.classList.remove(...td.classList);
                        td.classList.add('td_checked');
                    }
                }
            });
        };
    };
}


function fillHeatmap() {
    let openRequest = indexedDB.open('Tasks');

    let startDate = new Date(currentYear, 0, 0);
    let dateCellMap = new Map();
    daysOfWeek.forEach((dayName, dayIndex) => {
        let day = 0;
        let tr = document.createElement('tr');
        tr.classList.add(dayName);
        for (let i = 0; i < 52; i++) {
            if (day < amountOfDaysInCurrentYear) {
                let td = document.createElement('td');
                let currentDate = new Date(
                    startDate.getFullYear(),
                    startDate.getMonth(),
                    startDate.getDate() + (i + 1) * 7 + dayIndex);
                td.setAttribute('data-date', currentDate.toISOString().split("T")[0]);
                td.classList.add(`day-cell:${day}`);
                dateCellMap.set(currentDate.toISOString().split("T")[0], td);
                // можно добавить атрибут или класс, если нужно
                tr.appendChild(td);
                day++;
            }
        }
        statistics_body.appendChild(tr);
        markCompletedDays(dateCellMap);
    });
    openRequest.onsuccess = function () {

            let db = openRequest.result;
            let Store = db.transaction('TaskDB', 'readwrite').objectStore('TaskDB');
            let request = Store.getAll();
            request.onsuccess = function () {
                let tasks = request.result;
                tasks.forEach(task => {
                    if (task.checked > 1) {

                        //  alert(`Task checked ${task.id}`);
                        //let parts = task.id.split(",");
                        let parts = nowDateUnzip.toLocaleString("ua-UA").split(",");
                        let t = parts[0];
                        let p = t.split(".");
                        let isoDate = `${p[2]}-${p[1]}-${p[0]}`;
                        let td = dateCellMap.get(`${isoDate}`);
                        if (td) {
                            td.style.background = task.checked ? 'green' : '';
                            td.className = '';
                            td.classList.add('td_checked');
                        } 
                        console.log(t);
                        console.log(p);
                        console.log(isoDate);
                        console.log(`${nowDateUnzip.toLocaleString("ua-UA")}`);
                    }
                });
            }
        console.log(request);
    }
    console.log(startDate);
    console.log(dateCellMap);
}

addHeatAndBody();
fillHeatmap();

