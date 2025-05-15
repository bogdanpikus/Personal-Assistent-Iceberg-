const AddNote = document.getElementById('add_note_button');
const FileStorage = document.getElementById('FileList');
const WindowConteiner = document.getElementById('asideModalWindow');
const modalWindow = document.getElementsByTagName('ModalWindow');
const SubmitButton = document.getElementById('modalWindowButton');
const modalInput = document.getElementById('modalWindowInput');
const DivH1 = document.getElementById('contener_h1_statistics');
const Note = document.getElementById('divNotedivNote');
const modalProgressWindow = document.getElementById('modal_overlay');
const divNoteConteiner = document.getElementById('divNotedivNote');
const h1Conteiner = document.getElementById('contener_h1_statistics');
//const liTask = document.getElementById('liTasks');
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
        divneasted.style.background = 'snow';
        divneasted.style.marginTop = '2%';
        let closeButton = document.createElement('button');
        closeButton.id = `NoteButtonClose${numNoteCloseB}`;
        closeButton.innerHTML = 'X';
        closeButton.style.fontSize = '13px';
        closeButton.style.fontWeight = '600';
        closeButton.style.float = 'right';
        closeButton.style.background = '#ff5100';
        closeButton.style.border = '0';
        closeButton.style.borderTopLeftRadius = '10px';
        closeButton.style.borderTopRightRadius = '10px';
        closeButton.style.borderBottomLeftRadius = '10px';
        closeButton.style.borderBottomRightRadius = '10px';
        closeButton.style.color = 'snow';
        closeButton.style.cursor = 'pointer';
        closeButton.style.marginTop = '2px';
        closeButton.style.marginRight = '2px';
        closeButton.style.height = '20px';
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

        divNoteConteiner.appendChild(divneasted);
        divneasted.appendChild(closeButton);
        divneasted.appendChild(addButton);
    }

};
function createNoteLiElement() {
    let li = document.createElement('li');
    li.classList.add(`liTasks`);
    li.id = `liTasks${num++}`;
    let value = modalInput.value.trim();
    let noteId = num++;

    li.innerHTML = `${value}`;
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    li.style.background = `rgb(${r},${g},${b},0.4)`;

    let M = new Map();
    M.set(`li${num}`, li);
    M.forEach((li) => {
        FileStorage.appendChild(li);
        li.addEventListener('click', () => {
            Note.style.display = 'inline-block';
            h1Conteiner.style.display = 'none';
            CreateNotePage(noteId);
        });
    });
    console.log(M);

} 

SubmitButton.addEventListener('click', () => {
    createNoteLiElement();
    closeModalWindow();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        WindowConteiner.style.display = 'none';
        modalProgressWindow.style.display = 'none';
    }
});
WindowConteiner.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        createNoteLiElement();
        closeModalWindow();
    }
});

