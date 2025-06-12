import { useRef, useState, useEffect } from "react";

export default function TimeBlock() {
    const [currentTime, setTime] = useState(null);
    const time_block = useRef(null);

    useEffect(() => {
        // Функция обновления времени
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setTime(`${hours}:${minutes}:${seconds}`);
        };

        // Запуск интервала
        const interval = setInterval(updateTime, 1000);
        updateTime(); // сразу установить текущее время

        // Очистка при размонтировании
        return () => clearInterval(interval);
    }, []);

    const buttonOpen = () => {
        if (time_block.current) {
            time_block.current.style.display = (time_block.current.style.display == 'none' || time_block.current.style.display == '') ? 'inline-block' : 'none';
        }
    }

    return (
        <article className="time_block">
            <div className="time_button_div">
                <button className="time_button" id="time_id_button" onClick={buttonOpen}>
                    <span>Time</span>
                </button>
            </div>
            <div className="time_block_div" id="time_block_div" ref={time_block}>
                <p className="nowDate">{currentTime}</p>
            </div>
        </article>
    );
}