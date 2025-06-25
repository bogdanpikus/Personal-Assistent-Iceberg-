import React, { useState } from "react";
import Head from "next/head";
import Header from "../componentsReact/Header";
import Aside from "../componentsReact/Aside";
import WelcomeArticle from "../componentsReact/WelcomeArticle";
import WeatherBlock from "../componentsReact/WeatherBlock";
import CalendarBlock from "../componentsReact/CalendarBlock";
import TimeBlock from "../componentsReact/TimeBlock";
import DateBlock from "../componentsReact/DateBlock";
import StatisticsBlock from "../componentsReact/StatisticsBlock";
import ProgressBlock from "../componentsReact/ProgressBlock";
import NotePage from "../componentsReact/NotePage";

export default function Home() {
  const [notePages, setNotePage] = useState([]);
  const [activeNote, setActiveNote] = useState(null);

  const addNodePage = (notePage) => {
    const id = notePage.id;
    const alreadyExists = notePages.some((page) => page.id === id);
    if (alreadyExists) {
      setActiveNote(id); // "разбудили" страницу
      return;
    }
    const newPage = { id };
    setNotePage((current) => [...current, newPage]);
    setActiveNote(id);
  };

  const deleteNotePage = (value) => {
    const id = `${value}`;
    setNotePage((current) => current.filter((page) => page.id !== id));
    setActiveNote((currentId) => (currentId === id ? null : currentId));
  };

  return (
    <>
      <Head>
        <title>Iceberg</title>
        <meta name="description" content="Описание страницы" />
      </Head>
      <div>
        <Header />
        <main>
          <Aside
            addNodePage={addNodePage}
            deleteNotePage={deleteNotePage}
            setActiveNote={setActiveNote}
            notePages={notePages}
          />
          {notePages.length === 0 && <WelcomeArticle />}
          <div id="divNotedivNote">
            {notePages.map((note) => (
              <NotePage
                key={note.id}
                id={note.id}
                deleteNotePage={deleteNotePage}
                isActive={activeNote === note.id}
              />
            ))}
          </div>
          <div className="button_contener">
            <WeatherBlock />
            <CalendarBlock />
            <TimeBlock />
            <DateBlock />
          </div>
          <div className="statistics-progress">
            <StatisticsBlock />
            <ProgressBlock />
          </div>
        </main>
      </div>
    </>
  );
}
