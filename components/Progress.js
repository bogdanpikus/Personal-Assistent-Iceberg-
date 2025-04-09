
let div_storage  = document.getElementById("input_progress_storage");
let number = 0;
let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
let IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
/////////////////////////////////////////////��������� ���� ������
let openRequest = indexedDB.open("Tasks"); //��� ������ ��������� � IndexedDB, ��� �������� ������� ������� (����������� ��) ���� �����.
let db;    
function renderTasks() {
    /////////�����������/����������� ������ �� IndexedDB
    let Store = db.transaction('TaskDB', 'readwrite').objectStore('TaskDB');
    let request = Store.getAll(); //������ ������ - �������� 

    request.onsuccess = function () {
        let Store = db.transaction('TaskDB', 'readonly').objectStore('TaskDB');
        let request = Store.getAll();

        request.onsuccess = function () {
            div_storage.innerHTML = ""; // �������� ������ ����� �������

            request.result.forEach(task => {
                let taskDiv = document.createElement('div');
                taskDiv.classList.add('task-item');

                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = task.checked || false;

                let text = document.createElement('span');
                text.textContent = task.text;

                let deleteButton = document.createElement("button");
                deleteButton.classList.add('deleteButton');

                // ��� ����� �������� � �������� � ����
                checkbox.addEventListener('change', () => {
                    let updateTransaction = db.transaction('TaskDB', 'readwrite').objectStore('TaskDB');
                    task.checked = checkbox.checked;
                    updateTransaction.put(task); // ��������� ���� ������
                });

                taskDiv.appendChild(checkbox);
                taskDiv.appendChild(text);
                taskDiv.appendChild(deleteButton);
                div_storage.appendChild(taskDiv);
            });
        };

        request.onerror = function () {
            console.error("������ ������ �����:", request.error);
        };
    }
};

openRequest.onsuccess = function () {
    db = openRequest.result;
    renderTasks();
}

// ��������/������� ���� ����� ��� �������� �����
openRequest.onupgradeneeded = function () {
    // ���������, ���� �� �볺�� ���� ���� �����
    // ...�������� �����������...
    db = openRequest.result;
    db.createObjectStore("TaskDB", { keyPath: "id" });
};

openRequest.onerror = function () { //����� ������
    console.error("Error", openRequest.error);
};

////////////////////////////////////////////////////////

function openModal() {
    document.getElementById('modal_overlay').style.display = 'flex';
};

function closeModal() {
    document.getElementById('modal_overlay').style.display = 'none';
};

document.getElementById('progress_adding_button').addEventListener('click', openModal);
document.getElementById('cancel_note_button').addEventListener('click', closeModal);
document.getElementById('save_note_button').addEventListener('click', () => {
    const value = document.getElementById('note_input').value.trim();
    let nowDateZip = Date.now();
    let nowDateUnZip = new Date(nowDateZip);
  //  let day_month_year = `${nowDateUnZip.getDay()}:${nowDateUnZip.getMonth()}:${nowDateUnZip.getFullYear()}:${nowDateUnZip.getSeconds()}:${nowDateUnZip.getMinutes()}`;
    let day_month_year = nowDateUnZip.toLocaleString("ua-UA");
    if (value) {
        ////////////////////////////////////////////// �������� ������ � ������ � ������� � indexedDB
        let Store = db.transaction('TaskDB', 'readwrite').objectStore('TaskDB'); // (1)

        // �������� ������� �ᒺ��� ��� ������ � ���
       // let Store = transaction.objectStore('TaskDB'); // (2)

        let task = {
            id: day_month_year, // ������� ������ ������� ���������� id
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
            ///////////////////////////////////////////////


        closeModal();
    } else {
        alert("Please write some text");
    }
});

console.log(db);
console.log(openRequest.onupgradeneeded);