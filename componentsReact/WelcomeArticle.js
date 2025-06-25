import React, { useRef } from "react"; //импортирует хук useState из React

export default function WelcomeArticle() {
  const h1BlockRef = useRef(null); // создаем указку

  const handleClose = () => {
    //функция которая будет выполнятся
    if (h1BlockRef.current) {
      h1BlockRef.current.style.display = "none";
    }
  };

  return (
    <div
      className="contener_h1_statistics"
      id="contener_h1_statistics"
      ref={h1BlockRef}
    >
      <article className="h1_lets_start" id="title_main_page">
        <h1 id="title_main_page">
          Let's start
          <button onClick={handleClose} id="close_conteiner_h1"></button>
        </h1>
        <p className="welcome_p">Welcome to Iceberg!</p>
        <p className="basics_p">Here are the basics:</p>
        <p className="note_p">
          <input type="checkbox" className="checkbox_p" />
          Click <b>+</b> to create a Note page
        </p>
        <p className="note_p">
          <input type="checkbox" className="checkbox_p" />
          Click to buttons in right conner to open{" "}
          <b>Weather, Caledat, Time or Date</b>
        </p>
        <p className="note_p">
          <input type="checkbox" className="checkbox_p" />
          Scroll to bottom you can see your Statistics and Progress block; Click{" "}
          <b>Add Task</b> to add daily tasks
        </p>
        <p className="note_p">
          <input type="checkbox" className="checkbox_p" />
          In search input you can find your Notes by the name
        </p>
        <p className="note_p">
          <ins>
            Other useful functions you would find during your sesions:) Good
            luck!
          </ins>
        </p>
      </article>
    </div>
  );
}
