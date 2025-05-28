
let endTime = Date.now();
let currentDate = new Date(endTime);
////////////////////////////////////////////////////////////////////////////////////////// ≈сли не работает код, то из-за этого
let CurrentYear = currentDate.getFullYear();
let daysInMonth = []; /////[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
for (let Mon = 0; Mon < 12; Mon++) {
    let LastDayIn_Month = new Date(CurrentYear, Mon + 1, 0);
    daysInMonth.push(LastDayIn_Month.getDate());
};
/////////////////////////////////////////////////////////////////////////////////////////
let nameOfMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//let daysInMonth = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31']; //колл дней в каждом мес€це
let weekDays = ['Mon','Tue','Wed','Thu','Fri','Sat','San'];
let currentMonth = `${Number(currentDate.getMonth())}`; // = ` number of month = 3`
let localMonth = nameOfMonth[currentMonth];  // `3` = `April`


let currentDay = `${currentDate.getDate()}`; //today day number
document.getElementById("thead_id_month").innerHTML = `
        <p>${localMonth}</p>`; // показывает текущий мес€ц по канону выт€нутый из функции Date()

let calendar_body = document.getElementById("calendar-body"); // добавл€ю шапку календар€, там где обозначение дней недели
let calendar_head = document.getElementById("calendar_thead");
let tr_head = document.createElement("tr");
for (let weekDay = 0; weekDay <= 7; weekDay++) {
    let th_head = document.createElement("th");
    th_head.innerHTML = weekDays[weekDay];
    th_head.className = 'weekDays';
    tr_head.appendChild(th_head);
    if (tr_head.children.length === 7) {
        break;
    }
}//конец шапки

function generateCalendar(month) { // функци€ по заполнению календар€ на каждый мес€ц
    calendar_body.innerHTML = "";  //очищаем основное тело таблицы
    let totalDays = daysInMonth[month]; //при переключении мес€ца считает сколько дней он имеет, работает исправно
    let tr = document.createElement("tr"); // создаем елемент tr в котором будет Їлемент td
    let year = currentDate.getFullYear();
    let firstDay = new Date(currentDate.getFullYear(), month, 1).getUTCDay(); //пустые €чейки перед первым числом
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
    document.getElementById("thead_id_month").innerHTML = `${nameOfMonth[month]}`;
    document.getElementById("current_year").innerHTML = `${year}`;
    calendar_body.appendChild(tr);
}


document.getElementById("button_forward_calendar").addEventListener('click', () => {
    let numbers = 1;
    let numbersMouns = Number(currentMonth++) + numbers;
    if (numbersMouns > 11) {
        numbersMouns = 0;
        currentMonth = 0;
    }

    generateCalendar(numbersMouns);
   // let nextMonthNumber = localMonth = nameOfMonth[numbersMouns];
    //  document.getElementById("thead_id_month").innerHTML = `<p>${nextMonthNumber}</p>`;
  
   // console.log(numbersMouns);
});

document.getElementById("button_back_calendar").addEventListener('click', () => {
    let numbers = 1;
    let numbersMouns = Number(currentMonth--) - numbers;
    if (numbersMouns < 0) {
        numbersMouns = 11;
        currentMonth = 11;
    }

    generateCalendar(numbersMouns);
   // let previousMonthNumber = localMonth = nameOfMonth[numbersMouns];
   // document.getElementById("thead_id_month").innerHTML = `<p>${previousMonthNumber}</p>`;

   // console.log(numbersMouns);
}); 

//setInterval(() => {//проверка поминутно правильности отображени€ мес€ца
    let newDate = new Date();
    let newMonth = newDate.getMonth();
    if (newMonth !== currentMonth) { // ≈сли сменилс€ мес€ц
        currentMonth = newMonth;
        generateCalendar(currentMonth);
    }
//}, 60000);
calendar_head.appendChild(tr_head); //вывод шапки календар€
generateCalendar(currentMonth); //вывод таблицы текущего мес€ца

function NoteAcivity() {
    const openRequest = indexedDB.open("Tasks");
    openRequest.onsuccess = function () {
        let db = openRequest.result;
        let transaction = db.transaction('NoteDB', 'readwrite');
        let NoteDB = transaction.objectStore('NoteDB').getAll();
        NoteDB.onsuccess = function () {
            let result = NoteDB.result;
            const td = document.querySelectorAll("#calendar-body > tr > td");
            console.log(td);
            result.forEach(note => {
                if (note.endDate !== null) {
                    let day = note.endDate.split("-")[2]; //выводит день (30) ,числом, конечной даты
                    let month = note.endDate.split("-")[1]; //выводит мес€ц конечной даты
                    let year = note.endDate.split("-")[0]; //выводит год конечной даты
                    //console.log(day, month, year); 
                }
            });

        }
    }
    openRequest.onerror = function () {
        alert('Calendar open Database Fatal Error', openRequest.error);
    }
};

const calendar_block = document.getElementById('calendar_block_div');
document.getElementById('calendar_id_button').addEventListener('click', function () {
    calendar_block.style.display = (calendar_block.style.display === 'none' || calendar_block.style.display === '') ? 'inline-block' : 'none';
    NoteAcivity();
});
