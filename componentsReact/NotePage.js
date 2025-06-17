import React, { useState, useRef, useEffect } from 'react';
import { openDB } from '../lib/indexedDB';

export default function NotePage({ id, deleteNotePage, isActive }) {
    const [notes, setNotes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [selectedText, setSelectedText] = useState(null);
    const [db, setDb] = useState(null); // состояние базы данных 
    const inputTitleRef = useRef();
    const inputTextRef = useRef();
    const remindRef = useRef();
    const dateRef = useRef();
    const timeRef = useRef();

    useEffect(() => {
        openDB()
            .then(setDb)
            .catch((error) => {
                console.error("Ошибка при открытии IndexedDB:", error);
                alert("Ошибка при открытии базы данных");
            });
    }, []);

    useEffect(() => {
        if (!db) return;

        const transaction = db.transaction("Tasks", "readonly");
        const store = transaction.objectStore("Tasks");
        const request = store.getAll();

        request.onsuccess = () => {
            const storedNotes = request.result;
            setNotes(storedNotes.slice(0, 9)); // максимум 9 заметок на странице
        };

        request.onerror = () => {
            console.error("Ошибка при загрузке заметок из IndexedDB", request.error);
        };
    }, [db]);


    function closeNotePage() {
        deleteNotePage(id);
    }

    function openNoteModalWindow() {
        setShowModal(current => !current);
    }

    function addNote() {
        if (notes.length >= 9) {
            alert("На одной странице может быть максимум 9 заметок");
            setShowModal(false);
            return;
        }
        //добавление заметки в NoteContainer и заносим в хранилище Tasks
        let title = inputTitleRef.current.value.trim();
        if (!title) {
            alert("Вбейте название заметки");
            return;
        }
        let text = inputTextRef?.current?.value.trim() || null;
        let now = new Date();
        let date_time = now.toLocaleString("ua-UA");
        let date = dateRef?.current?.value.trim() || null;
        let time = timeRef?.current?.value.trim() || null;
        const reminder = remindRef?.current?.checked || false;

        const newNote = {
            id: date_time,
            title,
            text,
            date,
            time,
            reminder,
        };
        const transaction = db.transaction("Tasks", "readwrite");
        const store = transaction.objectStore("Tasks");
        const request = store.add(newNote);

        request.onsuccess = () => {
            setNotes(current => [...current, newNote]);
            setShowModal(false);
            setShowOptions(false);
            setShowDate(false);
            setShowTime(false);
            inputTitleRef.current.value = "";
            inputTextRef.current.value = "";
        };

    request.onerror = () => {
        console.error("Ошибка при сохранении заметки в IndexedDB", request.error);
    };
    }

    function deleteNoteFromTheWall(id) {
        if (!db) return;

        // Удаление из IndexedDB
        const transaction = db.transaction("Tasks", "readwrite");
        const store = transaction.objectStore("Tasks");
        const request = store.delete(id);

        request.onsuccess = () => {
            // Удаление из состояния React
            setNotes(current => current.filter(note => note.id !== id));
        };

        request.onerror = () => {
            console.error("Ошибка при удалении из IndexedDB", request.error);
        };
    }


    return (
        <>
            <div id={id} className="note-page" style={{ display: isActive ? "block" : "none" }}>
                <button id='NoteButtonClose1' className="closebutton" onClick={() => closeNotePage()}>X</button>
                <button id="NoteButonAdd1" className="addButton" onClick={() => openNoteModalWindow()}>+</button>
                <div id="NoteContainer" className="NoteClassContainer">
                    {notes.map(note => (
                        <div key={note.id} className="note" id="noteOnTheWall" onClick={() => setSelectedText(note.text)}>
                            <button id="closeNoteDivButton" onClick={(e) => { e.stopPropagation(); deleteNoteFromTheWall(note.id); }}></button>
                            <h3 className="noteH3">{note.title}</h3>
                            <p className="noteP">{note.date}</p>
                            <p className="noteP2">{note.time}</p>
                            <p className="noteP3">{note.reminder}</p>
                        </div>
                    ))}
                </div>
            </div>
            {showModal && (
                <>
                    <div id="blurNoteModalPage"></div>
                    <div id="ModalAddNote">
                        <input id="ModalAddNoteText" type="text" placeholder="Enter a title..." ref={inputTitleRef}></input>
                        <textarea id="ModalAddNoteTextarea" placeholder="Whire some text..." ref={inputTextRef}></textarea>
                        <button type="button" id="ModalAddNoteCloseButton" onClick={() => setShowModal(current => !current)}></button>
                        <div id="DropdownList">
                            <span className="ModalSpan" id="ModalSpanId" onClick={() => setShowOptions(current => !current)}>Options</span>
                            {showOptions && (
                                <ul id="ModalAddNoteUl">
                                    <li id="LiDeadLineTime" className="ModalLi" onClick={() => setShowTime(current => !current)}>Deadline Time</li>
                                    <li id="LiDeadLineDate" className="ModalLi" onClick={() => setShowDate(current => !current)}>Deadline Date</li>
                                </ul>
                            )}
                        </div>
                        <div id="optionsConteiner">
                            {showDate && (
                                <div id="DeadDateLine">
                                    <p style={{ margin: 0 }}>End Date</p>
                                    <input id="inputDate_id" type="date" ref={dateRef}></input>
                                    <button id="inputDate_Button" onClick={() => setShowDate(current => !current)}>x</button>
                                </div>
                            )}
                            {showTime && (
                                <div id="DeadTimeLine">
                                    <p style={{ margin: 0 }}>End Time</p>
                                    <input id="inputDate_id" type="time" ref={timeRef}></input>
                                    <button id="inputDate_Button" onClick={() => setShowTime(current => !current)}>x</button>
                                </div>
                            )}
                        </div>
                        <div id="remind">
                            <p id="Reminder" title="Напоминание выскочит в то время, которое вы указали" ref={remindRef}>Reminder on/of:</p>
                            <input type="checkbox" id="remindCheckbox"></input>
                        </div>
                        <button id="ModalAddNoteSubmitButton" type="button" onClick={addNote}>Continue</button>
                    </div>
                </>
            )}
            {selectedText && (
                <div className="note-text-view" id="SelectedNoteTextBlock">
                    <h4>Текст заметки:</h4>
                    <p>{selectedText}</p>
                    <button onClick={() => setSelectedText(null)}>Закрыть</button>
                </div>
            )}
        </>
    );
}