const calendar_block = document.getElementById("calendar_block_div");
const calendar_body = document.getElementById("calendar-body");
const calendar_head = document.getElementById("calendar_thead");
const nameOfMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const endTime = Date.now();
const currentDate = new Date(endTime);
let currentMonth = currentDate.getMonth();
const localMonth = nameOfMonth[currentMonth];
const CurrentYear = currentDate.getFullYear();
const daysInMonth = Array.from({ length: 12 }, (_, Mon) =>
  new Date(CurrentYear, Mon + 1, 0).getDate(),
);
function HeadCalendar() {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const tr_head = document.createElement("tr");
  for (let weekDay = 0; weekDay <= 7; weekDay++) {
    let th_head = document.createElement("th");
    th_head.innerHTML = weekDays[weekDay];
    th_head.className = "weekDays";
    tr_head.appendChild(th_head);
    if (tr_head.children.length === 7) {
      break;
    }
  }
  calendar_head.appendChild(tr_head); //����� ����� ���������
}
function generateCalendar(month) {
  // ������� �� ���������� ��������� �� ������ �����
  calendar_body.innerHTML = ""; //������� �������� ���� �������
  let totalDays = daysInMonth[month]; //��� ������������ ������ ������� ������� ���� �� �����, �������� ��������
  let tr = document.createElement("tr"); // ������� ������� tr � ������� ����� ������� td
  let year = currentDate.getFullYear();
  let firstDay = new Date(year, month, 1).getDay();
  firstDay = firstDay === 0 ? 6 : firstDay - 1;

  for (let i = 0; i < firstDay; i++) {
    let td_empty = document.createElement("td");
    tr.appendChild(td_empty);
  }

  for (let day = 1; day <= totalDays; day++) {
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
  if (newMonth !== currentMonth) {
    // ���� �������� �����
    currentMonth = newMonth;
    generateCalendar(currentMonth);
  }
}
function NoteAcivity() {
  const openRequest = indexedDB.open("Tasks");
  openRequest.onsuccess = function () {
    let db = openRequest.result;
    let transaction = db.transaction("NoteDB", "readwrite");
    let NoteDB = transaction.objectStore("NoteDB").getAll();
    NoteDB.onsuccess = function () {
      let result = NoteDB.result;
      result.forEach((note) => {
        if (note.endDate !== null) {
          let day = note.endDate.split("-")[2]; //������� ���� (30) ,������, �������� ����
          let month = note.endDate.split("-")[1]; //������� ����� �������� ����
          let year = note.endDate.split("-")[0];
          let data = `${year}-${month}-${day}`; //������� ��� �������� ����
          if (year == CurrentYear && month == `0${currentMonth + 1}`) {
            //�������� ������ �� ������� �����
            const td = document.querySelectorAll("#calendar-body > tr > td");
            td.forEach((td) => {
              if (td.innerText === String(day)) {
                td.style.color = "green";
                td.setAttribute("data-date", data);
              }
            });
          }
        }
      });
    };
  };
  openRequest.onerror = function () {
    alert("Calendar open Database Fatal Error", openRequest.error);
  };
}
document
  .getElementById("calendar_id_button")
  .addEventListener("click", function () {
    calendar_block.style.display =
      calendar_block.style.display === "none" ||
      calendar_block.style.display === ""
        ? "inline-block"
        : "none";
  });
function ShowNotesOnCalendar() {
  const td = document.querySelectorAll("#calendar-body > tr > td");
  td.forEach((td) => {
    td.addEventListener("click", (event) => {
      const element = event.currentTarget;
      const color = getComputedStyle(element).color;
      if (color === "rgb(0, 128, 0)") {
        const clickedDate = element.getAttribute("data-date");
        const openRequest = indexedDB.open("Tasks");
        openRequest.onsuccess = function () {
          let db = openRequest.result;
          let transaction = db.transaction("NoteDB", "readonly");
          let store = transaction.objectStore("NoteDB");
          const request = store.getAll();
          request.onsuccess = function () {
            const result = request.result;
            const notesForDate = result.filter(
              (note) => note.endDate === clickedDate,
            );
            // �������� ������ �����
            const Main = document.getElementById("main");
            const div = document.createElement("div");
            //��� ���� �������� title �� ������� � IndexedDB � ����������� � h
            notesForDate.forEach((note) => {
              const existNote = document.getElementById(`Note:${note.endDate}`);
              if (existNote) {
                return;
              } else {
                div.id = `Note:${note.endDate}`;
                div.style.display = "flex";
                div.style.position = "absolute";
                div.style.alignItems = "center";
                div.style.flexDirection = "column";
                div.style.background = "white";
                div.style.height = "fit-content";
                div.style.width = "300px";
                div.style.zIndex = "1000";
                div.style.left = `${Math.floor(Math.random() * 70)}%`;
                div.style.top = `20%`;
                div.style.borderRadius = "20px";
                let r = Math.floor(Math.random() * 100);
                let g = Math.floor(Math.random() * 100);
                let b = Math.floor(Math.random() * 100);
                div.style.background = `rgb(${r},${g},${b})`;
                div.style.filter = "hue(10px)";
                const close = document.createElement("button");
                close.id = "NoteButton";
                close.innerText = "x";
                const h = document.createElement("h1");
                h.textContent = note.text;
                h.style.fontSize = "50px";
                h.style.fontWeight = "600";
                h.style.textShadow = "0px 0px 12px black";
                h.style.color = "white";
                h.style.marginTop = "0";
                div.appendChild(close);
                div.appendChild(h);
                Main.appendChild(div);
                close.addEventListener("click", () => {
                  div.remove();
                });
              }
            });
          };
        };
      }
    });
  });
}
document
  .getElementById("button_forward_calendar")
  .addEventListener("click", () => {
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
document
  .getElementById("button_back_calendar")
  .addEventListener("click", () => {
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
CheckMonth();
HeadCalendar();
NoteAcivity();
ShowNotesOnCalendar();
