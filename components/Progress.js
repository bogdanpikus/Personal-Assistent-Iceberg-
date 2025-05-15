const div_storage = document.getElementById("input_progress_storage");
const note_input = document.getElementById('note_input');
const modal_window_Div = document.getElementById('modal_window_Div');
const modal_overlay = document.getElementById('modal_overlay');

let number = 0;
let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
let IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
/////////////////////////////////////////////Создается база данных
let openRequest = indexedDB.open("Tasks", 2); //Щоб почати працювати з IndexedDB, нам спочатку потрібно відкрити (підключитися до) бази даних.
let db;    
let td;
function renderTasks() {
    /////////вытягивание/отображения данных из IndexedDB
    let Store = db.transaction('TaskDB', 'readwrite').objectStore('TaskDB');
    let request = Store.getAll(); //массив ключей - значений 

    request.onsuccess = function () {
        let Store = db.transaction('TaskDB', 'readonly').objectStore('TaskDB');
        let request = Store.getAll();

        request.onsuccess = function () {
            div_storage.innerHTML = ""; // очистить список перед выводом
            let buttonNumber = 1;
            let inputNumber = 1;
            request.result.forEach(task => {
                let taskDiv = document.createElement('div');
                taskDiv.classList.add('task-item');

                let text = document.createElement('span');
                text.id = 'progress_span_text';
                text.textContent = `${task.text}`;

                let checkbox = document.createElement('input');
                checkbox.classList.add(`input${inputNumber++}`)
                checkbox.id = 'input';
                checkbox.type = 'checkbox';
                checkbox.checked = task.checked || false;

                let deleteButton = document.createElement("button");
                deleteButton.classList.add(`deleteButton${buttonNumber++}`);
                deleteButton.addEventListener('click', () => {
                    let deleteTask = db.transaction('TaskDB', 'readwrite').objectStore('TaskDB');
                    let deleteRequest = deleteTask.delete(task.id); //удаление
                    deleteRequest.onsuccess = () => {
                        console.log(`Task ${task.id} delete`);
                        taskDiv.remove();
                    };
                    deleteRequest.error = () => {
                        console.error("deleteRequest ERROR:", deleteRequest.error);
                    };
                });

                // при смене чекбокса — обновить в базе
                checkbox.addEventListener('change', () => {
                    let updateTransaction = db.transaction('TaskDB', 'readwrite').objectStore('TaskDB');
                    task.checked = checkbox.checked;
                    updateTransaction.put(task); // обновляем весь объект
                });

                taskDiv.appendChild(checkbox);
                taskDiv.appendChild(text);
                taskDiv.appendChild(deleteButton);
                div_storage.appendChild(taskDiv);
            });
        };

        request.onerror = function () {
            console.error("Ошибка чтения задач:", request.error);
        };
    }
};
openRequest.onsuccess = function () {
    db = openRequest.result;
    renderTasks();
}
// створити/оновити базу даних без перевірки версій
openRequest.onupgradeneeded = function () {
    // спрацьовує, якщо на клієнті немає бази даних
    // ...виконати ініціалізацію...
    db = openRequest.result;
    if (!db.objectStoreNames.contains('TaskDB')) {
        db.createObjectStore("TaskDB", { keyPath: "id" });
    };
    if (!db.objectStoreNames.contains('StoreTD')) {
        db.createObjectStore("StoreTD", { keyPath: "id" });
    };
};
openRequest.onerror = function () { //ловим ошибки
    console.error("Error", openRequest.error);
};
function openModal() {
    document.getElementById('modal_overlay').style.display = 'flex';
};
function closeModal() {
    document.getElementById('modal_overlay').style.display = 'none';
};

function RenderTasks() {
    const value = document.getElementById('note_input').value.trim();
    let nowDateZip = Date.now();
    let nowDateUnZip = new Date(nowDateZip);
    let day_month_year = nowDateUnZip.toLocaleString("ua-UA");
    if (value) {
        ////////////////////////////////////////////// Добавить задачу в список и сохрани в indexedDB
        let Store = db.transaction('TaskDB', 'readwrite').objectStore('TaskDB'); // (1)
        // отримати сховище об’єктів для роботи з ним
        // let Store = transaction.objectStore('TaskDB'); // (2)
        let task = {
            id: day_month_year, // простой способ создать уникальный id
            checked: false,
            text: value
        };


        let request = Store.add(task); // (3)
        request.onsuccess = function () { // (4)
            console.log("Task add to storage", request.result);
            renderTasks();
        };
        request.onerror = function () {
            console.log("Fatal Error", request.error);
        };
        closeModal();
    } else {
        alert("Please write some text");
    }
}

document.getElementById('progress_adding_button').addEventListener('click', () => {
    openModal();
    note_input.value = '';
    note_input.focus();
});
document.getElementById('cancel_note_button').addEventListener('click', closeModal);
document.getElementById('save_note_button').addEventListener('click', () => {
    RenderTasks();
});

modal_overlay.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        RenderTasks();
    }
});