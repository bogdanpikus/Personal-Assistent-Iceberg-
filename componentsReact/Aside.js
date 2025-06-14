import Image from 'next/image';
import { useRef, useState } from 'react';

export default function Aside() {
    const [showModal, setShowModal] = useState(false);
    const [notePages, setNotePages] = useState([]); // массив страниц заметок
    const inputRef = useRef(null);
    const liRefs = useRef({});

    function openModalWindow() {
        setShowModal(current => !current);
    }
    let num = 0;
    function addNotePage() {
        // заносни страницу в setNotePages
        let value = inputRef.current.value.trim();
        if (value) {
            const newNotePage = {
                id: `Task${num}`,
                value,
            }
            setNotePages(current => [...current, newNotePage]);
        }

        setShowModal(current => !current);
    }

    function deleteNotePage(value) {
        if (!value) return;
        //удаление заметки
    }

    return (
        <aside className="aside_panel">
            <div className="logo">
                <Image
                    className="iceberg_logo"
                    src="/logoColumn.png"
                    alt=""
                    width={64}
                    height={64}
                />
            </div>
            <div className="add_note_div">
                <ul className="ul_add_note">
                    <li className="add_note_li">
                        <span className="add_note_span">Add Note
                            <button className="add_note_button" id="add_note_button" onClick={openModalWindow}>+</button>
                        </span>
                    </li>
                </ul>
                <ul className="FileList" id="FileList">
                    {notePages.map((notePage) => (
                        <li key={notePage.id} ref={current => (liRefs.current[notePage.value] = current)}>{notePage.value}
                            <button id="liClose" onClick={() => deleteNotePage(notePage.value)}></button>
                        </li>
                    ))}
                </ul>
            </div>
            {showModal && (
                <div id="asideModalWindow" tabIndex="-1">
                    <div id="ModalWindow">
                        <input className="modalWindowInput" id="modalWindowInput" type="text" placeholder=" Enter new note page name..." ref={inputRef}></input>
                        <button id="modalWindowButton" onClick={addNotePage}>Submit</button>
                    </div>
                </div>
            )}
        </aside>
    );
}