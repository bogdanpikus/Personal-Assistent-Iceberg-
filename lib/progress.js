import { useEffect, useRef, useState } from "react";
export default function Progress() {
    const [db, setDb] = useState(null); // состояние базы данных
    const [notes, setNotes] = useState([]); //состояния заметок, но не знаю, пождойдет ли для всех
    const [showModalWindow, setModalWindow] = useState(false);
    const inputRef = useRef(null);
    const checkboxRefs = useRef({});
    const idCounter = useRef(1);
    const spanRefs = useRef({});

    // Открытие IndexedDB и инициализация
    useEffect(() => {
        const openRequest = indexedDB.open("Storage", 1);
        openRequest.onupgradeneeded = function () {
            let db = openRequest.result;
            if (!db.objectStoreNames.contains("Notes")) {
                db.createObjectStore("Notes", { keyPath: "id" });
            };
        };
        openRequest.onsuccess = function () {
            setDb(openRequest.result);
        }
        openRequest.onerror = function () {
            alert(`Fatal Open Request ERROR`, openRequest.error);
        }
    },[]);

    // Загрузка задач из IndexedDB при изменении db
    useEffect(() => {
        if (!db) return;

        const transaction = db.transaction("Notes", "readonly");
        const store = transaction.objectStore("Notes");
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = () => {
            let result = getAllRequest.result;
            setNotes(result);
        };

        getAllRequest.onerror = () => {
            console.error("Ошибка загрузки задач", getAllRequest.error);
        };
    }, [db]);

    function deleteNoteFromIndexed(id) { // удаление заметок
        if (!db) return;

        const transaction = db.transaction("Notes", "readwrite");
        const store = transaction.objectStore("Notes");
        const request = store.delete(id);

        request.onsuccess = () => {
            setNotes((prev) => prev.filter((task) => task.id !== id));
        };

        request.onerror = () => {
            console.error("Ошибка удаления задачи", request.error);
        };
    }

    function openModalWindow() {
        setModalWindow(prev => !prev);
    }

    function closeModalWindow() {
        setModalWindow(prev => !prev);
    }
    function saveNoteInEndexedDBAndShowItIn_task_item() {
        let now = new Date();
        let date_time = now.toLocaleString("ua-UA");

        let value = inputRef.current.value.trim();
        if (value) {
            const newNote = {
                id: date_time,
                number: idCounter.current++,
                value,
                checked: false,
            };

            // Добавляем только в состояние и обновляем UI
            setNotes(prev => [...prev, newNote]);
            setModalWindow(prev => !prev);

            inputRef.current.value = "";
        } else {
            return;
        }
    }

    function changeCheckboxInDB() {
        if (!db) return;

        const transaction = db.transaction("Notes", "readwrite");
        const store = transaction.objectStore("Notes");

        notes.forEach(note => {
            const span = spanRefs.current[note.number];
            const checkbox = checkboxRefs.current[note.number];
            if (!span) return;

            let value = span.textContent.trim();  // span.value НЕ существует, у span — textContent
            if (!value) return;

            const newNote = {
                id: note.id,  // Используем существующий id, а не новое время
                number: note.number,
                value,
                checked: checkbox ? checkbox.checked : note.checked,
            };

            const request = store.put(newNote);

            request.onsuccess = () => {
                console.log(`Заметка "${value}" обновлена в IndexedDB`);
            };

            request.onerror = (e) => {
                console.error("Ошибка обновления заметки", e.target.error);
            };
        });
    }

    return (
        <>
            <div className="input_progress_storage" id="input_progress_storage">
                    {notes.map((note) => (
                        <div className="task-item" key={note.id}>
                            <input type="checkbox" id="input" className={`input${note.number}`} ref={(inputNode) => (checkboxRefs.current[note.number] = inputNode)} defaultChecked={note.checked} />
                            <span id="progress_span_text" ref={(span) => (spanRefs.current[note.number] = span)}>{note.value}</span>
                            <button className={`deleteButton${note.number}`} onClick={() => deleteNoteFromIndexed(note.id)}></button>
                        </div>
                    ))}
            </div>
            <div id="progress_adding_button" onClick={openModalWindow}>
              <span>Add Task</span>
          </div>
            <div id="progress_done_button" onClick={changeCheckboxInDB}>
              <span>Submit</span>
            </div>
            {showModalWindow && (
                <div className="modal_overlay" id="modal_overlay" style={{ display: 'flex' }}>
                    <div className="modal_window" id="modal_window_Div">
                        <h2>Новая Задача</h2>
                        <input type="text" id="note_input" placeholder="Введите задачу..." ref={inputRef}/>
                        <div className="modal_buttons">
                            <button id="save_note_button" onClick={saveNoteInEndexedDBAndShowItIn_task_item}>Save</button>
                            <button id="cancel_note_button" onClick={closeModalWindow}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
      </>
    );
}