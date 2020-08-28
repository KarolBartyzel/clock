import React from 'react';
import { IoMdGlobe } from 'react-icons/io';

import './index.css';

function Clock(props) {
  const [now, setNow] = React.useState(new Date(Date.now()));

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date(Date.now()));
    }, 1000);

    return () => {
      window.clearInterval(interval);
    }
  }, []);

  return (
    <div className="Clock">
      <div className="Clock-Timezone">
      {`Timezone: GMT${now.getTimezoneOffset() > 0 ? '-' : '+'}${Math.floor(Math.abs(now.getTimezoneOffset()) / 60)}`}
      </div>
      <IoMdGlobe size={128} />
      <div className="Clock-Time">
      {now.toLocaleTimeString()}
      </div>
      <div className="Clock-Date">
      {now.toLocaleDateString()}
      </div>
    </div>
  );
}

export default Clock;
