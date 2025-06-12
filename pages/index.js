import React from 'react';
import Head from 'next/head';
import Header from '../componentsReact/Header';
import Aside from '../componentsReact/Aside';
import WelcomeArticle from '../componentsReact/WelcomeArticle';
import WeatherBlock from '../componentsReact/WeatherBlock';
import CalendarBlock from '../componentsReact/CalendarBlock';
import TimeBlock from '../componentsReact/TimeBlock';
import DateBlock from '../componentsReact/DateBlock';
import StatisticsBlock from '../componentsReact/StatisticsBlock';
import ProgressBlock from '../componentsReact/ProgressBlock';

export default function Home() {
    return (
        <>
        <Head>
            <title>Iceberg</title>
            <meta name="description" content="Описание страницы" />
        </Head>
        <div>
            <Header />
            <main>
                <Aside />
                <WelcomeArticle />
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