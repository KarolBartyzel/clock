import React from 'react';
import classnames from 'classnames';

import './index.css';

const DAY_TO_MILIS = 86400000;

const Weekday = Object.freeze({
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
});

function EditAlarm(props) {
  const [time, setTime] = React.useState(props.editedAlarm.time);
  const [days, setDays] = React.useState(props.editedAlarm.days);

  function onDiscard() {
    props.setEditedAlarm(null);
  }

  function onConfirm(e) {
    e.preventDefault();
    props.editedAlarm.time = time;
    props.editedAlarm.days = days;
    props.setEditedAlarm(null);
    if (!props.alarms.includes(props.editedAlarm)) {
      props.alarms.push(props.editedAlarm);
    }
  }

  function onDayChange(dayIndex) {
    return ({ target: { value }}) => {
      days[dayIndex] = !days[dayIndex];
      setDays([...days]);
    };
  }

  function onTimeChange({ target: { value }}) {
    setTime(value);
    console.log(value);
  }

  return (
    <form className="Edit-Alarm" onSubmit={onConfirm}>
      <header className="Edit-Alarm-Header">
        <button className="Edit-Alarm-Button" onClick={onDiscard}>
          {'\u2716'}
        </button>
        <h1 className="Edit-Alarm-Title">Edit alarm</h1>
        <button type="submit" className="Edit-Alarm-Button">
          {'\u2713'}
        </button>
      </header>
      <section className="Edit-Alarm-Form">
        <section className="Edit-Alarm-Time">
          <header>
            <h1>Time</h1>
          </header>
          <input id="time" type="time" value={time} onChange={onTimeChange} required />
        </section>
        <section className="Edit-Alarm-Days">
          <header>
            <h1>Days</h1>
          </header>
          <ul className="Edit-Alarm-Days-List">
          {Object.entries(Weekday).map(([day, index]) => (
            <li key={`checkbox-${day}`}>
              <input id={`checkbox-${day}`} type="checkbox" checked={days[index]} onChange={onDayChange(index)} />
              <label for={`checkbox-${day}`}>{day}</label>
            </li>
          ))}
          </ul>
        </section>
      </section>
    </form>
  );
}

function AlarmsList(props) {
  function onEditAlarm(alarm) {
    props.setEditedAlarm(alarm);
  }

  function onToggleAlarm(alarm) {
    alarm.active = !alarm.active;
    props.setAlarms([...props.alarms]);
  }

  return (
    <ol className="Alarms-List">
      {props.alarms.map((alarm, alarmIndex) => {
        return (
          <li className={classnames('Alarms-List-Elem', { Inactive: !alarm.active })} key={alarmIndex} onClick={() => onEditAlarm(alarm)}>
            <div className="Alarms-List-Elem-Details">
              <time className="Alarms-List-Elem-Time" datetime={alarm.time}>{alarm.time}</time>
              {/* <div className="Alarms-List-Elem-Frequency"></div>
              {alarm.active && <div className="Alarms-List-Elem-Offset"></div>} */}
            </div>
            <div className="Alarms-List-Elem-Toggle" onClick={(event) => { event.stopPropagation(); onToggleAlarm(alarm); }}>
              <input className="Alarms-List-Elem-Toggle-Checkbox" type="checkbox" checked={alarm.active} />
              <span className="Alarms-List-Elem-Toggle-Slider"></span>
            </div>
          </li>
        );
      })}
    </ol>
  )
}

function AlarmClock(props) {
  const [alarms, setAlarms] = React.useState([]);
  const [editedAlarm, setEditedAlarm] = React.useState(null);

  React.useEffect(() => {
    // localStorage.setItem('alarms', JSON.stringify([
    //   {
    //     active: false,
    //     time: '12:00',
    //     days: [...Array(7)].map((_, i) => i % 2 === 0),
    //   },
    //   {
    //     active: false,
    //     time: '14:00',
    //     days: [...Array(7)].map((_, i) => i % 3 === 1),
    //   }
    // ]));
    // localStorage.setItem('alarms', JSON.stringify([]));
    setAlarms(JSON.parse(localStorage.getItem('alarms')));
  }, []);

  React.useEffect(() => {
    if (editedAlarm === null) {
      localStorage.setItem('alarms', JSON.stringify(alarms));
    }
  }, [alarms, editedAlarm]);

  function onNewAlarm() {
    const newAlarm = {
      active: false,
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric' }),
      days: [...Array(7)].map(() => false)
    };
    setEditedAlarm(newAlarm);
  }

  return (
    <div className="Alarm-Clock">
      {editedAlarm !== null && <EditAlarm alarms={alarms} editedAlarm={editedAlarm} setEditedAlarm={setEditedAlarm} />}
      {editedAlarm === null && <AlarmsList alarms={alarms} setAlarms={setAlarms} setEditedAlarm={setEditedAlarm} />}
      {editedAlarm === null && (
        <button className="Alarm-Clock-New" onClick={onNewAlarm}>
          <span>+</span>
          <span>New</span>
        </button>
      )}
    </div>
  );
}

export default AlarmClock;
