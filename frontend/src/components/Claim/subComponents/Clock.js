import React from "react";
import Countdown from "react-countdown";

import "./Clock.css";

const Clock = ({ type }) => {
  const renderer = ({ days = 54, hours, minutes, seconds, completed }) => {
    // Render a countdown
    return (
      <div>
        <div className="clock">
          <div>
            <h2>{days}</h2>
            <h3>DAYS</h3>
          </div>
          <div>
            <h2>{hours}</h2>
            <h3>HOURS</h3>
          </div>
          <div>
            <h2>{minutes}</h2>
            <h3>MINUTES</h3>
          </div>
          <div>
            <h2>{seconds}</h2>
            <h3>SECONDS</h3>
          </div>
        </div>
      </div>
    );
  };

  const renderer2 = ({ days = 54, hours, minutes, seconds, completed }) => {
    // Render a countdown
    return (
      <div>
        <div className="clock2">
          <div>
            <h2>{days}</h2>
            <h3>DAYS</h3>
          </div>
          <div>
            <h2>{hours}</h2>
            <h3>HOURS</h3>
          </div>
          <div>
            <h2>{minutes}</h2>
            <h3>MINUTES</h3>
          </div>
          <div>
            <h2>{seconds}</h2>
            <h3>SECONDS</h3>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      {type === 0 ? (
        <Countdown
          autoStart={true}
          controlled={false}
          date={1676362721601}
          daysInHours={false}
          precision={0}
          zeroPadDays={3}
          zeroPadTime={2}
          renderer={renderer}
        />
      ) : (
        <Countdown
          autoStart={true}
          controlled={false}
          date={1676362721601}
          daysInHours={false}
          precision={0}
          zeroPadDays={3}
          zeroPadTime={2}
          renderer={renderer2}
        />
      )}
    </div>
  );
};

export default Clock;
