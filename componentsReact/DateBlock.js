import { useEffect, useRef, useState } from "react";
let urlImage = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu2d5yiu73B4N7qqOCGM9Sfh2vGEl8VOWeSw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu2d5yiu73B4N7qqOCGM9Sfh2vGEl8VOWeSw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu2d5yiu73B4N7qqOCGM9Sfh2vGEl8VOWeSw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs5y_xClyj0Rc0jtOc-jjGYck7WnvxsQi24Q&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs5y_xClyj0Rc0jtOc-jjGYck7WnvxsQi24Q&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMXEhaKhTBArzNOeNrRHuVM0GBgpQrHhcsla0pOPX9fE3VLcKz6KsTQJGrynRmGhWzTsI&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMXEhaKhTBArzNOeNrRHuVM0GBgpQrHhcsla0pOPX9fE3VLcKz6KsTQJGrynRmGhWzTsI&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMXEhaKhTBArzNOeNrRHuVM0GBgpQrHhcsla0pOPX9fE3VLcKz6KsTQJGrynRmGhWzTsI&usqp=CAU',
    'https://i0.wp.com/dotsandbrackets.com/wp-content/uploads/2023/09/autumn.jpg?resize=1400%2C800&ssl=1',
    'https://i0.wp.com/dotsandbrackets.com/wp-content/uploads/2023/09/autumn.jpg?resize=1400%2C800&ssl=1',
    'https://i0.wp.com/dotsandbrackets.com/wp-content/uploads/2023/09/autumn.jpg?resize=1400%2C800&ssl=1',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu2d5yiu73B4N7qqOCGM9Sfh2vGEl8VOWeSw&s'];

export default function DateBlock() {
    const [currentDate, setDate] = useState(null);
    const date_block_div = useRef(null);

    useEffect(() => {
        const date = () => {
            let now = new Date();
            let date_time = now.toLocaleString("ua-UA");
            let date = date_time.split(",");
            let today = `${date[0]}`;
            setDate(today);

            let season = now.getMonth();
            if (date_block_div.current) {
                date_block_div.current.style.background = `url(${urlImage[season]}) center`;
            }
        }
        date();
    },[]);

    const buttonOpen = () => {
        if (date_block_div.current) {
            date_block_div.current.style.display = (date_block_div.current.style.display == 'none' || date_block_div.current.style.display == '') ? 'inline-block' : 'none';
        }
    }
    return (
        <article className="date_block">
            <div className="date_button_div">
                <button className="date_button" id="date_id_button" onClick={buttonOpen}>
                    <span>Date</span>
                </button>
            </div>
            <div className="Img_SeasonChange" id="date_block_div" ref={date_block_div}>
                <div className="dateBlock" id="dateBlock">
                    <p>{currentDate}</p>
                </div>
            </div>
        </article>
    );
}