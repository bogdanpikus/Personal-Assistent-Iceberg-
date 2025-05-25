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
        closeButton.addEventListener('click', () => {
            divneasted.style.display = 'none';
        });
        addButton.addEventListener('click', () => {
            blurNoteModalPage.style.display = 'flex';
            ModalAddNote.style.display = 'flex';
            ModalAddNoteTextarea.value = '';
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
    //let r = Math.floor(Math.random() * 256);
    //let g = Math.floor(Math.random() * 256);
    //let b = Math.floor(Math.random() * 256);
    //li.style.background = `rgb(${r},${g},${b},0.4)`;
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

console.log(LocalTime().nowDate);
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
//// Ќаписать алгоритм отображени€ заметок на стене
ModalAddNoteSubmitButton.addEventListener('click', () => {
    let openRequest = indexedDB.open("Tasks");
    openRequest.onsuccess = function () {
        alert("Open IndexedDb Success");
        let db = openRequest.result;
        let transation = db.transaction('NoteDB', 'readwrite');
        let NoteDB = transation.objectStore('NoteDB');

        const inputDate = document.getElementById('inputDate_id');
        const inputTime = document.getElementById('inputTime_id');
        const textarea = document.getElementById('ModalAddNoteTextarea');
        const checkbox = document.querySelector('#remind input[type="checkbox"]');

        const title = textarea.value.trim(); 
        const endDate = inputDate?.value || null;
        const endTime = inputTime?.value || null;
        const reminder = checkbox.checked || false;

        if (!title) {
            alert("Write text");
            return;
        }
        let NoteObject = {
            id: `${LocalTime().nowDate}}`,
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
            alert("NotePush Success");
        }
        NotePush.onerror = function () {
            alert('Fatal Error', NotePush.result);
        }
    }
    openRequest.onerror = function () {
        console.log('Fatal Error', openRequest.result);
    }
});