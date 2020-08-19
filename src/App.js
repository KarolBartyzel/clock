import React from 'react';
import classnames from 'classnames';
import { IoMdAlarm, IoMdClock, IoMdStopwatch, IoMdTimer } from 'react-icons/io';

import Pages from './Pages';

import './App.css';

const pages = [
  {
    title: 'Clock',
    Icon: IoMdClock,
    Component: Pages.Clock,
  },
  {
    title: 'Alarm Clock',
    Icon: IoMdAlarm,
    Component: Pages.AlarmClock,
  },
  {
    title: 'Stopwatch',
    Icon: IoMdStopwatch,
    Component: Pages.Stopwatch,
  },
  {
    title: 'Timer',
    Icon: IoMdTimer,
    Component: Pages.Timer,
  },
];


function App() {
  const [actualPage, setActualPage] = React.useState(pages[0]);
  const { Component } = actualPage;

  return (
    <div className="App">
      <nav className="Navigator">
      {pages.map((page) => (
        <div
          className={classnames('Navigator-Item', { 'Active': actualPage.title === page.title })}
          key={page.title}
          onClick={() => setActualPage(page)}
        >
          <page.Icon size={32} />
          <span className="Navigator-Item-Title">{page.title}</span>
        </div>
      ))}
      </nav>
      <div className="Page">
        <Component />
      </div>
    </div>
  );
}

export default App;
