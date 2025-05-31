const calendar_block = document.getElementById('calendar_block_div');
const calendar_body = document.getElementById("calendar-body");
const calendar_head = document.getElementById("calendar_thead");
const nameOfMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const endTime = Date.now();
const currentDate = new Date(endTime);
let currentMonth = currentDate.getMonth();
const localMonth = nameOfMonth[currentMonth];
const CurrentYear = currentDate.getFullYear();
const daysInMonth = Array.from({ length: 12 }, (_, Mon) =>
    new Date(CurrentYear, Mon + 1, 0).getDate()
);


function HeadCalendar() {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const tr_head = document.createElement("tr");
    for (let weekDay = 0; weekDay <= 7; weekDay++) {
        let th_head = document.createElement("th");
        th_head.innerHTML = weekDays[weekDay];
        th_head.className = 'weekDays';
        tr_head.appendChild(th_head);
        if (tr_head.children.length === 7) {
            break;
        }
    }
    calendar_head.appendChild(tr_head); //вывод шапки календаря
}
function generateCalendar(month) { // функция по заполнению календаря на каждый месяц
    calendar_body.innerHTML = "";  //очищаем основное тело таблицы
    let totalDays = daysInMonth[month]; //при переключении месяца считает сколько дней он имеет, работает исправно
    let tr = document.createElement("tr"); // создаем елемент tr в котором будет єлемент td
    let year = currentDate.getFullYear();
    let firstDay = new Date(year, month, 1).getDay();
    firstDay = (firstDay === 0) ? 6 : firstDay - 1;
 

    for (let i = 0; i < firstDay; i++) {
        let td_empty = document.createElement("td");
        tr.appendChild(td_empty);
    }

    for (let day = 1; day <= totalDays; day++){ 
            let td = document.createElement("td");
            td.innerText = day;
            tr.appendChild(td);
        if (tr.children.length === 7) {
            calendar_body.appendChild(tr);
            tr = document.createElement("tr");
        }

        if (
            day === currentDate.getDate() &&
            year === currentDate.getFullYear() &&
            month === currentDate.getMonth()
        ) {
            td.classList.add("today");
        }

    }

    let month_year = `${nameOfMonth[month]} ${year}`;
    document.getElementById("thead_id_month").innerHTML = `${month_year}`;
    calendar_body.appendChild(tr);
}
function CheckMonth() {
    let newDate = new Date();
    let newMonth = newDate.getMonth();
    if (newMonth !== currentMonth) { // Если сменился месяц
        currentMonth = newMonth;
        generateCalendar(currentMonth);
    }
}
function NoteAcivity() {    
    const openRequest = indexedDB.open("Tasks");
    openRequest.onsuccess = function () {
        let db = openRequest.result;
        let transaction = db.transaction('NoteDB', 'readwrite');
        let NoteDB = transaction.objectStore('NoteDB').getAll();
        NoteDB.onsuccess = function () {
            let result = NoteDB.result;
            result.forEach(note => {
                if (note.endDate !== null) {
                    let day = note.endDate.split("-")[2]; //выводит день (30) ,числом, конечной даты
                    let month = note.endDate.split("-")[1]; //выводит месяц конечной даты
                    let year = note.endDate.split("-")[0];
                    let data = `${year}-${month}-${day}`;//выводит год конечной даты
                    if (year == CurrentYear && month == `0${currentMonth + 1}`) { //проверка только на текущий месяц
                        const td = document.querySelectorAll("#calendar-body > tr > td");
                        td.forEach(td => {
                            if (td.innerText === String(day)) {
                                td.style.color = 'green';
                                td.setAttribute("data-date", data);
                            }
                        });
                    }
                }
            });

        }
    }
    openRequest.onerror = function () {
        alert('Calendar open Database Fatal Error', openRequest.error);
    }
};
document.getElementById('calendar_id_button').addEventListener('click', function () {
    calendar_block.style.display = (calendar_block.style.display === 'none' || calendar_block.style.display === '') ? 'inline-block' : 'none';
});
function ShowNotesOnCalendar() {
    const td = document.querySelectorAll("#calendar-body > tr > td");
    td.forEach(td => {
        td.addEventListener('click', (event) => {   
            const element = event.currentTarget;
            const color = getComputedStyle(element).color;
            if (color === 'rgb(0, 128, 0)') { 
                const clickedDate = element.getAttribute('data-date');
                const openRequest = indexedDB.open("Tasks");
                openRequest.onsuccess = function () {
                    let db = openRequest.result;
                    let transaction = db.transaction('NoteDB', 'readonly');
                    let store = transaction.objectStore('NoteDB');
                    const request = store.getAll();
                    request.onsuccess = function () {
                        const result = request.result;
                        const notesForDate = result.filter(note => note.endDate === clickedDate);
                        // Создание нового блока
                        const Main = document.getElementById('main');
                        const div = document.createElement('div');
                        //тут надо забирать title из заметки в IndexedDB и высвечивать в h
                        notesForDate.forEach(note => {
                            const existNote = document.getElementById(`Note:${note.endDate}`);
                            if (existNote) {
                                return;
                            } else {
                                div.id = `Note:${note.endDate}`;
                                div.style.display = 'flex';
                                div.style.position = 'absolute';
                                div.style.alignItems = 'center';
                                div.style.background = 'white';
                                div.style.height = '100px';
                                div.style.zIndex = '1000';
                                div.style.left = `${Math.floor(Math.random() * 100)}%`;
                                div.style.top = `${Math.floor(Math.random() * 100)}%`;
                                const h = document.createElement('h1');
                                h.textContent = note.title;
                                div.appendChild(h);
                                Main.appendChild(div);
                            }
                        });
                    };
                };
            }
        });
    });
}
document.getElementById("button_forward_calendar").addEventListener('click', () => {
    let numbers = 1;
    let numbersMouns = Number(currentMonth++) + numbers;
    if (numbersMouns > 11) {
        numbersMouns = 0;
        currentMonth = 0;
    }

    calendar_body.innerHTML = "";
    generateCalendar(numbersMouns);
    NoteAcivity();
    ShowNotesOnCalendar();
});
document.getElementById("button_back_calendar").addEventListener('click', () => {
    let numbers = 1;
    let numbersMouns = Number(currentMonth--) - numbers;
    if (numbersMouns < 0) {
        numbersMouns = 11;
        currentMonth = 11;
    }

    calendar_body.innerHTML = "";
    generateCalendar(numbersMouns);
    NoteAcivity();
    ShowNotesOnCalendar();
});

generateCalendar(currentMonth);
CheckMonth()
HeadCalendar();
NoteAcivity();
ShowNotesOnCalendar();