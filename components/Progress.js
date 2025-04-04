let div_storage = document.getElementById("input_progress_storage");
let number = 0;

function openModal() {
    document.getElementById('modal_overlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal_overlay').style.display = 'none';
}

document.getElementById('progress_adding_button').addEventListener('click', openModal);
document.getElementById('cancel_note_button').addEventListener('click', closeModal);
document.getElementById('save_note_button').addEventListener('click', () => {
    const value = document.getElementById('note_input').value.trim();
    if (value) {
        // Добавь задачу в список и сохрани в indexedDB, если хочешь
        closeModal();
    } else {
        alert("Пожалуйста, введите текст задачи");
    }
});


/*document.getElementById('progress_adding_button').addEventListener('click', () => {
    const form = document.getElementById('note_form');
    form.style.display = (form.style.display === 'none') ? 'block' : 'none';
});

document.getElementById('progress_adding_button').addEventListener('click', () => {
    number++;

    div_storage.innerHTML = '';
    let div_note = document.createElement("div"); //создаем элемент div
    div_note.className = `div_task_${number}`;
    let checkbox = document.createElement("input");
    let button = document.createElement("button");
    div_storage.appendChild(div_note); //говорим что div_note это подэлемент div_storage
    div_note.appendChild(checkbox);
    div_note.appendChild(button);


    console.log(div_note);
    console.log(div_storage);
}); */