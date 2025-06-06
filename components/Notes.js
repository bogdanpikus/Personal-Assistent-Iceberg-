import { LocalTime } from './Time.js';

//import $ from 'jquery';
const AddNote = document.getElementById('add_note_button');
const FileStorage = document.getElementById('FileList');
const WindowConteiner = document.getElementById('asideModalWindow');
const SubmitButton = document.getElementById('modalWindowButton');
const modalInput = document.getElementById('modalWindowInput');
const Note = document.getElementById('divNotedivNote');
const modalProgressWindow = document.getElementById('modal_overlay');
const h1Conteiner = document.getElementById('contener_h1_statistics');
const blurNoteModalPage = document.getElementById('blurNoteModalPage');
const ModalAddNote = document.getElementById('ModalAddNote');
const ModalAddNoteCloseButton = document.getElementById('ModalAddNoteCloseButton');
const ModalAddNoteTextarea = document.getElementById('ModalAddNoteTextarea');
const cityChangeBlock = document.getElementById('cityChangeBlock');
const LiDeadLineTime = document.getElementById('LiDeadLineTime');
const LiDeadLineDate = document.getElementById('LiDeadLineDate');
const ModalAddNoteSubmitButton = document.getElementById('ModalAddNoteSubmitButton');
const TextValue = document.getElementById('ModalAddNoteText');

let num = 1
let numNotes = 0;
let numNoteCloseB = 0;
let numNoteAddB = 0;

AddNote.addEventListener('click', () => {
    WindowConteiner.style.display = (WindowConteiner.style.display == 'none' || WindowConteiner.style.display == '') ? 'flex' : 'none';
    modalInput.value = '';
    WindowConteiner.setAttribute('tabindex', '-1'); // делает его фокусируемым
    WindowConteiner.focus();
    modalInput.focus();
});
function closeModalWindow() {
    WindowConteiner.style.display = 'none';
}
function CreateNotePage(id) {
    numNotes++;
    numNoteAddB++;
    numNoteCloseB++;
    document.querySelectorAll('.note-page').forEach(div => {
        div.style.display = 'none';
    });
    let existDiv = document.getElementById(`NoteMainPage${id}`)
    if (existDiv) {
        existDiv.style.display = 'inline-block';
    } else {
        let divneasted = document.createElement(`div`);
        divneasted.id = `NoteMainPage${id}`;
        divneasted.classList.add(`note-page`);
        divneasted.style.height = '800px';
        divneasted.style.width = '100%';
        //divneasted.style.background = 'snow';
        let NoteContainer = document.createElement('div');
        NoteContainer.id = 'NoteContainer';
        NoteContainer.classList.add('NoteClassContainer');
        divneasted.style.marginTop = '2%';
        divneasted.style.borderTopRightRadius = '20px';
        divneasted.style.borderTopLeftRadius = '20px'; 
        divneasted.style.borderBottomLeftRadius = '20px';
        divneasted.style.borderBottomRightRadius = '20px';
        let closeButton = document.createElement('button');
        closeButton.id = `NoteButtonClose${numNoteCloseB}`;
        closeButton.classList.add('closebutton');
        closeButton.innerHTML = 'X';
        closeButton.style.fontSize = '13px';
        closeButton.style.fontWeight = '600';
        closeButton.style.float = 'right';
        closeButton.style.background = '#ff5100';
        closeButton.style.border = '0';
        closeButton.style.borderTopLeftRadius = '20px';
        closeButton.style.borderTopRightRadius = '20px';
        closeButton.style.borderBottomLeftRadius = '20px';
        closeButton.style.borderBottomRightRadius = '0px';
        closeButton.style.color = 'snow';
        closeButton.style.cursor = 'pointer';
        closeButton.style.marginTop = '2px';
        closeButton.style.marginRight = '2px';
        closeButton.style.height = '40px';
        closeButton.style.width = '40px';
        let addButton = document.createElement('button');
        addButton.id = `NoteButonAdd${numNoteAddB}`;
        addButton.innerHTML = '+';
        addButton.style.fontSize = '40px';
        addButton.style.fontWeight = '400';
        addButton.style.float = 'inline-start';
        addButton.style.background = 'none';
        addButton.style.border = '0';
        addButton.style.color = '#ff5100';
        addButton.style.cursor = 'pointer';
        addButton.style.height = '30px';
        addButton.style.width = '30px';

        Note.appendChild(divneasted);
        divneasted.appendChild(closeButton);
        divneasted.appendChild(addButton);
        divneasted.appendChild(NoteContainer);
        closeButton.addEventListener('click', () => {
            divneasted.style.display = 'none';
        });
        addButton.addEventListener('click', () => {
            blurNoteModalPage.style.display = 'flex';
            ModalAddNote.style.display = 'flex';
            ModalAddNoteTextarea.value = '';
            TextValue.value = '';
        });
    }
};
function createNoteLiElement() {
    let li = document.createElement('li');
    li.classList.add(`liTasks`);
    li.id = `liTasks${num++}`;
    let value = modalInput.value.trim();
    let noteId = num++;
    li.innerHTML = `${value}`;
    let liClose = document.createElement('button');
    liClose.id = `liClose`;
    li.style.opacity = '0.7';

    let M = new Map();
    M.set(`li${num}`, li);
    M.forEach((li) => {
        li.appendChild(liClose);
        FileStorage.appendChild(li);
        //FileStorage.appendChild(liClose);
        li.addEventListener('click', () => {
            Note.style.display = 'flex';
            h1Conteiner.style.display = 'none';
            li.style.opacity = '1';
            CreateNotePage(noteId);
        });
        liClose.addEventListener('click', (event) => {
            event.stopPropagation();
            FileStorage.removeChild(li);
            /////////удаление страницы заметок € пыталс€ сделать здесь
            let div = document.getElementById(`NoteMainPage${noteId}`);
            console.log(div);
            if (div) {
                div.remove()
                blurNoteModalPage.style.display = 'none';
                ModalAddNote.style.display = 'none';
            }
        });
    });
} 
SubmitButton.addEventListener('click', () => {
    if (modalInput.value == '') {
        alert('Please imagine a Note Page Name');
    } else {
        createNoteLiElement();
        closeModalWindow();
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        WindowConteiner.style.display = 'none';
        modalProgressWindow.style.display = 'none';
        cityChangeBlock.style.display = 'none';
    }
});
WindowConteiner.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        if (modalInput.value == '') {
            alert('Please imagine a Note Page Name');
        } else {
            createNoteLiElement();
            closeModalWindow();
        }
    }
});
$("#ModalSpanId").on("click", function () {
    $("#ModalAddNoteUl").slideToggle("fast");
});

ModalAddNoteCloseButton.addEventListener('click', () => {
    blurNoteModalPage.style.display = 'none';
    ModalAddNote.style.display = 'none';
});

LiDeadLineDate.addEventListener('click', () => {
    const optionsConteiner = document.getElementById('optionsConteiner');
    const option = document.getElementById('DeadDateLine');
    if (option) {
        alert('You already have DeadLine Date');
    } else {
        let div = document.createElement('div');
        div.id = 'DeadDateLine';
        let p = document.createElement('p');
        p.innerHTML = 'End Date:';
        p.style.margin = '0';
        let input = document.createElement('input');
        input.id = 'inputDate_id'
        input.style.width = '140px';
        input.style.height = '20px';
        input.style.background = 'snow';
        input.type = 'date';
        input.style.border = '0';
        let button = document.createElement('button');
        button.style.width = '25px';
        button.style.height = '25px';
        button.innerHTML = 'x';
        optionsConteiner.appendChild(div);
        div.appendChild(p);
        div.appendChild(input);
        div.appendChild(button);
    }
});
LiDeadLineTime.addEventListener('click', () => {
    const optionsConteiner = document.getElementById('optionsConteiner');
    const option = document.getElementById('DeadTimeLine');
    if (option) {
        alert('You already have DeadLine Time');
    } else {
        let div = document.createElement('div');
        div.id = 'DeadTimeLine';
        let p = document.createElement('p');
        p.innerHTML = 'End Time:';
        p.style.margin = '0';
        let input = document.createElement('input');
        input.id = 'inputTime_id';
        input.style.width = '140px';
        input.style.height = '20px';
        input.style.background = 'snow';
        input.type = 'time';
        input.style.border = '0';
        let button = document.createElement('button');
        button.style.width = '25px';
        button.style.height = '25px';
        button.innerHTML = 'x';
        optionsConteiner.appendChild(div);
        div.appendChild(p);
        div.appendChild(input);
        div.appendChild(button);
    }
});
function deleteNoteFromWall(noteKey) {
    const noteElement = document.querySelector(`[data-note-key="${noteKey}"]`);
    if (!noteElement) {
        alert('Note not found on the wall.');
    }
    noteElement.remove();
    //открываем базу данных и удал€ем оттуда запись
    let openRequest = indexedDB.open("Tasks");
    openRequest.onsuccess = function () {
        let db = openRequest.result;
        let transaction = db.transaction("NoteDB", "readwrite");
        let Store = transaction.objectStore("NoteDB");
        let NoteStoreAll = Store.getAll();
        NoteStoreAll.onsuccess = function () {
            let result = NoteStoreAll.result;
            //alert("NoteStore Succsess");
            result.forEach((note) => {
                let key = `${note.text}_${note.endDate}_${note.endTime}_${note.reminder}`;
                if (key === noteKey) {
                    Store.delete(note.id);
                }
            });
        };
    };
}

function setupReminder(note) {
    if (!note.reminder || !note.endDate || !note.endTime) return;
    const endDateTime = new Date(`${note.endDate}T${note.endTime}`);
    const now = new Date(); 
    const timeToReminder = endDateTime.getTime() - now.getTime();
    if (timeToReminder > 0) {
        setTimeout(() => {
            alert(`Ќапоминание: ${note.title}`);
        }, timeToReminder);
    }
}
function getActiveWall() {
    const walls = document.querySelectorAll('[id^="NoteMainPage"]');

    for (const wall of walls) {
        if (getComputedStyle(wall).display !== 'none') {
            return wall;
        }
    }
    return null;
}
function renderNoteToWall(note) {
    const noteKey = `${note.text}_${note.endDate}_${note.endTime}_${note.reminder}`;
    // ѕроверка: если уже есть элемент с таким data-note-key, не добавл€ть снова
    if (document.querySelector(`[data-note-key="${noteKey}"]`)) {
        return;
    }

    const activeWall = getActiveWall();
    if (!activeWall) return;

    if (activeWall) {
        const NoteContainer = activeWall.querySelector('#NoteContainer');
        if (NoteContainer.children.length == 12) {
            alert("The limit of 12 notes has been reached.No new notes have been added.");
            return;
        }

        const noteDiv = document.createElement('div');
        noteDiv.classList.add(`note`);
        noteDiv.id = 'noteOnTheWall';
        noteDiv.setAttribute('data-note-key', noteKey);
        const closeNoteDivButton = document.createElement('button');
        closeNoteDivButton.id = 'closeNoteDivButton';
        closeNoteDivButton.addEventListener('click', (event) => {
            deleteNoteFromWall(noteKey);
            event.stopPropagation();
        });

        const text = document.createElement('h3');
        text.style.marginTop = '43px';
        text.style.marginBottom = '4px';
        text.style.marginLeft = '2px';
        text.innerText = note.text;
        noteDiv.style.cursor = 'pointer';
        noteDiv.addEventListener('click', () => {
            const existDiv = document.getElementById(`title:${note.text}`);
            if (existDiv) {
                return;
            } else {
                const div = document.createElement('div');
                div.id = `title:${note.text}`;
                div.classList.add('title');
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
                button.style.background = 'none';
                button.style.border = '0';
                button.style.fontSize = '20px';
                button.style.cursor = 'pointer';
                NoteContainer.appendChild(div);
                div.appendChild(button);
                div.appendChild(p);
                div.appendChild(date);
                div.appendChild(time);
                button.addEventListener('click', () => {
                    div.remove();
                });
            }
        });
        
        const date = document.createElement('p');
        date.style.margin = '0';
        date.style.marginLeft = '2px';
        date.style.color = 'red';
        const time = document.createElement('p');
        time.style.margin = '0';
        time.style.color = 'darkgreen';
        time.style.marginLeft = '2px';
        time.style.marginTop = '5px';
        date.innerText = `${note.endDate || ''}`;
        time.innerText = `${note.endTime || ''}`;

        const reminder = document.createElement('p');
        reminder.style.margin = '0';
        reminder.style.marginLeft = '2px';
        reminder.style.color = 'darkblue';
        reminder.innerText = note.reminder ? 'Reminder on' : 'Remainder off';

        activeWall.appendChild(NoteContainer);
        NoteContainer.appendChild(noteDiv);
        noteDiv.appendChild(closeNoteDivButton);
        noteDiv.appendChild(text);
        noteDiv.appendChild(date);
        noteDiv.appendChild(time);
        noteDiv.appendChild(reminder);
    }
};

ModalAddNoteSubmitButton.addEventListener('click', () => {
    let openRequest = indexedDB.open("Tasks");
    openRequest.onsuccess = function () {
        let db = openRequest.result;
        let transation = db.transaction('NoteDB', 'readwrite');
        let NoteDB = transation.objectStore('NoteDB');

        const inputDate = document.getElementById('inputDate_id');
        const inputTime = document.getElementById('inputTime_id');
        const textarea = document.getElementById('ModalAddNoteTextarea');
        const checkbox = document.querySelector('#remind input[type="checkbox"]');
        const TextValue = document.getElementById('ModalAddNoteText');

        const text = TextValue.value.trim();
        const title = textarea.value.trim();
        const endDate = inputDate?.value || null;
        const endTime = inputTime?.value || null;
        const reminder = checkbox.checked || false;

        if (!title && !text) {
            alert("Please, complete Note Addind Values");
            return;
        }

        let NoteObject = {
            id: `${LocalTime().nowDate}`,
            text,
            title,
            endDate,
            endTime,
            reminder,
            createdAt: new Date(),
        };

        let NotePush = NoteDB.add(NoteObject);
        NotePush.onsuccess = function () {
            blurNoteModalPage.style.display = 'none';
            ModalAddNote.style.display = 'none';
            const AllNotes = NoteDB.getAll();
            AllNotes.onsuccess = function () {
                let result = AllNotes.result;
                result.forEach(note => {
                    renderNoteToWall(note);
                });
            }
            AllNotes.onerror = function () {
                alert("Fatal Notes Pull Requerst Error", AllNotes.error);
            }
        }
        NotePush.onerror = function () {
            alert('Fatal Error', NotePush.result);
        }
    }
    openRequest.onerror = function () {
        console.log('Fatal Error', openRequest.result);
    }
});