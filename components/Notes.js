const AddNote = document.getElementById('add_note_button');
const FileStorage = document.getElementById('FileList');
const WindowConteiner = document.getElementById('asideModalWindow');
const modalWindow = document.getElementsByTagName('ModalWindow');
const SubmitButton = document.getElementById('modalWindowButton');
const modalInput = document.getElementById('modalWindowInput');
const DivH1 = document.getElementById('contener_h1_statistics');
const Note = document.getElementById('divNotedivNote');
const modalProgressWindow = document.getElementById('modal_overlay');
let num = 1

AddNote.addEventListener('click', () => {
    WindowConteiner.style.display = (WindowConteiner.style.display == 'none' || WindowConteiner.style.display == '') ? 'flex' : 'none';
    modalInput.innerHTML = '';
    WindowConteiner.setAttribute('tabindex', '-1'); // делает его фокусируемым
    WindowConteiner.focus();
    modalInput.focus();
});

function closeModalWindow() {
    WindowConteiner.style.display = 'none';
}
function CreateNotePage() {
    DivH1.style.display = 'none';
};
function createNoteLiElement() {
    let li = document.createElement('li');
    li.classList.add(`li${num++}`);
    li.id = `liTasks`;
    let value = modalInput.value.trim();
    li.innerHTML = `${value}`;
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    li.style.background = `rgb(${r},${g},${b},0.4)`;
    //FileStorage.appendChild(li);

    let M = new Map();
    M.set(`li${num}`, li);
    M.forEach((li) => {
        FileStorage.appendChild(li);
        li.addEventListener('click', () => {
            Note.style.display = 'inline-block';
            CreateNotePage();
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
    if(event.key === 'Enter') {
        closeModalWindow();
    }
});
