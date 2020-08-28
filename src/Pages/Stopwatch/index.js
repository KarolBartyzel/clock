import React from 'react';
import classnames from 'classnames';
import { IoMdPlay, IoMdPause, IoMdFlag, IoMdTrash } from 'react-icons/io';

import './index.css';

function Stopwatch(props) {
  const [running, setRunning] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [lastTime, setLastTime] = React.useState(0);
  const [lastStart, setLastStart] = React.useState(null);
  const [stageStart, setStageStart] = React.useState(0);
  const [stages, setStages] = React.useState([]);

  React.useEffect(() => {
    if (running) {
      const interval = window.setInterval(() => {
        setTime(lastTime + (Date.now() - lastStart));
      }, 10);
      return () => {
        window.clearInterval(interval);
      };
    }
  }, [running, lastStart, time, lastTime]);

  function onPausePlay() {
    if (!running) {
      setRunning(true);
      setLastStart(Date.now());
    } else {
      setLastTime(time);
      setRunning(false);
    }
  }

  function onNewStage() {
    setStages([[stageStart, time], ...stages]);
    setStageStart(time);
  }

  function onReset() {
    setTime(0);
    setLastTime(0);
    setStages([]);
  }

  function timeFormat(t) {
    const hours = Math.floor(t / 3600000);
    const minutes = Math.floor((t % 3600000) / 60000);
    const seconds = Math.floor((t % 60000) / 1000);
    const centiseconds = Math.floor((t % 1000) / 10);

    const padNumber = (n) => String(n).padStart(2, '0');

    return `${hours > 0 ? `${padNumber(hours)}:` : ''}${padNumber(minutes)}:${padNumber(seconds)}:${padNumber(centiseconds)}`;
  }

  return (
    <div className="Stopwatch">
      <div className="Stopwatch-Time">
        <div className='Outer-Circle'>
        </div>
        <div className='Inner-Circle'>
        </div>
        <div class='Arc'>
          <div class={classnames('Arc-Pointer', { 'Reseted': time === 0 }, { 'Paused': !running } )}></div>
        </div>
        <div className="Time">
          {timeFormat(time)}
        </div>
      </div>
      <div className="Stopwatch-Buttons">
        {running && (
          <span className="Stopwatch-Button">
            <IoMdFlag size={32} onClick={onNewStage} />
          </span>
        )}
        {!running && (
          <span className="Stopwatch-Button">
            <IoMdTrash size={32} onClick={onReset} />
          </span>
        )}
        <span className="Stopwatch-Button" onClick={onPausePlay}>
          {running && <IoMdPause size={32} />}
          {!running && <IoMdPlay size={32} />}
        </span>
      </div>
      {stages.length > 0 && (
        <div className="Stopwatch-Stages">
          <h2 className="Stopwatch-Stages-Header">Stages</h2>
          {stages.map(([stageStart, stageEnd], index) => (
            <div className="Stopwatch-Stage" key={String(`${stageStart} - ${stageEnd}`)}>
              <div className="Stopwatch-Stage-Index">
                {stages.length - index}.
              </div>
              <div className="Stopwatch-Stage-Offset">
                {`+ ${timeFormat(stageEnd - stageStart)}`}
              </div>
              <div className="Stopwatch-Stage-End">
                {timeFormat(stageEnd)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Stopwatch;
