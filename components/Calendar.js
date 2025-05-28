
let endTime = Date.now();
let currentDate = new Date(endTime);
////////////////////////////////////////////////////////////////////////////////////////// ���� �� �������� ���, �� ��-�� �����
let CurrentYear = currentDate.getFullYear();
let daysInMonth = []; /////[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
for (let Mon = 0; Mon < 12; Mon++) {
    let LastDayIn_Month = new Date(CurrentYear, Mon + 1, 0);
    daysInMonth.push(LastDayIn_Month.getDate());
};
/////////////////////////////////////////////////////////////////////////////////////////
let nameOfMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//let daysInMonth = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31']; //���� ���� � ������ ������
let weekDays = ['Mon','Tue','Wed','Thu','Fri','Sat','San'];
let currentMonth = `${Number(currentDate.getMonth())}`; // = ` number of month = 3`
let localMonth = nameOfMonth[currentMonth];  // `3` = `April`


let currentDay = `${currentDate.getDate()}`; //today day number
document.getElementById("thead_id_month").innerHTML = `
        <p>${localMonth}</p>`; // ���������� ������� ����� �� ������ ��������� �� ������� Date()

let calendar_body = document.getElementById("calendar-body"); // �������� ����� ���������, ��� ��� ����������� ���� ������
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
}//����� �����

function generateCalendar(month) { // ������� �� ���������� ��������� �� ������ �����
    calendar_body.innerHTML = "";  //������� �������� ���� �������
    let totalDays = daysInMonth[month]; //��� ������������ ������ ������� ������� ���� �� �����, �������� ��������
    let tr = document.createElement("tr"); // ������� ������� tr � ������� ����� ������� td
    let year = currentDate.getFullYear();
    let firstDay = new Date(currentDate.getFullYear(), month, 1).getUTCDay(); //������ ������ ����� ������ ������
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
    //console.log(totalDays);
    //console.log(tr);
    //console.log(firstDay);
    //console.log(year);
}// ����� �������



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

//setInterval(() => {//�������� ��������� ������������ ����������� ������
    let newDate = new Date();
    let newMonth = newDate.getMonth();
    if (newMonth !== currentMonth) { // ���� �������� �����
        currentMonth = newMonth;
        generateCalendar(currentMonth);
    }
//}, 60000);
calendar_head.appendChild(tr_head); //����� ����� ���������
generateCalendar(currentMonth); //����� ������� �������� ������
