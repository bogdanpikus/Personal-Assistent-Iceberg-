import React, { useState } from 'react';
import Header from '../componentsReact/Header';

export default function Home() {
    return (
        <div>
            <Header />  {/* Отображаем компонент Header */}
            <main>
                <h1>Привет, Next.js!</h1>
                {/* Добавьте остальной контент страницы */}
            </main>
        </div>
    );
}