import React from 'react';
import classnames from 'classnames';
import { IoMdPlay, IoMdPause, IoMdFlag, IoMdTrash } from 'react-icons/io';

import './index.css';

function NumberPicker(props) {
  function onChange({ target: { value } }) {
    props.setValue(value);
  }

  return (
    <div className="Number-Picker">
      <label className="Number-Picker-Label">{props.label}</label>
      <input className="Number-Picker-Input" type="number" min={props.min} max={props.max} value={props.value} onChange={onChange} />
    </div>
  );
}

function Timer(props) {
  const [running, setRunning] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  const [secondsLeft, setSecondsLeft] = React.useState(0);

  function onStop() {
    setRunning(false);
    setPaused(false);
    setSecondsLeft(0);
  }

  function onStart() {
    if (running === false) {
      setSecondsLeft(3600 * hours + 60 * minutes + seconds);
    }
    setRunning(true);
    setPaused(false);
  }

  function onPause() {
    setPaused(true);
  }

  function timeFormat(t) {
    const hours = Math.floor(t / 3600);
    const minutes = Math.floor((t % 3600) / 60);
    const seconds = t % 60;

    const padNumber = (n) => String(n).padStart(2, '0');

    return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
  }

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      if (running && !paused) {
        if (secondsLeft - 1 === 0) {
                    
        }
        setSecondsLeft(secondsLeft - 1);
      }
    }, 1000);
    return () => {
      window.clearInterval(interval);
    };
  }, [running, paused, secondsLeft]);

  return (
    <div className="Timer">
      {!running && (
        <div className="Timer-Picker">
          <NumberPicker label="Hours" value={hours} setValue={setHours} min={0} max={23} />
          <NumberPicker label="Minutes" value={minutes} setValue={setMinutes} min={0} max={59} />
          <NumberPicker label="Seconds" value={seconds} setValue={setSeconds} min={0} max={59} />
        </div>
      )}
      {running && (
        <div className="Timer-Countdown">
          <div className='Outer-Circle'>
          </div>
          <div className='Inner-Circle'>
          </div>
          {/* <div class='Arc'>
            <div class={classnames('Arc-Pointer', { 'Paused': paused } )} style={{ transform: 'rotate(100DEG)' }}></div>
          </div> */}
          <div className="Time">
            {timeFormat(secondsLeft)}
          </div>
        </div>
      )}
       <div className="Timer-Buttons">
        {running && (
          <span className="Timer-Button">
            <IoMdTrash size={32} onClick={onStop} />
          </span>
        )}
        {(!running || paused) && (
          <span className="Timer-Button">
            <IoMdPlay size={32} onClick={onStart} />
          </span>
        )}
        {running && !paused && (
          <span className="Timer-Button">
            <IoMdPause size={32} onClick={onPause} />
          </span>
        )}
      </div>
    </div>
  );
}

export default Timer;
