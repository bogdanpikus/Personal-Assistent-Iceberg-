import React, { useState, useRef, useEffect } from 'react';

export default function NotePage({ id, deleteNotePage }) {
    const [notes, setNotes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const inputTitleRef = useRef();
    const inputTextRef = useRef();
    const remindRef = useRef();
    const dateRef = useRef();
    const timeRef = useRef();

    function closeNotePage() {
        deleteNotePage(id);
    }

    function openNoteModalWindow() {
        setShowModal(current => !current);
    }

    function addNote(){
        //добавление заметки в NoteContainer
        let title = inputTitleRef.current.value.trim();
        if (!title) {
            alert("Вбейте название заметки");
            return;
        }
        let text = inputTextRef.current.value.trim();
        if (!text) {
            alert("Напишите какой-то текст");
            return;
        }
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

        setNotes(current => [...current, newNote]);
        setShowModal(current => !current);
        setShowOptions(current => !current);
        setShowDate(current => !current);
        setShowTime(current => !current);
    }

    function deleteNoteFromTheWall(id) {
        setNotes(current => current.filter(note => note.id != id));
    }

    return (
        <>
            <div id={id} className="note-page">
                <button id='NoteButtonClose1' className="closebutton" onClick={() => closeNotePage()}>X</button>
                <button id="NoteButonAdd1" className="addButton" onClick={() => openNoteModalWindow()}>+</button>
                <div id="NoteContainer" className="NoteClassContainer">
                    {notes.map(note => (
                        <div key={note.id} className="note" id="noteOnTheWall">
                            <button id="closeNoteDivButton" onClick={() => deleteNoteFromTheWall(note.id)}></button>
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
        </>
    );
}