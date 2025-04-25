const AddNote = document.getElementById('add_note_button');
const FileStorage = document.getElementById('FileList');
const WindowConteiner = document.getElementById('asideModalWindow');
const modalWindow = document.getElementsByTagName('ModalWindow');
const SubmitButton = document.getElementById('modalWindowButton');
const modalInput = document.getElementById('modalWindowInput');
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
function createNoteLiElement() {
    let li = document.createElement('li');
    li.classList.add(`li${num++}`);
    let value = modalInput.value.trim();
    li.innerHTML = `${value}`;
    FileStorage.appendChild(li);
} 

SubmitButton.addEventListener('click', () => {
    createNoteLiElement();
    closeModalWindow();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        WindowConteiner.style.display = 'none';
    }
    if(event.key === 'Enter') {
        createNoteLiElement();
        closeModalWindow();
    }
});