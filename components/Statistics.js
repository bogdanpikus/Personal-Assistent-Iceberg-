const progress_submit_button = document.getElementById('progress_done_button');
const input_progress_storage = document.getElementById('input_progress_storage');

let nowDateZip = Date.now();
let nowDateUnzip = new Date(nowDateZip);
let currentYear = nowDateUnzip.getFullYear(); //2025
let CurrentMonth = nowDateUnzip.getMonth();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////// DONE!
const _1_2025 = new Date(currentYear, 0, 1); //Ќачало отчета от года 2025 1 €нвар€ 
const lastNumberOfMonth = new Date(currentYear, 0 + 1, 0); // ¬џ¬ќƒ»“ ѕќ—Ћ≈ƒЌ≈≈ „»—Ћќ ћ≈—я÷ј (тут 31)
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
let bd;
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
}; 
let dateCellMap = new Map();
function fillHeatmap() {
    let startDate = new Date(currentYear, 0, 0);
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
    });
}
function addTasksInStorageDB() {
    let openRequest = indexedDB.open('Tasks');
    openRequest.onsuccess = function () {
        let db = openRequest.result;
        let transaction = db.transaction(['TaskDB', 'StoreTD'], 'readwrite');
        let StoreProgress = transaction.objectStore('TaskDB');
        let StoreTasks = transaction.objectStore('StoreTD');
        let request = StoreProgress.getAll();
        request.onsuccess = function () {
            let tasks = request.result;
            tasks.forEach(task => {
                if (task.checked) {
                    let parts = nowDateUnzip.toLocaleString("ua-UA").split(",");
                    let p = `${parts[0].trim()}-${task.id}`;
                    let tdInfo = {
                        id: p
                    };
                    let request3 = StoreTasks.getAll();
                    request3.onsuccess = function () {
                            StoreTasks.add(tdInfo).onsuccess = function () {
                                console.log(" Add:", tdInfo);
                                console.log(StoreTasks);
                            }
                    }
                }

            });
        }
    }
}
function fillStatistics() {
    let openRequest = indexedDB.open('Tasks');
    openRequest.onsuccess = function () {
        let result = openRequest.result;
        let transaction = result.transaction('StoreTD', 'readwrite');
        let StoreTD = transaction.objectStore('StoreTD').getAll();

        StoreTD.onsuccess = function () {
            let result = StoreTD.result;
            result.forEach(task => {
                let date = task.id.split('-')[0].split('.').join("-");
                let splitdate = `${date.split("-")[2]}-${date.split("-")[1]}-${date.split("-")[0]}`;
                ////тут надо находит td таблицы и красить его в зеленый
                const cell = dateCellMap.get(splitdate);
                if (cell) {
                    cell.style.backgroundColor = '#28C76F';
                }
            });
        }
    }
};
function CanvasAnimaion() {
    let canvas = document.createElement('canvas');
    const rec = input_progress_storage.getBoundingClientRect();
    canvas.width = rec.width;
    canvas.height = rec.height;
    canvas.id = 'ProgressCanvas';
    canvas.style.margin = 'auto';
    canvas.style.justifyContent = 'center';
    //canvas.style.background = 'white';
    canvas.style.zIndex = '100';
    canvas.style.top = '0px';
    canvas.style.position = 'absolute';
    canvas.style.width = rec.width + 'px';
    canvas.style.height = rec.height + 'px';
    input_progress_storage.appendChild(canvas);

    let c = document.getElementById("ProgressCanvas");
    let ctx = c.getContext("2d");
    let bubbles = [];
    for (let i = 0; i < 30; i++) {
        bubbles.push({
            x: Math.random() * c.width,
            y: Math.random() * c.height,
            radius: Math.random() * 30,
            speed: 8
        });
    }

    function drewBubble() {
        ctx.clearRect(0, 0, c.width, c.height);
        for (let b of bubbles) {
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            ctx.fillStyle = `#28C76F`;
            ctx.fill();
            ctx.strokeStyle = "#28C76F";
            ctx.stroke();
            ctx.closePath();
            b.y -= b.speed;
        }
        if (bubbles.length > 0) {
            requestAnimationFrame(drewBubble);
        }
    }
    drewBubble();
}

progress_submit_button.addEventListener('click', () => {
    addTasksInStorageDB();
    fillStatistics();
    CanvasAnimaion();

});

addHeatAndBody();
fillHeatmap();
console.log(dateCellMap);