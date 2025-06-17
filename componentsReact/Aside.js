import Image from 'next/image';
import { useRef, useState } from 'react';

export default function Aside({ addNodePage, deleteNotePage, setActiveNote, notePages }) {
    const [showModal, setShowModal] = useState(false);
    const [noteLiPages, setNoteLiPages] = useState([]); // массив li страниц заметок
    const inputRef = useRef(null);
    const liRefs = useRef({});
    const asideRef = useRef(null);
    const liCounter = useRef(1);

    function openModalWindow() {
        asideRef.current.style.position = 'absolute';
        setShowModal(current => !current);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }

    function addNoteLiPage() {
        // заносни страницу в setNotePages
        let value = inputRef.current.value.trim();
        if (!value) alert("Введите текст");
        const id = `NoteMainPage${liCounter.current}`;
        liCounter.current += 1;
        if (value) {
            const newNotePage = {
                id,
                value,
        }
            const alreadyExists = noteLiPages.some(page => page.value === value);
            if (alreadyExists) {
                alert("Страница с таким названием уже существует.");
                return;
            }

        setNoteLiPages(current => [...current, newNotePage]);
        }
        asideRef.current.style.position = 'fixed';
        setShowModal(current => !current);
    }

    function deleteNotePages(id) {
        setNoteLiPages(current => current.filter(note => note.id !== id));
        deleteNotePage(id);
    }

    function addNotepage(notePage) {
        //тут надо писать что вызовает addNodePage()?
        addNodePage(notePage); // передаём в Home
    }


    return (
        <aside className="aside_panel" ref={asideRef}>
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
                    {noteLiPages.map((noteLiPage) => (
                        <li key={noteLiPage.id} ref={current => (liRefs.current[noteLiPage.value] = current)} onClick={() => addNotepage(noteLiPage)}>{noteLiPage.value}
                            <button id="liClose" onClick={(e) => { e.stopPropagation(); deleteNotePages(noteLiPage.id); }}></button>
                        </li>
                    ))}
                </ul>
            </div>
            {showModal && (
                <div id="asideModalWindow" tabIndex="-1">
                    <div id="ModalWindow">
                        <input className="modalWindowInput" id="modalWindowInput" type="text" placeholder=" Enter new note page name..." ref={inputRef} onKeyDown={(event) => { if (event.key == 'Enter') { addNoteLiPage() } if (event.key == 'Escape') { setShowModal(current => !current); asideRef.current.style.position = 'fixed';  } }}></input>
                        <button id="modalWindowButton" onClick={addNoteLiPage}>Submit</button>
                    </div>
                </div>
            )}
        </aside>
    );
}