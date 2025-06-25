import { useEffect, useRef, useState } from "react";
import { openDB } from "./indexedDB";

export default function Progress() {
  const [db, setDb] = useState(null); // состояние базы данных
  const [notes, setNotes] = useState([]); //состояния заметок, но не знаю, пождойдет ли для всех
  const [showModalWindow, setModalWindow] = useState(false);
  const inputRef = useRef(null);
  const checkboxRefs = useRef({});
  const idCounter = useRef(1);
  const spanRefs = useRef({});

  // Открытие IndexedD
  useEffect(() => {
    openDB()
      .then(setDb)
      .catch((error) => {
        console.error("Ошибка при открытии IndexedDB:", error);
        alert("Ошибка при открытии базы данных");
      });
  }, []);

  // Загрузка задач из IndexedDB при изменении db
  useEffect(() => {
    if (!db) return;

    const transaction = db.transaction("Notes", "readonly");
    const store = transaction.objectStore("Notes");
    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = () => {
      let result = getAllRequest.result;
      const uniqueMap = new Map();

      result.forEach((note) => {
        if (!uniqueMap.has(note.value)) {
          uniqueMap.set(note.value, note);
        }
      });

      const uniqueNotes = Array.from(uniqueMap.values());
      setNotes(uniqueNotes);
    };

    getAllRequest.onerror = () => {
      console.error("Ошибка загрузки задач", getAllRequest.error);
    };
  }, [db]);

  function deleteNoteFromIndexed(id) {
    // удаление заметок
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
    setModalWindow((prev) => !prev);
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  }

  function closeModalWindow() {
    setModalWindow((prev) => !prev);
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
      setNotes((prev) => [...prev, newNote]);
      setModalWindow((prev) => !prev);

      inputRef.current.value = "";
    } else {
      return;
    }
  }

  function changeCheckboxInDB() {
    if (!db) return;

    const transaction = db.transaction("Notes", "readwrite");
    const store = transaction.objectStore("Notes");

    notes.forEach((note) => {
      const span = spanRefs.current[note.number];
      const checkbox = checkboxRefs.current[note.number];
      if (!span) return;

      const value = span.textContent.trim();
      if (!value) return;

      const updateNote = {
        id: note.id, // ← ОБЯЗАТЕЛЬНО корректный ID
        number: note.number,
        value,
        checked: checkbox ? checkbox.checked : note.checked,
      };

      const checkRequest = store.get(note.id);

      checkRequest.onsuccess = () => {
        const existingNote = checkRequest.result;

        // 🔹 Если заметки ещё нет — добавляем
        if (!existingNote) {
          const addRequest = store.put(updateNote);
          addRequest.onsuccess = () => {
            console.log(`Заметка "${value}" добавлена в IndexedDB`);
          };
          addRequest.onerror = (e) => {
            console.error("Ошибка добавления", e.target.error);
          };
          return;
        }

        // 🔹 Иначе проверяем, нужно ли обновлять
        const isValueSame = existingNote.value?.trim() === value;
        const isCheckboxSame = existingNote.checked === updateNote.checked;

        if (isValueSame && isCheckboxSame) {
          console.log("Заметка не изменилась");
          return;
        }

        const updateRequest = store.put(updateNote);
        updateRequest.onsuccess = () => {
          console.log(`Заметка "${value}" обновлена`);
        };
      };
    });
  }
  return (
    <>
      <div className="input_progress_storage" id="input_progress_storage">
        {notes.map((note) => (
          <div className="task-item" key={note.id}>
            <input
              type="checkbox"
              id="input"
              className={`input${note.number}`}
              ref={(inputNode) =>
                (checkboxRefs.current[note.number] = inputNode)
              }
              defaultChecked={note.checked}
            />
            <span
              id="progress_span_text"
              ref={(span) => (spanRefs.current[note.number] = span)}
            >
              {note.value}
            </span>
            <button
              className={`deleteButton${note.number}`}
              onClick={() => deleteNoteFromIndexed(note.id)}
            ></button>
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
        <div
          className="modal_overlay"
          id="modal_overlay"
          style={{ display: "flex" }}
        >
          <div className="modal_window" id="modal_window_Div">
            <h2>Новая Задача</h2>
            <input
              type="text"
              id="note_input"
              placeholder="Введите задачу..."
              ref={inputRef}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  closeModalWindow();
                }
                if (event.key === "Enter") {
                  saveNoteInEndexedDBAndShowItIn_task_item();
                }
              }}
            />
            <div className="modal_buttons">
              <button
                id="save_note_button"
                onClick={saveNoteInEndexedDBAndShowItIn_task_item}
              >
                Save
              </button>
              <button id="cancel_note_button" onClick={closeModalWindow}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
