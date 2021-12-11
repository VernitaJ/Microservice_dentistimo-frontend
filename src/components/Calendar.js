import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import '../App.css'

const Calendar = (props) => {
  
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  const handleDateSelect = (selectInfo) => {
    props.handleSelect(selectInfo)
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth',
      }}
      editable={false}
      selectable={true}
      dateClick={handleDateSelect}
      // select={(selectionInfo)=> console.log(selectionInfo)}
      weekends={false}
      // navLinks={true}
      initialView="dayGridMonth"
    />
  )
}

export default Calendar