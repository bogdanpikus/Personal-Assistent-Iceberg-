import React, { useState } from 'react';

export default function NotePage({ id, deleteNotePage }) {
    const [notes, setNotes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    function closeNotePage(id) {
        deleteNotePage(id);
    }

    function addNote(id) {
        setShowModal(current => !current);
    }

    return (
        <>
            <div id={id} className="note-page">
                <button id='NoteButtonClose1' className="closebutton" onClick={() => closeNotePage(id)}>X</button>
                <button id="NoteButonAdd1" className="addButton" onClick={() => addNote(id) }>+</button>
                <div id="NoteContainer" className="NoteClassContainer"></div>
            </div>
            {showModal && (
                <>
                    <div id="blurNoteModalPage"></div>
                    <div id="ModalAddNote">
                        <input id="ModalAddNoteText" type="text" placeholder="Enter a title..."></input>
                        <textarea id="ModalAddNoteTextarea" placeholder="Whire some text..."></textarea>
                        <button type="button" id="ModalAddNoteCloseButton" onClick={() => setShowModal(current => !current)}></button>
                        <div id="DropdownList">
                            <span className="ModalSpan" id="ModalSpanId" onClick={() => setShowOptions(current => !current)}>Options</span>
                            {showOptions && (
                                <ul id="ModalAddNoteUl">
                                    <li id="LiDeadLineTime" className="ModalLi">Deadline Time</li>
                                    <li id="LiDeadLineDate" className="ModalLi">Deadline Date</li>
                                </ul>
                            )}
                        </div>
                        <div id="optionsConteiner"></div>
                        <div id="remind">
                            <p id="Reminder" title="Напоминание выскочит в то время, которое вы указали">Reminder on/of:</p>
                            <input type="checkbox"></input>
                        </div>
                        <button id="ModalAddNoteSubmitButton" type="button">Continue</button>
                    </div>
                </>
            )}
        </>
    );
}