const search = document.getElementById('main_search');
const searchNotes = document.getElementById('searchNotes');

const DB_NAME = "Tasks";
const STORE_NAME = "NoteDB";

// Поиск в IndexedDB
function Search(query) {
    const openRequest = indexedDB.open(DB_NAME);
    openRequest.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const objectStore = transaction.objectStore(STORE_NAME);
        const results = [];
        objectStore.openCursor().onsuccess = function (event) {
            const cursor = event.target.result;
            if (cursor) {
                const note = cursor.value;
                if (note.text.toLowerCase().includes(query.toLowerCase())) {
                    results.push(note);
                }
                cursor.continue();
            } else {
                displaySearchResults(results);
            }
        };
        objectStore.openCursor().onerror = function () {
            console.error("Ошибка получения данных");
        };
    };
    openRequest.onerror = function () {
        console.error("Ошибка открытия базы данных", openRequest.error);
    };
}
// Отображение результатов
function displaySearchResults(results) {
    const main_search = document.getElementById('main_search');
    const main = document.getElementById('main');
    searchNotes.style.display = 'flex';
    searchNotes.innerHTML = '';
    results.forEach(note => {
        const li = document.createElement('li');
        li.textContent = note.text;
        li.classList.add('liTasks');
        li.style.width = '100%';
        li.style.height = '100%';
        li.style.marginLeft = '5px';
        searchNotes.appendChild(li);

        li.addEventListener('click', () => {
            searchNotes.style.display = 'none';
            main_search.value = '';
            console.log(li);
            //отображение заметки тут 
            const div = document.createElement('div');
            div.id = 'SearchNote';
            div.classList.add('SearchNote');
            div.style.borderRadius = '10px';
            const p = document.createElement('p');
            p.innerText = note.title;
            p.style.margin = '40px';
            const date = document.createElement('p');
            date.innerText = `${note.endDate || ''}`;
            date.style.margin = '0';
            date.style.marginLeft = '10px';
            date.style.marginRight = 'auto';
            const time = document.createElement('p');
            time.innerText = `${note.endTime || ''}`;
            time.style.margin = '0';
            time.style.marginLeft = '10px';
            time.style.marginRight = 'auto';
            const button = document.createElement('button');
            button.style.position = 'absolute';
            button.style.bottom = '100%';
            button.style.left = '100%';
            button.innerText = 'x';
            button.style.border = '0';
            button.style.fontSize = '15 px';
            button.style.cursor = 'pointer';
            button.style.color = 'red';
            button.style.background = 'none';
            main.appendChild(div);
            div.appendChild(button);
            div.appendChild(p);
            div.appendChild(date);
            div.appendChild(time);
            button.addEventListener('click', () => {
                div.remove();
            });
        });
    });
}

// Обработка ввода в поле поиска
search.addEventListener('input', () => {
    const query = search.value.trim();
    if (query.length > 0) {
        Search(query);
    } else {
        searchNotes.style.display = 'none';
    }
});