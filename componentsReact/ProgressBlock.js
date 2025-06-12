import Progress from "../lib/progress";

export default function ProgressBlock() {
    return (
        <article className="progress_block" id="progress_block">
            <div className="span_progress"></div>
            <div className="your_progress_span_div">
                <span className="your_progress_span">Tasks</span>
            </div>
            <div className="modal_overlay" id="modal_overlay">
                <div className="modal_window" id="modal_window_Div">
                    <h2>Новая задача</h2>
                    <input type="text" id="note_input" placeholder="Введите задачу..." />
                    <div className="modal_buttons">
                        <button id="save_note_button">Save</button>
                        <button id="cancel_note_button">Cancel</button>
                    </div>
                </div>
            </div>
            <Progress />
        </article>
    );
}