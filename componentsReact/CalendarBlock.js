import { useState } from "react";
import Calendar from "../lib/calendar";
export default function CalendarBlock() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleCalendar = () => {
    setIsVisible((current) => !current);
  };

  return (
    <article className="calendar_block">
      <div className="calendar_button_div">
        <button
          className="calendar_button"
          id="calendar_id_button"
          onClick={toggleCalendar}
        >
          <span>Calendar</span>
        </button>
      </div>
      {isVisible && (
        <div className="calendar_block_div" id="calendar_block_div">
          <Calendar />
        </div>
      )}
    </article>
  );
}
