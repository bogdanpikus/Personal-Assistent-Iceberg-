
let endTime = Date.now();
let currentDate = new Date(endTime);

let nameOfMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let daysInMonth = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31']; //колл дней в каждом мес€це
let weekDays = ['Mon','Tue','Wed','Thu','Fri','Sat','San'];
let currentMonth = `${Number(currentDate.getMonth())}`; // = ` number of month = 3`
let localMonth = nameOfMonth[currentMonth];  // `3` = `April`


let currentDay = `${currentDate.getUTCDay()}`; //today day number
document.getElementById("thead_id_month").innerHTML = `
        <p>${localMonth}</p>`; // показывает текущий мес€ц по канону выт€нутый из функции Date()

let calendar_body = document.getElementById("calendar-body"); // добавл€ю шапку календар€, там где обозначение дней недели
let calendar_head = document.getElementById("calendar_thead");
let tr_head = document.createElement("tr");
for (let weekDay = 0; weekDay <= 7; weekDay++) {
    let th_head = document.createElement("th");
    th_head.innerHTML = weekDays[weekDay];
    tr_head.appendChild(th_head);
    if (tr_head.children.length === 7) {
        break;
    }
}//конец шапки

function generateCalendar(month) { // функци€ по заполнению календар€ на каждый мес€ц
    calendar_body.innerHTML = "";  //очищаем основное тело таблицы
    let totalDays = daysInMonth[month]; //при переключении мес€ца считает сколько дней он имеет, работает исправно
    let tr = document.createElement("tr"); // создаем елемент tr в котором будет Їлемент td

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
       }
    document.getElementById("thead_id_month").innerHTML = `${nameOfMonth[month]}`;
    calendar_body.appendChild(tr);
    console.log(totalDays);
    console.log(tr);
    console.log(firstDay);
}// конец функции



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
  
    console.log(numbersMouns);
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

    console.log(numbersMouns);
}); 

setInterval(() => {//проверка поминутно правильности отображени€ мес€ца
    let newDate = new Date();
    let newMonth = newDate.getMonth();
    if (newMonth !== currentMonth) { // ≈сли сменилс€ мес€ц
        currentMonth = newMonth;
        generateCalendar(currentMonth);
    }
}, 60000);

console.log(currentDay);
calendar_head.appendChild(tr_head); //вывод шапки календар€
generateCalendar(currentMonth); //вывод таблицы текущего мес€ца
