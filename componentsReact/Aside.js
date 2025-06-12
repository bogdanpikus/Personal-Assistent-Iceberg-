import Image from 'next/image';

export default function Aside() {
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
                            <button className="add_note_button" id="add_note_button">+</button>
                        </span>
                    </li>
                </ul>
                <ul className="FileList" id="FileList"></ul>
            </div>
        </aside>
    );
}